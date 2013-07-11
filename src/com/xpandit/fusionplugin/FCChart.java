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

/**
 * 
 * This class is responsible for manage all the chart special behavior. Generic processes should be kept on abstract
 * class FCItem.
 * 
 * @author dduque
 * 
 */
public class FCChart extends FCItem {


    protected static final String SERIESNAME = "seriesName";

    // the chart link template
    String chartLink = null;

    // seriesParam to replace in template link
    String seriesParam = null;

    // categoriesParam to replace in template link
    String categoriesParam = null;

    // valueParam to replace in template link
    String valueParam = null;

    // The resultset column that works as a datastamp for RT charts
    String datastampColumn = null;

    /**
     * Constructor for Charts
     * 
     * @param chartType Type of chart to be created.
     * @param resultSets Results sets containing data to display.
     * @throws InvalidDataResultSetException
     */
    public FCChart(ChartType chartType, Map<String, ArrayList<IPentahoResultSet>> resultSets,PropertiesManager pm)
            throws InvalidDataResultSetException {

        if (resultSets == null)
            throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001, "Result Set is null");

        // set category length
        int categoryLength = 0;
        if (chartType == ChartType.BUBBLE) {
            categoryLength = 1;
        } else {
            categoryLength = resultSets.get("results").get(0).getRowCount();
        }

        initChart(chartType, categoryLength, resultSets, pm);

        //generate the dataStreamURL parameter if is a real time charts
        if(FCFactory.isRealTimeChart(chartType.name()))
        {
            StringBuffer stringBuffer = generateDataStreamParameter(pm);
            graph.getChartProperties().put("dataStreamURL", stringBuffer.toString());

            datastampColumn = getChartProperty("datastampColumn");

            if(datastampColumn != null) {
                final String datastamp = getLastResultOf(getColumnIndex(datastampColumn));
                graph.getChartProperties().put("dataStamp", datastamp);
            }
        }

        // get nodes
        chartLink = getChartProperty("chartLink");
        seriesParam = getChartProperty("seriesParam");
        categoriesParam = getChartProperty("categoriesParam");
        valueParam = getChartProperty("valueParam");

        setData(resultSets);
    }

    private void initChart(ChartType chartType, int categoryLength, Map<String, ArrayList<IPentahoResultSet>> resultSets, PropertiesManager pm) {
        // initialize chart
        graph = new FusionGraph("chart", chartType, categoryLength);

        //set chart properties
        setChartProperties(pm.getParams());

        //set the Data on the chart
        setData(resultSets.get("results").get(0));
    }

    /**
     * Get a property value given the name
     *
     * @param propertyName the property to return
     * @return the property value
     */
    private String getChartProperty(String propertyName) {
        return graph.getChartProperties().get(propertyName);
    }

    /**
     * Get the column index given a column name
     * @param columnName
     * @return
     */
    private int getColumnIndex(String columnName) {
        return getMetaData().getColumnIndex(columnName);
    }

    /**
     * Get last value of a column index in a resultset
     * @param index
     * @return the last result
     */
    private String getLastResultOf(int index) {

        if(getRowCount() > 0) {
            return getDataValue(getRowCount()-1, index).toString();
        }

        return null;
    }

    /**
     * 
     * Set data on chart
     *
     * @throws InvalidDataResultSetException when reult set is invalid
     */

    @Override
    public void setData(Map<String, ArrayList<IPentahoResultSet>> resultSets) throws InvalidDataResultSetException {
        int rowCount = getRowCount();
        if(rowCount==0)
            return;

        // get Data Set Metadata
        IPentahoMetaData metadata = getMetaData();
        // verify meta data
        int metadataSize = metadata.getColumnCount();

        // set the categories
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

                //skip the datastampColumn
                if(datastampColumn != null && seriesCount == getColumnIndex(datastampColumn))
                    continue;

                // get measure column name to set series title
                String seriesTitle = metadata.getColumnHeaders()[0][seriesCount].toString();

                seriesTitle = getSeriesName(seriesTitle,seriesCount -1);

                Series series = graph.createSeries(seriesTitle);
                setSeriesProperties(series, seriesCount - 1);

                // get data
                for (int i = 0; i < rowCount; i++) {
                    try {
                        
                        
                        if(getDataValue(i, seriesCount).toString().trim().equalsIgnoreCase(""))
                        {
                            continue; // This will atleast add the series name and chart will get painted properly with no data and subsequent calls will populate the data..
                        }
                        else
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
     * 
     * Get the series title from the  seriesTitle or if defined, the SERIESNAME parameter 
     * 
     * @param seriesTitle Header from the queries column  
     * @param seriesCount index of the measure 
     * @return
     */
    private String getSeriesName(String seriesTitle,Integer seriesCount) {

        String seriesName = graph.getChartProperties().get(SERIESNAME);
        if (seriesName != null) {
            String[] seriesNames=seriesName.split(";");
            if (seriesCount<seriesNames.length)
            {
                return seriesNames[seriesCount];
            }
            else
            {
                log.error("seriesName is provided but not with all values nedded try name from the measure: Error in collumn number:" + seriesCount);
                return getSeriesNameFromMeasure(seriesTitle);
            }
        }

        return getSeriesNameFromMeasure(seriesTitle);
    }

    /**
     * 
     * Get the series name from the measure name ( seriesTitle  )
     * 
     * @param seriesTitle Header from the queries column  
     * @return
     */
    private String getSeriesNameFromMeasure(String seriesTitle) {
        // TODO:Improve Code this code remove the MDX notation and return the member name
        // [measures].[day] returns -> day
        String[] seriesTitleArr = seriesTitle.split("/.")[0].split("\\]\\.");
        seriesTitle = seriesTitleArr[seriesTitleArr.length - 1].replace("]", "").replace("[", "");
        return seriesTitle;
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
