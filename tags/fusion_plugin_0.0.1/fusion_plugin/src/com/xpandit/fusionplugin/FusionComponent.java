package com.xpandit.fusionplugin;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.apache.log4j.Logger;
import org.pentaho.commons.connection.IPentahoMetaData;
import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.Category;
import com.fusioncharts.ChartFactory;
import com.fusioncharts.ChartType;
import com.fusioncharts.FusionGraph;
import com.fusioncharts.Series;
import com.fusioncharts.Series.SeriesType;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;


public class FusionComponent {

	/**
	 * 
	 */
	protected static final String WIDTH				= "width";
	protected static final String HEIGHT			= "height";
	protected static final String FREE				= "free";
	protected static final String WMODE				= "wmmode";
	protected static final String SERIESTYES		= "seriesTypes";
	protected static final String PARENTYAXIS		= "parentYAxis";
	protected static final String COLORRANGE		= "colorRange";
	protected static final String CHARTXML			= "chartXML";
	
	
	
	

	private static final long serialVersionUID = -4782203780348114858L;

	protected Logger log = Logger.getLogger(FusionComponent.class);

	private static final String[] specialParameters={WIDTH,HEIGHT,FREE,WMODE,CHARTXML}; 
	
	protected static final String[] numberDivision={"","K","M"}; 
	
	private OutputStream out;

	// input parameters
	protected IPentahoResultSet data;
	private String chartType = "";
	private String chartTitle = "";
	private String xAxisName = "";
	private String yAxisName = "";

	private InputStream mapTemplate = null;

	private InputStream htmlTemplate = null;

	protected FusionGraph graph	= null; // Fusion chart Graph Object 
	
	private boolean isFreeVersion=true;
	
	private boolean chartXMLMode=false;// is to render only xml code chart data?

	/***************************************************************************
	 * Constructor for a FusionComponent object.
	 *
	 * @param  graphId
	 *         The graph name.
	 *         
	 * @param  graphType
	 *         The graph type ie:(pie graph, column chart)        
	 *         
	 * @param  length
	 *         The length of the categories.
	 *         
	 *         
	 ***************************************************************************/
	public FusionComponent(String string, ChartType column3d, int length) {
		graph = new FusionGraph(string,column3d,length);
	}

	public boolean validate() {
		return true;
	}

	/**
	 * 
	 * @param isFreeVersion renders the chart to be used with free version or not
	 * @return
	 * @throws Exception
	 */
	public String execute() throws Exception {

		ChartFactory chart	= new ChartFactory(isFreeVersion());   
		chart.setChartXMLMode(isChartXMLMode());
		//attach graph to chart factory
		chart.insertGraph(graph);
		return chart.buildDOMFusionChart(graph.getGraphId()); 

	}
	/**
	 * 
	 * Set data to chart
	 * 
	 * @param resultSets Pentaho ResultSet with multi result sets from a query multi queries
	 * @throws InvalidDataResultSetException when reult set is invalid 
	 */
	public void setData(Map<String, ArrayList<IPentahoResultSet>> resultSets) throws InvalidDataResultSetException {
		if(resultSets==null)
			throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001 , "Result Set is null");
  
 
		//if is the bubble charts
		if(graph.getGraphType()==ChartType.BUBBLE)
		{
			this.data = resultSets.get("results").get(0); 

			// get Data Set Metadata
			IPentahoMetaData metadata = this.data.getMetaData();
			//verify meta data
			int metadataSize= metadata.getColumnCount();
			if(metadataSize<3)
				throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001 , "less than 3");
 
			//get link values
			//the chart link template
			String chartLink=graph.getChartProperties().get("chartLink");
			//seriesParam to replace in template link
			String seriesParam=graph.getChartProperties().get("seriesParam");
			//categoriesParam to replace in template link
			String categoriesParam=graph.getChartProperties().get("categoriesParam");
			//valueParam to replace in template link
			String valueParam=graph.getChartProperties().get("valueParam");


			double maxXvalue=0; 
			double minXvalue=0;
			
			double maxYvalue=0; 
			double minYvalue=0;
			
