package com.xpandit.fusionplugin;

import java.util.ArrayList;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.apache.log4j.Logger;
import org.pentaho.commons.connection.IPentahoMetaData;
import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.platform.engine.core.system.PentahoSystem;

import com.fusioncharts.FusionGraph;
import com.fusioncharts.Series;
import com.fusioncharts.Series.SeriesType;

/**
 * 
 * Generic class that contains base code to generate FusionCharts charts, widgets, ...
 * 
 * @author rplp
 * @since 1.0
 * @version $Revision: 7787 $
 * 
 */
abstract public class FCItem {
    
    private static final long serialVersionUID = -4782203780348114858L;

    protected Logger log = Logger.getLogger(FCItem.class);

    /**
     * Chart properties.
     */
    protected static final String WIDTH = "width";
    protected static final String HEIGHT = "height";
    protected static final String FREE = "free";
    protected static final String WMODE = "wmmode";
    protected static final String SERIESTYES = "seriesTypes";
    protected static final String PARENTYAXIS = "parentYAxis";
    protected static final String COLORRANGE = "colorRange";
    protected static final String CHARTXML = "chartXML";
    protected static final String SERIESCOLOR = "seriesColor";
    protected static final String CATEGORIESCOLOR = "categoriesColor";
    protected static final String ANCHORBORTHERTHICKNESS = "anchorBorderThickness";
    protected static final String ANCHORBORTHERTHICOLOR = "anchorBorderColor";

    /**
     * Parameters that require specific procedure to be properly rendered
     */
    private static final String[] SPECIAL_PARAMETERS = { WIDTH, HEIGHT, FREE, WMODE, CHARTXML };

    //input data
    private IPentahoResultSet data = null;

    // Fusion chart Graph Object
    protected FusionGraph graph = null; 

    // FusionCharts free is being used
    private boolean isFreeVersion = true;

    // is to render only xml code chart data
    private boolean isChartXMLMode = false;

    /**
     * Generate the XML for the chart. Depends on the chart type.
     */
    public abstract String generateChart() throws Exception;

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
    protected void setSeriesProperties(Series series, int seriesIndex) {
        setSeriesType(series, seriesIndex);
        setSeriesParentYAxis(series, seriesIndex);
        setSeriesAnchorBorderThickness(series, seriesIndex);
        setSeriesAnchorBorderColor(series, seriesIndex);

        setCategoryColor(series, seriesIndex);
    }

    /**
     * Set the series parentYAxis
     * 
     * if the parameter seriesType was set in this chart, is used the value index X=seriesIndex
     * 
     * @param series series to set type
     * @param seriesIndex series index
     */
    private void setSeriesType(Series series, int seriesIndex) {
        String value = graph.getChartProperties().get(PARENTYAXIS);

        // have the property PARENTYAXIS
        if (value != null) {
            // split the values
            series.setParentYAxis((value.split(";"))[seriesIndex]);
        }
    }

