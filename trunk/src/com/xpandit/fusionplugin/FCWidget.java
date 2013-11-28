package com.xpandit.fusionplugin;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.ChartFactoryWidget;
import com.fusioncharts.ChartType;
import com.fusioncharts.Dial;
import com.fusioncharts.FusionGraph;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;

/**
 * 
 * This class is responsible for managing logic specific to Widgets. Generic behavior should be kept on the
 * abstract class FCItem.
 * 
 * @author dduque
 * 
 */
public class FCWidget extends FCItem {

    /**
     * Constructor for Widgets
     * 
     * @param chartType Type of chart to be created.
     * @param resultSets Results sets containing data to display.
     * @throws InvalidDataResultSetException
     */
    public FCWidget(ChartType chartType, Map<String, ArrayList<IPentahoResultSet>> resultSets,PropertiesManager pm)
            throws InvalidDataResultSetException {
  
    	TreeMap<String, Object> params=pm.getParams();
        // set category length
        int categoryLength = 0;
        ArrayList<IPentahoResultSet> results = resultSets.get("results");
        if (chartType == ChartType.ANGULARGAUGE) {
            categoryLength = results.size();
            StringBuffer stringBuffer = generateDataStreamParameter(pm);
            params.put("dataStreamURL",stringBuffer.toString());
        } else if (chartType == ChartType.HBULLET || chartType == ChartType.VBULLET) {
            categoryLength = 1;
            // default behavior
        } else {
            categoryLength = 1;
        }

        // initialize widget
        graph = new FusionGraph("widget", chartType, categoryLength);
        
        //set chart properties
        setChartProperties(params);
        
        //set data on chart
        setData(resultSets);
    }

    /**
     * 
     * Set data to chart At this time only gauge widgets are supported
     * 
     * @param resultSets Pentaho ResultSet with data from a query
     * @throws InvalidDataResultSetException when reult set is invalid
     */
    @Override
    public void setData(Map<String, ArrayList<IPentahoResultSet>> resultSets) throws InvalidDataResultSetException {

        if (resultSets == null)
            throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001, "data is null");

        int rowCount = resultSets.get("results").get(0).getRowCount();
        if(rowCount==0) 
        	return;
        try {
            // if the chart is a gauge
            if (graph.getGraphType().name().equals(ChartType.ANGULARGAUGE.name())) {

                IPentahoResultSet result = resultSets.get("results").get(0);
                
                int rowsNumber=result.getRowCount();
                // iterate through the several result sets and set the dial values
                for (int i = 0; i < rowsNumber; ++i) {
                    Dial d= new Dial();
                    
                    if(result.getValueAt(i, 0).toString().trim().equalsIgnoreCase(""))
                    {
                        continue; // This will atleast add the series name and chart will get painted properly with no data and subsequent calls will populate the data..
                    }
                    else
                    {
                        //check if is one or two columns
                        if(result.getColumnCount()==1)
                            d.setValue(Double.parseDouble(result.getValueAt(i, 0).toString()));
                        else 
                        {
                            d.setLable(result.getValueAt(i, 0).toString());
                            d.setValue(Double.parseDouble(result.getValueAt(i, 1).toString()));
                        }
                    }
                    
                    String chartLink = graph.getChartProperties().get("chartLink");
                    // build a chart link
                    if (chartLink != null) {
                        setChartLinkAngular(d,i,chartLink);
                    }
                    
                    graph.setDialValue(i, d);
                }
                
                // process the dial range values
                setRangeValues(resultSets);

            }
            if ((graph.getGraphType().compareTo(ChartType.HBULLET) == 0)
                    || (graph.getGraphType().compareTo(ChartType.VBULLET) == 0)) {
                ArrayList<IPentahoResultSet> results = resultSets.get("results");
                // iterate through the several result sets and set the dial values
                graph.setValue(Double.parseDouble(results.get(0).getValueAt(0, 0).toString()));

                // process the dial range values
                setRangeValues(resultSets);
            }
                       
        } catch (Exception e) {
            log.error("Problem in result set. Null values found", e);
        }

    }

    

    /**
     * Allows setting chart links.
     * @param series Series where to set the link.
     * @param seriesIndex Index where to change.
     */
    private void setChartLinkAngular(Dial d, int index,String chartLink) {

        String seriesParam = graph.getChartProperties().get("seriesParam");
        //String categoriesParam = graph.getChartProperties().get("categoriesParam");
        String valueParam = graph.getChartProperties().get("valueParam");
        
        String angularChartLink=chartLink;

        // set seriesValue
        if (seriesParam != null) {
            angularChartLink = chartLink.replace("{" + seriesParam + "}", d.getLabel());
        }
        // set the value
        if (valueParam != null) {
            angularChartLink = angularChartLink.replace("{" + valueParam + "}", d.getValue().toString());
        }

        d.setLink(angularChartLink);
    }
    
    
    /**
     * Renders the widget.
     * @return XML that represents the widget.
     * @throws Exception
     */
    public String generateChart() throws Exception {
		ChartFactoryWidget chart	= new ChartFactoryWidget(isFreeVersion());   
		//attach graph to chart factory
		chart.insertGraph(graph);
		return chart.buildDOMFusionChart(graph.getGraphId()); 

	}
}
