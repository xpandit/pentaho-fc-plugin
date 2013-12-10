package com.xpandit.fusionplugin.pentaho.content;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.platform.api.engine.ISolutionFile;
import org.pentaho.platform.api.repository.ISolutionRepository;
import org.pentaho.platform.engine.core.solution.ActionInfo;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.engine.services.solution.SimpleContentGenerator;

import pt.webdetails.cda.CdaQueryComponent;
import pt.webdetails.cda.dataaccess.AbstractDataAccess;
import pt.webdetails.cda.settings.SettingsManager;

import com.fusioncharts.ChartType;
import com.xpandit.fusionplugin.FCFactory;
import com.xpandit.fusionplugin.FCItem;
import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;
import com.xpandit.fusionplugin.pentaho.input.CDADataProvider;
import com.xpandit.fusionplugin.pentaho.input.DataProvider;
import com.xpandit.fusionplugin.pentaho.input.JSONDataProvider;
import com.xpandit.fusionplugin.pentaho.input.JSONResultSet;
import com.xpandit.fusionplugin.pentaho.input.ParameterParser;
import com.xpandit.fusionplugin.util.VersionChecker;

/**
 * 
 * This is the Plugin content Generator. Class that based on the .xfusion file renders the chart as HTML or plain XML.
 * 
 * @author dduque
 * 
 */
public class FusionContentGenerator extends SimpleContentGenerator {
    private static final long serialVersionUID = 997953797244958291L;

    private static final String PATHMODE = "pathMode";
    private static final String CDAID = "cdaDataAccessId";
    private static final String MIMETYPE = "text/html";
    private static final String ISDASHBOARDMODE = "dashboard-mode";
    private static final String CHARTXML = "chartXML";


    // TODO is being used on different methods should be placed inside a method on the next refactoring.
    CdaQueryComponent cdaQueryComponent = null;

    // Request parser
    ParameterParser parameterParser = null;

    // Properties Manager
    PropertiesManager pm = null;

    // pathMode for obtaining repository objects
    String pathMode;

    @Override
    public String getMimeType() {
        return MIMETYPE;
    }

    @Override
    public Log getLogger() {
        return LogFactory.getLog(FusionContentGenerator.class);
    }

    /**
     * Main method called by the Pentaho platform.
     */
    public void createContent(OutputStream out) throws Exception {

        //TODO code bellow is too tightly coupled. Parameter manager should have all the necessary methods.
        parameterParser = new ParameterParser(parameterProviders);
        pathMode = (String)parameterParser.getParameters(PATHMODE);

        // Identify operation based on URL call
        String method = parameterParser.extractMethod();

       pm = new PropertiesManager(parameterParser.getParameters(), pathMode);

        if (method == null) { // Generate chart
            renderChartGetData(out);
        } else if ("clearCache".equals(method)) { // clear component cache
            clearCache();
        } else if ("dataStream".equals(method)) { // called by real time charts to update data
            dataStream(out);
        } else if ("checkVersions".equals(method)) { // check the Pentaho version
            VersionChecker.getVersions(out);
        } else if ("renderChartExternalData".equals(method)) { // render chart using external data
            renderChartGetData(out);
        }
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
    private void renderChartGetData(OutputStream out) throws UnsupportedEncodingException, Exception,
    InvalidParameterException, InvalidDataResultSetException, IOException {

        Map<String, ArrayList<IPentahoResultSet>> resultSets = getData();

        renderChart(out,resultSets);
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
    private void renderChart(OutputStream out, Map<String, ArrayList<IPentahoResultSet>> resultSets) throws UnsupportedEncodingException, Exception,
    InvalidParameterException, InvalidDataResultSetException, IOException {

        // create the chart
        FCItem fcItem = FCFactory.getFusionComponent(pm, resultSets);//resultSets.get("results"));

        // render the chart
        TreeMap<String, Object> params = pm.getParams();
        if (params.containsKey(CHARTXML) && Boolean.parseBoolean((String)params.get(CHARTXML))) {
            // Generate the chart XML
            out.write(fcItem.generateXML().getBytes());
        } else if (params.containsKey(ISDASHBOARDMODE) && !Boolean.parseBoolean((String)params.get(ISDASHBOARDMODE))) {
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
    private void dataStream(OutputStream out) throws UnsupportedEncodingException, Exception,
    InvalidParameterException, InvalidDataResultSetException, IOException {
  
        Map<String, ArrayList<IPentahoResultSet>> resultSets = getData();

        //generate the output
        if(pm.getParams().get("chartType").equals(ChartType.ANGULARGAUGE.toString())){

            FusionDataStream.dataStreamAngular(out, resultSets,pm);
        }
        else
        {
            FusionDataStream.dataStream(out, resultSets,pm);
        }

    }

    /**
     * @return
     * @throws InvalidParameterException
     * @throws Exception
     */
    private Map<String, ArrayList<IPentahoResultSet>> getData() throws InvalidParameterException, Exception {
        if(pathMode==null)
            pathMode="legacy";  

        Map<String, ArrayList<IPentahoResultSet>> resultSets = new TreeMap<String, ArrayList<IPentahoResultSet>>();

        //retrieve the data from the correct data source
        CDADataProvider dpCDA= new CDADataProvider();
        JSONDataProvider dpJSON = new JSONDataProvider();
         
        if(pm.getParams().get(CDAID) != null)
        {
            resultSets = dpCDA.getResultSet(pm,userSession);
        }
        else
        {
            resultSets = dpJSON.getResultSet(pm,userSession);
        }

        //abort if no data is found
        if (resultSets == null)
        {
            getLogger().error("Error : resultset is null -> see previous error");
            return null;
        }
        
        resultSets.putAll(dpJSON.getResultSetsRange(pm,userSession));
        resultSets.putAll(dpJSON.getResultSetsTarget(pm,userSession));
      

        return resultSets;
    }

     /**
     * 
     * Call CDA clear cache. This is necessary due to the fact that a CDA instance is running on the FCplugin.
     * 
     */
    public void clearCache() {
        SettingsManager.getInstance().clearCache();
        AbstractDataAccess.clearCache();
    }
}
