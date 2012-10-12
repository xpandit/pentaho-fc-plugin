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

import com.xpandit.fusionplugin.FCFactory;
import com.xpandit.fusionplugin.FCItem;
import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;
import com.xpandit.fusionplugin.pentaho.input.JSONDataProvider;
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
    private static final String CDANAME = "cdaName";
    private static final String CDAID = "cdaDataAccessId";
	private static final String CDAOUTPUTID	= "outputIndexId";
    private static final String CDAPATH = "cdaPath";
    private static final String CDASOLUTION = "cdaSolution";
    private static final String CDAPARAMETERS = "cdaParameters";
    private static final String MIMETYPE = "text/html";
    private static final String ISDASHBOARDMODE = "dashboard-mode";
    private static final String CHARTXML = "chartXML";
    private static final String TARGETVALUECDAID = "targetValueCdaId";
    private static final String RANGEVALUECDAID = "rangeValueCdaId";

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
        pathMode = parameterParser.getParameters(PATHMODE);
        
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
        TreeMap<String, String> params = pm.getParams();
        if (params.containsKey(CHARTXML) && Boolean.parseBoolean(params.get(CHARTXML))) {
            // Generate the chart XML
            out.write(fcItem.generateXML().getBytes());
        } else if (params.containsKey(ISDASHBOARDMODE) && !Boolean.parseBoolean(params.get(ISDASHBOARDMODE))) {
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
        FusionDataStream.dataStream(out, resultSets);
    }

	/**
	 * @return
	 * @throws InvalidParameterException
	 * @throws Exception
	 */
    private Map<String, ArrayList<IPentahoResultSet>> getData() throws InvalidParameterException, Exception {
		if(pathMode==null)
        	pathMode="legacy";
    	
        Map<String, ArrayList<IPentahoResultSet>> resultSets = null;

        //retrieve the data from the correct data source
        if(pm.getParams().get(CDAID) != null)
            resultSets = getDataUsingCDA();
        else{
            JSONDataProvider dp = new JSONDataProvider();
            resultSets = dp.getResultSets(pm);
        }
        
        //abort if no data is found
        if (resultSets == null)
            getLogger().error("Error : resultset is null -> see previous error");
        
		return resultSets;
	}

    /**
     * 
     * Get the based on CDA. CDA parameters are used to obtain the file on the repository. All parameters should be set
     * on the properties Manager
     * 
     * @return An array containing all the result sets, including additional ones for target values or access ids if
     *         applicable.
     * @throws Exception
     */
    private Map<String, ArrayList<IPentahoResultSet>> getDataUsingCDA() throws Exception {
        final ISolutionRepository repository = PentahoSystem.get(ISolutionRepository.class, userSession);
        final ISolutionFile file;
             
        if(pathMode.equals("legacy")) {
            file = getCDAFileWithActionInfo(repository);
        } else {
            file = getCDAFile(repository);
        }
        
        boolean outputIndexIdDefined = false;
        Map<String, ArrayList<IPentahoResultSet>> resultSets = new TreeMap<String, ArrayList<IPentahoResultSet>>();
        
        cdaQueryComponent = new CdaQueryComponent();
        cdaQueryComponent.setFile(file.getFullPath());

        Map<String, Object> cdaInputs = cdaParameters();

        IPentahoResultSet resultset = null;

        if (pm.getParams().get(CDAID) == null) {
            throw new InvalidParameterException(InvalidParameterException.ERROR_006 + CDAID);
        }
        
        if (pm.getParams().get(CDAOUTPUTID) != null) {
			outputIndexIdDefined = true;
		}

        // get dataAccessIDs using properties manager
        String[] queryIDs = pm.getParams().get(CDAID).split(";");
        String[] outputIndexIds = null;
		
		if(outputIndexIdDefined){
			// get outputIndexIds from request
			outputIndexIds = pm.getParams().get(CDAOUTPUTID).split(";");
			// if there is an indexDefined than we must make sure they have the same size
			if(outputIndexIds.length != queryIDs.length){
                throw new InvalidParameterException(InvalidParameterException.ERROR_007 + "\n Number of accessIds -> "
                        + outputIndexIds.length + "\n Number of outputIndexIds -> " + outputIndexIds.length);
			}
		}		
         
        ArrayList<IPentahoResultSet> aux = new ArrayList<IPentahoResultSet>();
		int iteration = 0;
        for (String queryID : queryIDs) {
            
        	// set data access id
			cdaInputs.put("dataAccessId", queryID);
			if(outputIndexIdDefined){
				cdaInputs.put("outputIndexId", outputIndexIds[iteration]);
			}			
			cdaQueryComponent.setInputs(cdaInputs);

            try {
                // execute query
                if (cdaQueryComponent.execute()) {
                    resultset = cdaQueryComponent.getResultSet();
                    aux.add(resultset);

                    if (resultset == null) {
                        throw new Exception("resultset==null Query ID:" + queryID);
                    }
                }
            } catch (Exception e) {
                throw new Exception("Error retrieving data: cdaQueryComponent failed to return data. Query ID:"
                        + queryID, e);
            }
            ++iteration;
        }
        resultSets.put("results", aux);

        // get the targetValue result set if targetValueCdaId property exists
        try {
            if (pm.getParams().containsKey(TARGETVALUECDAID))
                resultSets.put("targetValue", getTargetValueCDA(cdaInputs, resultset));
        } catch (Exception e) {
            getLogger().error(
                    "Error retrieving data: cdaQueryComponent failed to return data. Query ID" + TARGETVALUECDAID, e);
        }

        // get the targetValue result set if rangeValueCdaId property exists
        if (pm.getParams().containsKey(RANGEVALUECDAID))
            resultSets.put("rangeValues", getRangeValuesCDA(cdaInputs, resultset));

        return resultSets;
    }

    /**
     * Gets a CDA file using an ActionInfo object
     * 
     * @param repository
     * @return
     * @throws InvalidParameterException
     */
    private ISolutionFile getCDAFileWithActionInfo(final ISolutionRepository repository)
            throws InvalidParameterException {
        ISolutionFile file = repository.getSolutionFile(getAction().toString(), ISolutionRepository.ACTION_EXECUTE);
        
        if (file == null) {
        	getLogger().warn("Cda file is null, Try path way");
        	file = repository.getSolutionFile(pm.getParams().get(CDAPATH),ISolutionRepository.ACTION_EXECUTE);
        }
        if (file == null) { 
            throw new InvalidParameterException(InvalidParameterException.ERROR_005 + "No solution file found: "
                    + getAction().getSolutionName() + "/" + getAction().getPath() + "/" + getAction().getActionName());
        }
        
        return file;
    }
    
    /**
     * Gets CDA file using the cdaPath parameter
     * 
     * @param repository
     * @return
     * @throws InvalidParameterException
     */
    private ISolutionFile getCDAFile(final ISolutionRepository repository) throws InvalidParameterException {
        String cdaPath = pm.getParams().get(CDAPATH);

        if (cdaPath == null) {
            throw new InvalidParameterException(InvalidParameterException.ERROR_006 + CDAPATH
                    + " parameter not supplied.");
        }

        final ISolutionFile file = repository.getSolutionFile(cdaPath, ISolutionRepository.ACTION_EXECUTE);

        if (file == null) {
            throw new InvalidParameterException(InvalidParameterException.ERROR_005 + "No solution file found: "
                    + cdaPath);
        }
        
        return file;
    }
    
    /**
     * 
     * Invoke the CDA to get the Target Value of a chart
     * 
     * @param cdaInputs
     * @param resultset
     * @return
     * @throws Exception
     */
    // TODO requires refactoring -> CDA code is being called too many times.
    private ArrayList<IPentahoResultSet> getTargetValueCDA(Map<String, Object> cdaInputs, IPentahoResultSet resultset)
            throws Exception {
        ArrayList<IPentahoResultSet> aux = new ArrayList<IPentahoResultSet>();
        // invoke to get target value
        String queryID = pm.getParams().get(TARGETVALUECDAID);
        // set data access id
        cdaInputs.put("dataAccessId", queryID);
        cdaQueryComponent.setInputs(cdaInputs);

        // execute query
        if (cdaQueryComponent.execute()) {
            resultset = cdaQueryComponent.getResultSet();
            aux.add(resultset);
        }
        return aux;
    }

    /**
     * 
     * Invoke the CDA to get the list of range colors and the base value to calculate the range values
     * 
     * @param cdaInputs
     * @param resultset
     * @return
     */
    // TODO requires refactoring -> CDA code is being called to many times.
    private ArrayList<IPentahoResultSet> getRangeValuesCDA(Map<String, Object> cdaInputs, IPentahoResultSet resultset)
            throws Exception {
        ArrayList<IPentahoResultSet> aux = new ArrayList<IPentahoResultSet>();
        String queryID = pm.getParams().get(RANGEVALUECDAID);
        // invoke to get ranges values

        String[] queryIDArray = queryID.split(";");
        for (int i = 0; i < queryIDArray.length; i++) {
            try {
                // set data access id
                cdaInputs.put("dataAccessId", queryIDArray[i]);
                cdaQueryComponent.setInputs(cdaInputs);

                // execute query
                if (cdaQueryComponent.execute()) {
                    resultset = cdaQueryComponent.getResultSet();
                    aux.add(resultset);
                }
            } catch (Exception e) {
                getLogger().error(
                        "Error retrieving data: cdaQueryComponent failed to return data. Querie ID" + RANGEVALUECDAID,
                        e);
            }
        }

        return aux;
    }

    /**
     * Get all parameter Values and return a map that can be used as CDA parameters
     * 
     * @return return parameters as requested by CDA
     */
    private HashMap<String, Object> cdaParameters() {
        HashMap<String, Object> cdaParameters = new  HashMap<String, Object>();
        TreeMap<String, String> params = pm.getParams();
        String parameterKeys = params.get(CDAPARAMETERS);
        if (parameterKeys == null) {
            getLogger().debug("No parameters will be passed: " + CDAPARAMETERS + " don't exist");
            return cdaParameters;
        }
        String[] parametersKeysArray = parameterKeys.split(";");
        for (int i = 0; i < parametersKeysArray.length; i++) {
            String value = params.get(parametersKeysArray[i]);
            if (value == null)
                new InvalidParameterException(InvalidParameterException.ERROR_003 + " with key:"
                        + parametersKeysArray[i]);
            cdaParameters.put("param"+parametersKeysArray[i],value);
        }
        return cdaParameters;
    }

    /**
     * Create an ActionInfo with parameters CDASOLUTION,CDAPATH and CDANAME
     * 
     * @return The action info.
     */
    private ActionInfo getAction() {

        String solution = pm.getParams().get(CDASOLUTION);
        String path = pm.getParams().get(CDAPATH);
        String name = pm.getParams().get(CDANAME);

        // if no CDASOLUTION or CDAPATH provided set default values
        solution = (solution != null ? solution : pm.getPropSolution());
        path = (path != null ? path : pm.getPropPath());

        return new ActionInfo(solution, path, name);
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
