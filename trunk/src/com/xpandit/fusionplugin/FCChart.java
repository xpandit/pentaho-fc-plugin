package com.xpandit.fusionplugin;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

import org.pentaho.commons.connection.IPentahoMetaData;
import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.Category;
import com.fusioncharts.ChartFactoryChart;
import com.fusioncharts.ChartType;
import com.fusioncharts.FusionGraph;
import com.fusioncharts.Series;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.util.ScaleConverter;

/**
 * 
 * This class is responsible for manage all the chart special behavior. Generic processes should be kept on abstract
 * class FCItem.
 * 
 * @author dduque
 * 
 */
public class FCChart extends FCItem {

    // get link values
    // the chart link template
    String chartLink = null;
    // seriesParam to replace in template link
    String seriesParam = null;
    // categoriesParam to replace in template link
    String categoriesParam = null;
    // valueParam to replace in template link
    String valueParam = null;

    /**
     * Constructor for Charts
     * 
     * @param chartType Type of chart to be created.
     * @param resultSets Results sets containig data to display.
     * @throws InvalidDataResultSetException
     */
    public FCChart(ChartType chartType, Map<String, ArrayList<IPentahoResultSet>> resultSets,TreeMap<String, String> params)
            throws InvalidDataResultSetException {

        // set category length
        int categoryLength = 0;
        ArrayList<IPentahoResultSet> results = resultSets.get("results");
        if (chartType == ChartType.BUBBLE) {
            categoryLength = 1;
        } else {
            categoryLength = results.get(0).getRowCount();
        }

        // initialize chart
        graph = new FusionGraph("chart", chartType, categoryLength);
        
        //set chart properties
        setChartProperties(params);
        
        // get nodes
        chartLink = graph.getChartProperties().get("chartLink");
        seriesParam = graph.getChartProperties().get("seriesParam");
        categoriesParam = graph.getChartProperties().get("categoriesParam");
        valueParam = graph.getChartProperties().get("valueParam");
        
        //set the Data on the chart
        setData(resultSets);
    }

    /**
     * 
     * Set data on chart
     * 
     * @param resultSets Pentaho ResultSet with multi result sets from a query multi queries
     * @throws InvalidDataResultSetException when reult set is invalid
     */
    @Override
    public void setData(Map<String, ArrayList<IPentahoResultSet>> resultSets) throws InvalidDataResultSetException {
        if (resultSets == null)
            throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001, "Result Set is null");

        setData(resultSets.get("results").get(0));

        // get Data Set Metadata
        IPentahoMetaData metadata = getMetaData();
        // verify meta data
        int metadataSize = metadata.getColumnCount();

        // set the categories
        int rowCount = getRowCount();
        for (int i = 0; i < rowCount; i++) {
            try {
                // set category label
                Category categ = new Category();
                categ.setLable(getDataValue(i, 0).toString());

                // set category in chart
                graph.setCategory(i, categ);
            } catch (Exception e) {
                log.error("Problem in result set. Null values found at index:" + i, e);
            }
        }

        // if is the bubble charts
        //TODO create subclass of FCChart with detailed implementation for Buble charts.
        if (graph.getGraphType() == ChartType.BUBBLE) {
 
        	
            if (metadataSize < 3)
                throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001, "less than 3");

            TreeMap<String,Series> relationNamePosition=new TreeMap<String,Series>();        
                      
            // get data
            for (int i = 0; i < rowCount; i++) {
                try {

                    Series  series = relationNamePosition.get(getDataValue(i, 0).toString());
                    
                    if(series==null)
                    {
                    	series =graph.createSeries(getDataValue(i, 0).toString());
                    	relationNamePosition.put(getDataValue(i, 0).toString(), series);
                    	
                        //setSeriesProperties(series, i);
                    	setCategoryColor(series, i);
                    }

                    Double xValue = Double.parseDouble(getDataValue(i, 1).toString());
                    series.setXValuePushValue(xValue);

                    Double yValue = Double.parseDouble(getDataValue(i, 2).toString());
                    series.setYValuePushValue(yValue);
                    
                    if (getColumnCount() > 3)
                        series.setZValuePushValue(Double.parseDouble((getDataValue(i, 3).toString())));

                    // build a chart link
                    if (chartLink != null) {
                        setChartLink(series,i);
                    }

                } catch (Exception e) {
                    log.error("Problem in result set. Null values found at index:" + i, e);
                }
            } 

        } else {

            if (metadataSize < 2)
                throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001, "less than 2");

            for (int seriesCount = 1; seriesCount < metadataSize; ++seriesCount) {
                // get measure column name to set series title
                String seriesTitle = metadata.getColumnHeaders()[0][seriesCount].toString();

                // TODO:Improve Code this code remove the MDX notation and return the member name
                // [measures].[day] returns -> day
                String[] seriesTitleArr = seriesTitle.split("/.")[0].split("\\]\\.");
                seriesTitle = seriesTitleArr[seriesTitleArr.length - 1].replace("]", "").replace("[", "");

                Series series = graph.createSeries(seriesTitle);
                setSeriesProperties(series, seriesCount - 1);

                // get data
                for (int i = 0; i < rowCount; i++) {
                    try {
                        series.setValue(i, Double.parseDouble((getDataValue(i, seriesCount).toString())));

                        // build a chart link
                        if (chartLink != null) {
                            setChartLink(series,i);
                        }
                        setSeriesColor(series, i);

                    } catch (Exception e) {
                        log.error("Problem in result set. Null values found at index:" + i, e);
                    }
                }
            }
        }
    }

    /**
     * Allows setting chart links.
     * @param series Series where to set the link.
     * @param seriesIndex Index where to change.
     */
    private void setChartLink(Series series, Integer seriesIndex) {

        String serieChartLink = chartLink;

        // set seriesValue
        if (seriesParam != null) {
            serieChartLink = chartLink.replace("{" + seriesParam + "}", graph.getGraphType().isSingleSeries() ? series
                    .getValue(seriesIndex).toString() : series.getLabel());
        }
        // set categoriesValue
        if (categoriesParam != null) {
            serieChartLink = serieChartLink.replace("{" + categoriesParam + "}", graph.getCategory(seriesIndex).getLable());
        }
        // set the value
        if (valueParam != null) {
            serieChartLink = serieChartLink.replace("{" + valueParam + "}", series.getValue(seriesIndex).toString());
        }
        
        series.setEvent(seriesIndex, serieChartLink);
    }
    
    /**
     * Render the chart XML.
     * @return XML for the chart.
     * @throws Exception
     */
    public String generateChart() throws Exception {
    	ChartFactoryChart chart	= new ChartFactoryChart(isFreeVersion());   
		//attach graph to chart factory
		chart.insertGraph(graph);
		return chart.buildDOMFusionChart(graph.getGraphId()); 
    }

}