			//get data 
			int rowCount=this.data.getRowCount(); 
			for (int i = 0; i < rowCount; i++) {
				try
				{   
					Series series = graph.createSeries(this.data.getValueAt(i,0).toString());
					setSeriesProperties(series,i);
					
					Double xValue=Double.parseDouble(this.data.getValueAt(i,1).toString());
					series.setXValue(0,xValue);
					
					//calculate the max and min values to XAxis
					maxXvalue=xValue>maxXvalue?xValue:maxXvalue;
					minXvalue=xValue<minXvalue?xValue:minXvalue;
					
					Double yValue=Double.parseDouble(this.data.getValueAt(i,2).toString());
					series.setYValue(0, yValue);				
					
					//calculate the max and min values to YAxis
					maxYvalue=yValue>maxYvalue?yValue:maxYvalue;
					minYvalue=yValue<minYvalue?yValue:minYvalue;
					
					if(this.data.getColumnCount()>3)
						series.setZValue(0, Double.parseDouble((this.data.getValueAt(i,3).toString())));

					//build a chart link
					if(chartLink!=null)
					{

						String serieChartLink=chartLink;

						//set seriesValue
						if(seriesParam!=null)
						{ 
							serieChartLink=chartLink.replace("{"+seriesParam+"}", graph.getGraphType().isSingleSeries()?series.getValue(i).toString():series.getLabel());
						}
						//set categoriesValue
						if(categoriesParam!=null)
							serieChartLink=serieChartLink.replace("{"+categoriesParam+"}", graph.getCategory(i).toString());
						//set the value
						if(valueParam!=null)
							serieChartLink=serieChartLink.replace("{"+valueParam+"}", series.getValue(i).toString());
						series.setEvent(i, serieChartLink);
					}

				}
				catch(Exception e)
				{
					log.error("Problem in result set. Null values found at index:"+i, e);
				}
			}
			
			//set max YAxis with more 10% of current yMax Value
			int maxYvalueAux=(int)(maxYvalue*1.30);
			//fusion charts tweak 
			//the automatic scale at y axis don'w work correctly when the value is like-> 100999999
			// this transform the value to 100999000
			if(maxYvalueAux>1000)
			{
				maxYvalueAux/=1000;
				maxYvalueAux*=1000;
			}
			graph.setChartProperties("yAxisMaxValue",String.valueOf(maxYvalueAux));
			 
 
			// set the categories for bubble chart
			int index=0;
			int width=graph.getWidth();
			
			//each vline should have 90px between each vline 
			int numDivLinesXAxis=width/90;
			
			// the max value of x Axis is 10% more than real max value
			int maxValueX=(int) (maxXvalue*1.10);
			
			//calculates the number of vertical lines 
			int stepsValue=maxValueX/numDivLinesXAxis;
			
