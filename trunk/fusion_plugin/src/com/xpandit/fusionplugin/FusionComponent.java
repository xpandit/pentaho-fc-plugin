package com.xpandit.fusionplugin;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
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


abstract public  class FusionComponent {

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
	protected static final String SERIESCOLOR		= "seriesColor";
	protected static final String CATEGORIESCOLOR	= "categoriesColor";
	protected static final String ANCHORBORTHERTHICKNESS	= "anchorBorderThickness";
	protected static final String ANCHORBORTHERTHICOLOR		= "anchorBorderColor";
	
	
	
	

	private static final long serialVersionUID = -4782203780348114858L;

	protected Logger log = Logger.getLogger(FusionComponent.class);

	private static final String[] specialParameters={WIDTH,HEIGHT,FREE,WMODE,CHARTXML}; 
	
	protected static final String[] numberDivision={"","K","M"}; 
	
	private OutputStream out;

	// input parameters
	private IPentahoResultSet data;
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
	 * @throws Exception 
	 */
	public abstract void setData(Map<String, ArrayList<IPentahoResultSet>> resultSets) throws Exception; 

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
		setSeriesAnchorBorderThickness(series,seriesIndex);
		setSeriesAnchorBorderColor(series,seriesIndex);
		
		setCategoryColor(series,seriesIndex);

		
		
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
	 * Set the series  Color
	 * 
	 * if the parameter color was set in this chart, is used the value index X=seriesIndex 
	 * 
	 * @param series series to set type
	 * @param seriesIndex series index
	 */
	protected void setSeriesColor(Series series,int seriesIndex) {
		String value=graph.getChartProperties().get(SERIESCOLOR);
		
		//have the property SERIESCOLOR
		if(value!=null)
		{
			//split the values
			String color= (value.split(";"))[seriesIndex];
			if(graph.getGraphType().isSingleSeries())
				series.setColor(seriesIndex,color);
				
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
	 * Set the series  anchorBorderThickness
	 * 
	 * 
	 * @param series series to set anchorBorderThickness
	 * @param seriesIndex series index
	 */
	private void setSeriesAnchorBorderThickness(Series series,int seriesIndex) {
		String value=graph.getChartProperties().get(ANCHORBORTHERTHICKNESS);
		
		//have the property ANCHORBORTHERTHICKNESS
		if(value!=null)
		{
			//split the values
			series.setAnchorBorderThickness((value.split(";"))[seriesIndex]);
		}
	}
	
	/**
	 * Set the series  anchorBorderColor
	 * 
	 * 
	 * @param series series to set anchorBorderColor
	 * @param seriesIndex series index
	 */
	private void setSeriesAnchorBorderColor(Series series,int seriesIndex) {
		String value=graph.getChartProperties().get(ANCHORBORTHERTHICOLOR);
		
		//have the property ANCHORBORTHERTHICOLOR
		if(value!=null)
		{
			//split the values
			series.setAnchorBorderColor((value.split(";"))[seriesIndex]);
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
	 * Set the for all elements in the serie
	 *
	 * 
	 * @param series series to set the color
	 * @param seriesIndex Index of the color
	 */
	protected void setCategoryColor(Series series,int seriesIndex) {
		String value=graph.getChartProperties().get(CATEGORIESCOLOR);
		
		//have the property CATEGORIESCOLOR
		if(value!=null)
		{
			//split the values
			String color= (value.split(";"))[seriesIndex];
			if(!graph.getGraphType().isSingleSeries())
				series.setColor(color);
		}
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

	/*
	 * 
	 * set the result set that will be used to generate charts  
	 * 
	 */
	protected void setData(IPentahoResultSet data) 
	{	
        this.data = data;
	}

	/*
	 * 
	 * get the result set that will be used to generate charts  
	 * 
	 */
	private IPentahoResultSet getData() 
	{
		return data;
	}
	
	/**
	 * 
	 * get the result set metadata from the result
	 * 
	 * @param row row of result
	 * @param column columns of result
	 * @return result from the result
	 */
	protected Object getDataValue(int row,int column) 
	{
		Object value=data.getValueAt(row, column);
		// TODO : add a parameter to determine if the value will be replaced or not
		return value==null?0:value;
	}
	
	/**
	 * 
	 * get the result set metadata from the result
	 * 
	 * @return result result set metadata
	 */
	protected  IPentahoMetaData getMetaData() 
	{
		return data.getMetaData();
	}
	
	/**
	 * 
	 * get the result set row count
	 * 
	 * @return 
	 */
	protected int getRowCount() {
		return data.getRowCount();
	}
	
	/**
	 * 
	 * get the result set column count
	 * 
	 * @return 
	 */
	protected int getColumnCount() {
		return data.getColumnCount();
	}
	



}
