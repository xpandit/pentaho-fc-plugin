package com.xpandit.fusionplugin;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.ChartFactoryWidget;
import com.fusioncharts.ChartType;
import com.fusioncharts.ColorRange;
import com.fusioncharts.FusionGraph;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;

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
    public FCWidget(ChartType chartType, Map<String, ArrayList<IPentahoResultSet>> resultSets, TreeMap<String, String> params)
            throws InvalidDataResultSetException {

        // set category length
        int categoryLength = 0;
        ArrayList<IPentahoResultSet> results = resultSets.get("results");
        if (chartType == ChartType.ANGULARGAUGE) {
            categoryLength = results.size();
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

        try {
            // if the chart is a gauge
            if (graph.getGraphType().name().equals(ChartType.ANGULARGAUGE.name())) {

                ArrayList<IPentahoResultSet> results = resultSets.get("results");
                // iterate through the several result sets and set the dial values
                for (int i = 0; i < results.size(); ++i) {
                    graph.setDialValue(i, results.get(i).getValueAt(0, 0).toString());
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
     * 
     * This function process the values to set the range values elements
     * 
     * if the resultSets have the key rangeValues in the map, the range values will be processed as simple values if the
     * resultSets have the key rangeValues and targetValue the range values will be calculated as
     * targetValue*"eache value"
     * 
     * @param resultSets map of result pentaho result sets
     * @throws InvalidParameterException
     */
    private void setRangeValues(Map<String, ArrayList<IPentahoResultSet>> resultSets) throws InvalidParameterException {
        // have range values result array in the map
        if (!resultSets.containsKey("rangeValues")) {
            log.debug("No range values were founded");
            return;
        }

        IPentahoResultSet rangeResultSet = resultSets.get("rangeValues").get(0);
        // the result set have any data?
        if (rangeResultSet.getColumnCount() == 0 || rangeResultSet.getRowCount() == 0) {
            log.debug("No data founded in range values were founded");
            return;
        }
        // has the COLORRANGE property?
        String colorRange = graph.getChartProperties().get(COLORRANGE);
        if (colorRange == null)
            throw new InvalidParameterException(InvalidParameterException.ERROR_003 + "-->" + COLORRANGE);

        String[] colorValues = colorRange.split(";");
        // we have color to all ranges?
        if (colorValues.length < rangeResultSet.getColumnCount()) {
            throw new InvalidParameterException(InvalidParameterException.ERROR_005
                    + "Parameter COLORRANGE have few values. need at least:" + (rangeResultSet.getColumnCount() - 1));
        }

        // we have target Value?
        double targetValue = 0;
        boolean haveTargetValue = false;
        if (resultSets.containsKey("targetValue")) {
            // calculate the target value
            targetValue = Double.parseDouble(resultSets.get("targetValue").get(0).getValueAt(0, 0).toString());

            if ((graph.getGraphType().compareTo(ChartType.HBULLET) == 0)
                    || (graph.getGraphType().compareTo(ChartType.VBULLET) == 0)) {
                graph.setTargetValue(targetValue);
            }
            haveTargetValue = true;
        }

        double lastValue = 0;

        if (rangeResultSet != null) {
            // if the range value have 2 queries or more. use the second one as a target value
            if (resultSets.get("rangeValues").size() > 1) {
                targetValue = Double.parseDouble(resultSets.get("rangeValues").get(1).getValueAt(0, 0).toString());
                haveTargetValue = true;
            }

            // set the range values
            for (int i = 0; i < rangeResultSet.getColumnCount(); ++i) {
                double value;

                // if have target value, the ranges values are in percentage
                if (haveTargetValue) {
                    value = targetValue * Double.parseDouble(rangeResultSet.getValueAt(0, i).toString());
                } else {
                    value = Double.parseDouble(rangeResultSet.getValueAt(0, i).toString());
                }
                graph.setColorRangeValues(i, new ColorRange(lastValue, value, colorValues[i]));
                lastValue = value;
            }
        }

        // if we have a targer value and is a angular chart, set the upper limit just to make sure that all color range
        // will be drawn
        if ((graph.getGraphType().compareTo(ChartType.ANGULARGAUGE) == 0) && haveTargetValue) {
            graph.setChartProperties("upperLimit", String.valueOf(lastValue));
        }

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