    /**
     * Set the series Color
     * 
     * if the parameter color was set in this chart, is used the value index X=seriesIndex
     * 
     * @param series series to set type
     * @param seriesIndex series index
     */
    protected void setSeriesColor(Series series, int seriesIndex) {
        String value = graph.getChartProperties().get(SERIESCOLOR);

        // have the property SERIESCOLOR
        if (value != null) {
            // split the values
            String color = (value.split(";"))[seriesIndex];
            if (graph.getGraphType().isSingleSeries())
                series.setColor(seriesIndex, color);

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
    private void setSeriesParentYAxis(Series series, int seriesIndex) {
        String value = graph.getChartProperties().get(SERIESTYES);

        // have the property SERIESTYES
        if (value != null) {
            // split the values
            String seriesType = (value.split(";"))[seriesIndex];
            SeriesType[] stEnum = SeriesType.values();

            // find the right value
            for (int i = 0; i < stEnum.length; i++) {
                if (stEnum[i].name().equals(seriesType)) {
                    series.setSeriesType(stEnum[i]);
                }
            }
        }
    }

    /**
     * Set the series anchorBorderThickness
     * 
     * 
     * @param series series to set anchorBorderThickness
     * @param seriesIndex series index
     */
    private void setSeriesAnchorBorderThickness(Series series, int seriesIndex) {
        String value = graph.getChartProperties().get(ANCHORBORTHERTHICKNESS);

        // have the property ANCHORBORTHERTHICKNESS
        if (value != null) {
            // split the values
            series.setAnchorBorderThickness((value.split(";"))[seriesIndex]);
        }
    }

    /**
     * Set the series anchorBorderColor
     * 
     * 
     * @param series series to set anchorBorderColor
     * @param seriesIndex series index
     */
    private void setSeriesAnchorBorderColor(Series series, int seriesIndex) {
        String value = graph.getChartProperties().get(ANCHORBORTHERTHICOLOR);

        // have the property ANCHORBORTHERTHICOLOR
        if (value != null) {
            // split the values
            series.setAnchorBorderColor((value.split(";"))[seriesIndex]);
        }
    }

    /**
     * 
     * Set chart Properties by map The properties set with the same key will be replaced
     * 
     * @param params map with all parameters
     */
    public void setChartProperties(TreeMap<String, String> params) {
        Set<String> keys = params.keySet();
        for (String mapKey : keys) {
            setChartProperties(mapKey, params.get(mapKey));
        }
    }
    
    /**
     * 
     * Set chart Properties by name and value The properties set with the same key will be replaced.
     * Properties are either set as a special paramter or as a chart attribute.
     * 
     * @param key key of property
     * @param value value of property
     */
    public void setChartProperties(String key, String value) {
        if (isSpecialParam(key))
            processSpecialParameters(key, value);
        else
        	graph.setChartProperties(key, value);
    }

    /**
     * Set the for all elements in the serie
     * 
     * 
     * @param series series to set the color
     * @param seriesIndex Index of the color
     */
    protected void setCategoryColor(Series series, int seriesIndex) {
        String value = graph.getChartProperties().get(CATEGORIESCOLOR);

        if (value != null) {
            // split the values
            String color = (value.split(";"))[seriesIndex];
            if (!graph.getGraphType().isSingleSeries())
                series.setColor(color);
        }
    }

    /**
     * 
     * @param parameter
     * @return
     */
    private boolean isSpecialParam(String parameter) {
        for (int i = 0; i < SPECIAL_PARAMETERS.length; ++i) {
            if (SPECIAL_PARAMETERS[i].equals(parameter)) {
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
    private void processSpecialParameters(String parameterKey, String parameterValue) {
        if (parameterKey.equals(WIDTH))
            graph.setWidth(Integer.parseInt(parameterValue));
        if (parameterKey.equals(HEIGHT))
            graph.setHeight(Integer.parseInt(parameterValue));
        if (parameterKey.equals(FREE)) {
            graph.setChartProperties(parameterKey, parameterValue);
            setFreeVersion(Boolean.parseBoolean(parameterValue));
        }
        if (parameterKey.equals(WMODE))
            graph.setWMode(parameterValue);
        if (parameterKey.equals(CHARTXML))
            setChartXMLMode(Boolean.parseBoolean(parameterValue));
    }

    /**
     * Render the chart in plain XML.
     * 
     * @return The XML of the chart.
     * @throws Exception
     */
    public String generateXML() throws Exception{
        return generateChart();
    }

    /**
     * Render the chart XML wrapped on an HTML page.
     * 
     * @return The html page content.
     * @throws Exception
     */
    public String generateHTML() throws Exception{
        String chartType = getChartType();
        chartType = (isFreeVersion() ? "FCF_" : "") + chartType;

        String output = "<html><head>" + "  <title>Example Graph</title>  " + " <SCRIPT LANGUAGE='Javascript' SRC='"
                + PentahoSystem.getApplicationContext().getFullyQualifiedServerURL()
                + "content/fusion/JSClass/FusionCharts.js'></SCRIPT>" + "<script type='text/javascript' src='"
                + PentahoSystem.getApplicationContext().getFullyQualifiedServerURL()
                + "content/fusion/js/standaloneChartRender.js'></script></head>" + "<script type='text/javascript'>"
                + "var chartData=" + "     {" + "xmlData:'" + generateChart() + "'," + "chartType:'" + chartType + "',"
                + "width:" + getWidth() + "," + "height:" + getHeight() + "," + "WMode:'" + getWMode() + "'" + "     }"
                + "</script>" + "<body onload=\"renderChart()\">" + "<div id='chartPlaceHolder'></div>"
                + "</body></html>";
        return output;
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
        return isChartXMLMode;
    }

    public void setChartXMLMode(boolean chartXMLMode) {
        this.isChartXMLMode = chartXMLMode;
    }

    /*
     * 
     * set the result set that will be used to generate charts
     */
    protected void setData(IPentahoResultSet data) {
        this.data = data;
    }

    /**
     * 
     * get the result set metadata from the result
     * 
     * @param row row of result
     * @param column columns of result
     * @return result from the result
     */
    protected Object getDataValue(int row, int column) {
        Object value = data.getValueAt(row, column);
        // TODO : add a parameter to determine if the value will be replaced or not
        return value == null ? 0 : value;
    }

    /**
     * 
     * get the result set metadata from the result
     * 
     * @return result result set metadata
     */
    protected IPentahoMetaData getMetaData() {
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