			//build the categories
			for(int i=(int) minXvalue;i<=maxValueX;i+=stepsValue)
			{
				Category cat=new Category();
				//calculates the K,M for xAxis
				//the fusion charts don't do this
				int indexDivision=0;
				int auxI=i;
				while(true)
				{
					if(auxI<1000)
						break;
					auxI/=1000;
					++indexDivision;
				}
				// set then correct value at the label
				cat.setLable(auxI+numberDivision[indexDivision]);
				//set the X value
				cat.setxValue((double) i);
				//set the category
				graph.setCategory(index,cat);
				++index; 
			}
			
		}
		else
		{
			this.data = resultSets.get("results").get(0);

			// get Data Set Metadata
			IPentahoMetaData metadata = this.data.getMetaData();
			//verify meta data
			int metadataSize= metadata.getColumnCount();
			if(metadataSize<2)
				throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001 , "less than 2");

			//get link values
			//the chart link template
			String chartLink=graph.getChartProperties().get("chartLink");
			//seriesParam to replace in template link
			String seriesParam=graph.getChartProperties().get("seriesParam");
			//categoriesParam to replace in template link
			String categoriesParam=graph.getChartProperties().get("categoriesParam");
			//valueParam to replace in template link
			String valueParam=graph.getChartProperties().get("valueParam");


			for(int seriesCount=1;seriesCount<metadataSize;++seriesCount)
			{
				// get measure column name to set series title
				String seriesTitle=metadata.getColumnHeaders()[0][seriesCount].toString();

				//TODO:Improve Code
				//this code remove the MDX notation and return the member name
				//[measures].[day] returns -> day
				String[] seriesTitleArr=seriesTitle.split("/.")[0].split("\\]\\.");
				seriesTitle=seriesTitleArr[seriesTitleArr.length-1].replace("]","").replace("[","");

				Series series = graph.createSeries(seriesTitle);
				setSeriesProperties(series,seriesCount-1);
				//get data 
				int rowCount=this.data.getRowCount();
				for (int i = 0; i < rowCount; i++) {
					try
					{ 
						//set category label
						Category categ=new Category();
						categ.setLable(this.data.getValueAt(i,0).toString());

						//set category in chart
						graph.setCategory(i,categ);
						series.setValue(i,Double.parseDouble((this.data.getValueAt(i,seriesCount).toString())));	

						//build a chart link
						if(chartLink!=null)
						{

							String serieChartLink=chartLink;

							//set seriesValue
							if(seriesParam!=null)
							{ 
								serieChartLink=chartLink.replace("{"+seriesParam+"}", graph.getGraphType().isSingleSeries()?series.getValue(i).toString():series.getLabel());
							}
							//set categoriesValue
							if(categoriesParam!=null)
							{
								serieChartLink=serieChartLink.replace("{"+categoriesParam+"}", graph.getCategory(i).getLable());
							}
							//set the value
							if(valueParam!=null)
								serieChartLink=serieChartLink.replace("{"+valueParam+"}", series.getValue(i).toString());
							
							
							series.setEvent(i, serieChartLink);
						}

					}
					catch(Exception e)
					{
						log.error("Problem in result set. Null values found at index:"+i, e);
					}
				}

				if(graph.getGraphType()==ChartType.BUBBLE)
				{
					return;
				}
			}
		}
	} 

	/**
	 * Set the series properties 
	 * 
	 * 
	 * @param series series to set type
	 * @param seriesIndex series index
	 */
	protected void setSeriesProperties(Series series,int seriesIndex) {
		setSeriesType(series,seriesIndex);
		setSeriesParentYAxis(series,seriesIndex);
	}
	
	/**
	 * Set the series  parentYAxis
	 * 
	 * if the parameter seriesType was set in this chart, is used the value index X=seriesIndex 
	 * 
	 * @param series series to set type
	 * @param seriesIndex series index
	 */
	private void setSeriesType(Series series,int seriesIndex) {
		String value=graph.getChartProperties().get(PARENTYAXIS);
		
		//have the property PARENTYAXIS
		if(value!=null)
		{
			//split the values
			series.setParentYAxis((value.split(";"))[seriesIndex]);
		}
	}
	/**
	 * Set the series type
	 * 
	 * if the parameter parentYAxis was set in this chart, is used the value index X=seriesIndex 
	 * 
	 * @param series series to set type
	 * @param seriesIndex series index
	 */
	private void setSeriesParentYAxis(Series series,int seriesIndex) {
		String value=graph.getChartProperties().get(SERIESTYES);
		
		//have the property SERIESTYES
		if(value!=null)
		{
			//split the values
			String seriesType=(value.split(";"))[seriesIndex];
			SeriesType[] stEnum=SeriesType.values();
			
			
			//find the right value 
			for (int i = 0; i < stEnum.length; i++) {
				if(stEnum[i].name().equals(seriesType))
				{
					series.setSeriesType(stEnum[i]);
				}
			}
		}
	}

	/**
	 * 
	 * Set chart Properties by name and value
	 * The properties set with the same key will be replaced
	 * 
	 * @param key key of property
	 * @param value value of property
	 */
	public void setChartProperties(String key, String value) {
		if(isSpecialParam(key))
			processSpecialParameters(key,value);
		else
			graph.setChartProperties(key,value);

	}
	/**
	 * 
	 * Set chart Properties by map
	 * The properties set with the same key will be replaced
	 * 
	 * @param params map with all parameters
	 */
	public void setChartProperties(TreeMap<String, String> params) {
		Set<String> keys=params.keySet();
		for (String mapKey : keys) {
			setChartProperties(mapKey,params.get(mapKey));
		}
	}
	/**
	 * 
	 * @param parameter
	 * @return
	 */
	private boolean isSpecialParam(String parameter)
	{
		for (int i=0;i<specialParameters.length;++i)
		{
			if(specialParameters[i].equals(parameter))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 
	 * Do special treatment to special parameters
	 * 
	 * @param parameterKey
	 * @param parameterValue
	 */
	private void processSpecialParameters(String parameterKey, String parameterValue)
	{
		if(parameterKey.equals(WIDTH))
			graph.setWidth(Integer.parseInt(parameterValue));
		if(parameterKey.equals(HEIGHT))
			graph.setHeight(Integer.parseInt(parameterValue));
		if(parameterKey.equals(FREE))
		{	
			graph.setChartProperties(parameterKey,parameterValue);
			setFreeVersion(Boolean.parseBoolean(parameterValue));
		}
		if(parameterKey.equals(WMODE))
			graph.setWMode(parameterValue);
		if(parameterKey.equals(CHARTXML))
			setChartXMLMode(Boolean.parseBoolean(parameterValue));
	}
	/**
	 * 
	 * get the chart type
	 * 
	 * @return
	 */
	public String getChartType() {
		return graph.getGraphType().toString();
	}
	
	public String getWidth() {
		return String.valueOf(graph.getWidth());
	}
	
	public String getHeight() {
		return String.valueOf(graph.getHeight());
	}
	public String getWMode() {
		return graph.getWMode();
	}

	/**
	 *
	 * getters and setters 
	 * 
	 */
	
	
	private void setFreeVersion(boolean isFreeVersion) {
		this.isFreeVersion = isFreeVersion;
	}

	public boolean isFreeVersion() {
		return isFreeVersion;
	}
	
	public boolean isChartXMLMode() {
		return chartXMLMode;
	}

	public void setChartXMLMode(boolean chartXMLMode) {
		this.chartXMLMode = chartXMLMode;
	}



}
