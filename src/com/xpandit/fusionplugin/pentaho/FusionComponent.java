package com.xpandit.fusionplugin.pentaho;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.ChartType;
import com.xpandit.fusionplugin.FCFactory;
import com.xpandit.fusionplugin.FCItem;
import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;
import com.xpandit.fusionplugin.pentaho.content.FusionDataStream;
import com.xpandit.fusionplugin.pentaho.input.CDADataProvider;
import com.xpandit.fusionplugin.pentaho.input.JSONDataProvider;
import com.xpandit.fusionplugin.pentaho.input.ParameterParser;

/**
 * Class that implements the FusionCharts plugin component.
 * 
 * @author rplp
 * @since 1.0
 * @version $Revision: 7787 $
 * 
 */
public class FusionComponent {

    // Request parser
    ParameterParser parameterParser = null;

    // Properties Manager
    PropertiesManager pm = null;

    /**
     * FusionComponent constructor
     * 
     * @param parameterParser Manages parameters used on execution
     * @throws InvalidParameterException
     */
    public FusionComponent(ParameterParser parameterParser) throws InvalidParameterException {
        this.parameterParser = parameterParser;
        pm = new PropertiesManager(parameterParser.getParameters());
    }

    public Log getLogger() {
        return LogFactory.getLog(FusionComponent.class);
    }

    /**
     * 
     * Retrieves the data and renders the chart
     * 
     * @param out Stream output where to write the chart data and settings
     * @throws UnsupportedEncodingException
     * @throws Exception
     * @throws InvalidParameterException
     * @throws InvalidDataResultSetException
     * @throws IOException
     */
    public void renderChartGetData(OutputStream out) throws UnsupportedEncodingException, Exception,
            InvalidParameterException, InvalidDataResultSetException, IOException {

        Map<String, ArrayList<IPentahoResultSet>> resultSets = getData();

        renderChart(out, resultSets);
    }

    /**
     * 
     * Retrieves the chart
     * 
     * @param out Stream output where to write the chart data and settings
     * @throws UnsupportedEncodingException
     * @throws Exception
     * @throws InvalidParameterException
     * @throws InvalidDataResultSetException
     * @throws IOException
     */
    private void renderChart(OutputStream out, Map<String, ArrayList<IPentahoResultSet>> resultSets)
            throws UnsupportedEncodingException, Exception, InvalidParameterException, InvalidDataResultSetException,
            IOException {

        // create the chart
        FCItem fcItem = FCFactory.getFusionComponent(pm, resultSets);// resultSets.get("results"));

        // render the chart
        TreeMap<String, Object> params = pm.getParams();
        if (params.containsKey(PropertiesManager.CHARTXML) && Boolean.parseBoolean((String) params.get(PropertiesManager.CHARTXML))) {
            // Generate the chart XML
            out.write(fcItem.generateXML().getBytes());
        } else if (params.containsKey(PropertiesManager.ISDASHBOARDMODE) && !Boolean.parseBoolean((String) params.get(PropertiesManager.ISDASHBOARDMODE))) {
            // Generate the chart as a full HTML page
            out.write(fcItem.generateHTML().getBytes());
        } else {
            // The default is generating XML
            out.write(fcItem.generateXML().getBytes());
        }
    }

    /**
     * 
     * This method process the chart for the URLDataStream on the RealTime Charts
     * 
     * @param out
     * @throws UnsupportedEncodingException
     * @throws Exception
     * @throws InvalidParameterException
     * @throws InvalidDataResultSetException
     * @throws IOException
     */
    public void dataStream(OutputStream out) throws UnsupportedEncodingException, Exception, InvalidParameterException,
            InvalidDataResultSetException, IOException {

        Map<String, ArrayList<IPentahoResultSet>> resultSets = getData();

        // generate the output
        if (pm.getParams().get("chartType").equals(ChartType.ANGULARGAUGE.toString())) {
            FusionDataStream.dataStreamAngular(out, resultSets, pm);
        } else {
            FusionDataStream.dataStream(out, resultSets, pm);
        }

    }

    /**
     * @return
     * @throws InvalidParameterException
     * @throws Exception
     */
    private Map<String, ArrayList<IPentahoResultSet>> getData() throws InvalidParameterException, Exception {
        Map<String, ArrayList<IPentahoResultSet>> resultSets = new TreeMap<String, ArrayList<IPentahoResultSet>>();

        // retrieve the data from the correct data source
        CDADataProvider dpCDA = new CDADataProvider();
        JSONDataProvider dpJSON = new JSONDataProvider();

        if (pm.getParams().get(PropertiesManager.CDAID) != null) {
            resultSets = dpCDA.getResultSet(pm);
        } else if (pm.getParams().get(PropertiesManager.KEY_DATA) != null) {
            resultSets = dpJSON.getResultSet(pm);
        } else {
            throw new InvalidParameterException("Parameters missing, either "+PropertiesManager.CDAID+" or "+PropertiesManager.KEY_DATA+" must be defined.");
        }

        // abort if no data is found
        if (resultSets == null) {
            getLogger().error("Error : resultset is null -> see previous error");
            return null;
        }

        resultSets.putAll(dpJSON.getResultSetsRange(pm));
        resultSets.putAll(dpJSON.getResultSetsTarget(pm));

        return resultSets;
    }

}
