package com.xpandit.fusionplugin;

import java.util.ArrayList;
import java.util.Map;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.ChartFactoryWidget;
import com.fusioncharts.ChartType;
import com.fusioncharts.ColorRange;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;

/**
 * 
 * This class is responsible for manage all the widgets logic
 * 
 * @author dduque
 *
 */
public class FusionComponentWidget extends  FusionComponent {



	/***************************************************************************
	 * Constructor for a FusionComponent object.
	 *         
	 * @param  graphType
	 *         The graph type ie:(pie graph, column chart)        
	 *         
	 * @param  length
	 *         The length of the categories.
	 *         
	 *         
	 ***************************************************************************/
	public FusionComponentWidget(ChartType graphType , int length) {
		super("widget", graphType, length);
	}

	/**
	 * 
	 * @param isFreeVersion renders the chart to be used with free version or not
	 * @return
	 * @throws Exception
	 */
	public String execute() throws Exception {

		ChartFactoryWidget chart	= new ChartFactoryWidget(isFreeVersion());   
		//attach graph to chart factory
		chart.insertGraph(graph);
		return chart.buildDOMFusionChart(graph.getGraphId()); 

	}

	/**
	 * 
	 * Set data to chart
	 * At this time only gauge widgets are supported
	 * 
	 * @param resultSets Pentaho ResultSet with data from a query
	 * @throws InvalidDataResultSetException when reult set is invalid 
	 */
	@Override
	public void setData(Map<String, ArrayList<IPentahoResultSet>> resultSets) throws InvalidDataResultSetException {

		if(resultSets==null)
			throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001 , "data is null");

		try
		{		
			//if the chart is a gauge
			if(graph.getGraphType().name().equals(ChartType.ANGULARGAUGE.name())){ 

				ArrayList<IPentahoResultSet> results = resultSets.get("results");
				// iterate through the several result sets and set the dial values
				for(int i = 0 ; i < results.size(); ++i) { 
					graph.setDialValue(i,results.get(i).getValueAt(0, 0).toString());
				}

				//process the dial range values
				setRangeValues(resultSets);

			}
			if((graph.getGraphType().compareTo(ChartType.HBULLET)==0)||
					(graph.getGraphType().compareTo(ChartType.VBULLET)==0))
			{
				ArrayList<IPentahoResultSet> results = resultSets.get("results");
				// iterate through the several result sets and set the dial values
				graph.setValue(Double.parseDouble(results.get(0).getValueAt(0, 0).toString()));

				//process the dial range values
				setRangeValues(resultSets);
			}
		}
		catch(Exception e)
		{
			log.error("Problem in result set. Null values found", e);
		}

	} 

	/**
	 * 
	 * This function process the values to set the range values elements
	 * 
	 * if the resultSets have the key rangeValues in the map, the range values will be processed as simple values
	 * if the resultSets have the key rangeValues and targetValue the range values will be calculated as targetValue*"eache value" 
	 * 
	 * @param resultSets map of result pentaho result sets
	 * @throws InvalidParameterException
	 */
	private void setRangeValues(Map<String, ArrayList<IPentahoResultSet>> resultSets) throws InvalidParameterException
	{  
		//have range values result array in the map
		if(!resultSets.containsKey("rangeValues"))
		{
			log.debug("No range values were founded");
			return; 
		}

		IPentahoResultSet rangeResultSet = resultSets.get("rangeValues").get(0);
		// the result set have any data?
		if(rangeResultSet.getColumnCount()==0||rangeResultSet.getRowCount()==0)
		{
			log.debug("No data founded in range values were founded");
			return;
		}
		// have the COLORRANGE propertie set?
		String colorRange=graph.getChartProperties().get(COLORRANGE);
		if(colorRange==null)
			throw new InvalidParameterException(InvalidParameterException.ERROR_003+"-->"+COLORRANGE); 

		String[] colorValues=colorRange.split(";");
		//we have color to all ranges? 
		if(colorValues.length<rangeResultSet.getColumnCount()) 
		{
			throw new InvalidParameterException(InvalidParameterException.ERROR_005+"Parameter COLORRANGE have few values. need at least:"+(rangeResultSet.getColumnCount()-1));
		}

		// we have target Value?
		double targetValue=0;
		boolean haveTargetValue=false;
		if(resultSets.containsKey("targetValue"))
		{
			//calculate the target value
			targetValue=Double.parseDouble(resultSets.get("targetValue").get(0).getValueAt(0, 0).toString());

			if((graph.getGraphType().compareTo(ChartType.HBULLET)==0)||
					(graph.getGraphType().compareTo(ChartType.VBULLET)==0))
			{
				graph.setTargetValue(targetValue);
			}
			haveTargetValue=true;
		}
 
		double lastValue=0;

		if(rangeResultSet!=null)
		{
			//if the range value have 2 queries or more. use the second one as a target value
			if(resultSets.get("rangeValues").size()>1)
			{
				targetValue=Double.parseDouble(resultSets.get("rangeValues").get(1).getValueAt(0,0).toString());
				haveTargetValue=true;
			}
			
			//set the range values
			for(int i=0 ; i<rangeResultSet.getColumnCount() ; ++i)
			{
				double value;

				//if have target value, the ranges values are in percentage
				if(haveTargetValue)
				{
					value=targetValue*Double.parseDouble(rangeResultSet.getValueAt(0, i).toString());
				}
				else
				{
					value=Double.parseDouble(rangeResultSet.getValueAt(0, i).toString());
				}
				graph.setColorRangeValues(i,new ColorRange(lastValue,value,colorValues[i])); 
				lastValue=value;
			}
		}

		//if we have a targer value and is a angular chart, set the upper limit just to make sure that all color range will be drawn 
		if((graph.getGraphType().compareTo(ChartType.ANGULARGAUGE)==0)&&haveTargetValue)
		{
			graph.setChartProperties("upperLimit", String.valueOf(lastValue));
		}

	}
}
