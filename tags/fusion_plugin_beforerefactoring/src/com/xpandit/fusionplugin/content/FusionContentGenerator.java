package com.xpandit.fusionplugin.content;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.api.engine.ISolutionFile;
import org.pentaho.platform.api.repository.ISolutionRepository;
import org.pentaho.platform.engine.core.solution.ActionInfo;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.engine.services.solution.SimpleContentGenerator;
import org.pentaho.reporting.libraries.base.util.StringUtils;

import pt.webdetails.cda.CdaQueryComponent;
import pt.webdetails.cda.dataaccess.AbstractDataAccess;
import pt.webdetails.cda.settings.SettingsManager;

import com.fusioncharts.Category;
import com.fusioncharts.ChartFactory;
import com.fusioncharts.ChartType;
import com.fusioncharts.FusionGraph;
import com.fusioncharts.Series;
import com.xpandit.fusionplugin.FusionComponent;
import com.xpandit.fusionplugin.FusionComponentFactory;
import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;

/**
 * 
 * This this the Plugin content Generator
 * 
 * @author dduque
 *
 */
public class FusionContentGenerator extends SimpleContentGenerator {
	private static final long serialVersionUID = 997953797244958291L;

	private static final String CDANAME             = "cdaName";
	private static final String CDAID				= "cdaDataAccessId";
	private static final String CDAPATH             = "cdaPath";
	private static final String CDASOLUTION         = "cdaSolution";
	private static final String CDAPARAMETERS       = "cdaParameters";
	private static final String ENCODING          	= "UTF-8";
	private static final String MIMETYPE          	= "text/html";
	private static final String NAME				= "name";
	private static final String SOLUTION			= "solution";
	private static final String PATH				= "path";
	private static final String ISDASHBOARDMODE		= "dashboard-mode";
	private static final String CHARTXML			= "chartXML";
	private static final String TARGETVALUECDAID	= "targetValueCdaId";
	private static final String RANGEVALUECDAID		= "rangeValueCdaId";



	CdaQueryComponent cdaQueryComponent;//cda query component 

	IParameterProvider requestParams;

	PropertiesManager pm;//properties Manager

	/**
	 * 
	 * Util method to get the url method invoked 
	 * 
	 * @param pathString url path
	 * @return method
	 */
	private String extractMethod(final String pathString)
	{
		if (StringUtils.isEmpty(pathString))
		{
			return null;
		}
		final String pathWithoutSlash = pathString.substring(1);
		if (pathWithoutSlash.indexOf('/') > -1)
		{
			return null;
		}
		final int queryStart = pathWithoutSlash.indexOf('?');
		if (queryStart < 0)
		{
			return pathWithoutSlash;
		}
		return pathWithoutSlash.substring(0, queryStart);
	}


	//Example URL
	//http://172.21.2.33:18080/bankabi/content/fusion?solution=fusionSolution&name=usa-quantity-ordered.cda&cdaDataAccessId=1
	//
	@Override
	public void createContent(OutputStream out) throws Exception {

		requestParams=parameterProviders.get(IParameterProvider.SCOPE_REQUEST);


		IParameterProvider pathParams = parameterProviders.get("path");
		String pathString = pathParams.getStringParameter("path", null);
		String method = extractMethod(pathString);


		if (method == null)
		{
			processChart(out);
		}
		if ("clearCache".equals(method))
		{
			clearCache(requestParams, out);
			return;
		}
	}


	/**
	 * 
	 * This method process the chart
	 * 
	 * @param out
	 * @throws UnsupportedEncodingException
	 * @throws Exception
	 * @throws InvalidParameterException
	 * @throws InvalidDataResultSetException
	 * @throws IOException
	 */
	private void processChart(OutputStream out)
	throws UnsupportedEncodingException, Exception,
	InvalidParameterException, InvalidDataResultSetException,
	IOException {
		/** 
		 * 
		 * 
		 * Passos para utilização do plugin com integração com o CDA
		 * 
		 * 1) invocar  CDA com o ficheiro passado por URL
		 * 2) criar um gráfico FusioChart com os parâmetros passados à excepção dos: Solution,Name,Path
		 * 3) Criar o Objecto "Series" com o IPentahoResultSet e passalo para o gráfico 
		 * 4) Gerar o HTML do gráfico
		 * 
		 */

		//set proeprties
		setProperties(requestParams); 

		Map<String, ArrayList<IPentahoResultSet>> resultSets=invokeCDA();
		if(resultSets==null)
			getLogger().error("Error : resultset is null -> see previous error");


		//init chart
		FusionComponent fusionComponent =FusionComponentFactory.getFusionComponent(pm,resultSets.get("results"));


		//fill the properties of chart
		fusionComponent.setChartProperties(pm.getParams());

		//set data
		fusionComponent.setData(resultSets);


		//generate output
		gererateOutput(out,fusionComponent);
	}

	/**
	 * 
	 * Generate the output html 
	 * 
	 * if CHARTXML is set renders only the chart xml
	 * if not, try to find dashboard mode
	 * 
	 * If ISDASHBOARDMODE is set to false does't render the all html page
	 * If ISDASHBOARDMODE not defined or is true does't render the all html page
	 * 
	 * @param out Out Stremam 
	 * @param fusionComponent Fusion Component to render
	 * @throws Exception
	 * @throws IOException
	 */
	private void gererateOutput(OutputStream out,FusionComponent fusionComponent) throws Exception, IOException {
		TreeMap<String, String> params = pm.getParams();
		if(params.containsKey(CHARTXML))
		{
			if(Boolean.parseBoolean(params.get(CHARTXML)))
			{
				out.write(fusionComponent.execute().getBytes());
				return;
			}
		}
		if(params.containsKey(ISDASHBOARDMODE))
		{
			if(!Boolean.parseBoolean(params.get(ISDASHBOARDMODE)))
			{
				String chartType=fusionComponent.getChartType();
				chartType=(fusionComponent.isFreeVersion()?"FCF_":"")+chartType;
				
				
				String output="<html><head>" +
				"  <title>Example Graph</title>  " +
				" <SCRIPT LANGUAGE='Javascript' SRC='"+PentahoSystem.getApplicationContext().getFullyQualifiedServerURL()+"content/fusion/JSClass/FusionCharts.js'></SCRIPT>" +
				"<script type='text/javascript' src='"+PentahoSystem.getApplicationContext().getFullyQualifiedServerURL()+"content/fusion/js/standaloneChartRender.js'></script></head>" +
				"<script type='text/javascript'>"+
				"var chartData="+
				"	{"+
							"xmlData:'"+fusionComponent.execute()+"',"+
							"chartType:'"+chartType+"',"+
							"width:"+fusionComponent.getWidth()+","+
							"height:"+fusionComponent.getHeight()+","+
							"WMode:'"+fusionComponent.getWMode()+"'"+
				"	}"+
				"</script>"+
				"<body onload=\"renderChart()\">"+
				"<div id='chartPlaceHolder'></div>"+
				"</body></html>";
				out.write(output.getBytes());
				return;
			}
		}
		out.write(fusionComponent.execute().getBytes());
		return;
	}

	/**
	 * 
	 * Fill the properties of the chart in Fusion Component
	 * Get properties file( name, path and solution) to be used as parameters  
	 * and Use Request Parameters 
	 * 
	 * @param requestParams parameters to be used in all processing of the charts, this request parameters should have parameters
	 * propPath, propSolution and propPath if you want to use a Properties File
	 * @throws UnsupportedEncodingException thrown where encoding is not supported
	 * @throws InvalidParameterException 
	 */
	private void setProperties(IParameterProvider requestParams) throws UnsupportedEncodingException, InvalidParameterException 
	{
		//get properties file name path and solution
		String fileName=URLDecoder.decode(requestParams.getStringParameter(NAME, ""), ENCODING);
		String path=URLDecoder.decode(requestParams.getStringParameter(PATH, ""), ENCODING);
		String solutionName=URLDecoder.decode(requestParams.getStringParameter(SOLUTION , ""), ENCODING);
		//creates a properties manager
		pm=new PropertiesManager(fileName,path,solutionName,requestParams,ENCODING);

	}

	/**
	 * 
	 * Invokes the CDA using the CDASOLUTION,CDAPATH and CDANAME properties to get the CDA file
	 * Set all parameters including cda Parameters. All Parameters have to be in properties Manager
	 * 
	 * @return Result of the invocation of the cda
	 * @throws Exception
	 */
	private Map<String, ArrayList<IPentahoResultSet>> invokeCDA() throws Exception {
		final ISolutionRepository repository = PentahoSystem.get(ISolutionRepository.class, userSession);
		final ISolutionFile file = repository.getSolutionFile(getAction().toString(), ISolutionRepository.ACTION_EXECUTE);

		Map<String,ArrayList<IPentahoResultSet>> resultSets = new TreeMap<String,ArrayList<IPentahoResultSet>>();

		if (file==null){
			throw new InvalidParameterException(InvalidParameterException.ERROR_005+"No solution file found: "+getAction().getSolutionName()+"/"+getAction().getPath()+"/"+getAction().getActionName());
		}

		cdaQueryComponent = new CdaQueryComponent();
		cdaQueryComponent.setFile(file.getFullPath());

		Map <String, Object> cdaInputs = new HashMap <String, Object>();
		cdaInputs.put("cdaParameterString",cdaParames());

		IPentahoResultSet resultset = null;

		if(pm.getParams().get(CDAID)==null)
		{
			throw new InvalidParameterException(InvalidParameterException.ERROR_006+CDAID);
		}
		//get dataAccessIDs from request
		String[] queryIDs = pm.getParams().get(CDAID).split(";");
		ArrayList<IPentahoResultSet> aux=new ArrayList<IPentahoResultSet>();
		for (String queryID : queryIDs) {
			// set data access id
			cdaInputs.put("dataAccessId", queryID);
			cdaQueryComponent.setInputs(cdaInputs);

			try
			{
				//execute query
				if (cdaQueryComponent.execute()){
					resultset = cdaQueryComponent.getResultSet();
					aux.add(resultset);

					if (resultset==null){
						throw new Exception("resultset==null Querie ID:"+queryID);
					}
				}
			}
			catch(Exception e )
			{
				throw new Exception("Error retrieving data: cdaQueryComponent failed to return data. Querie ID:"+queryID,e);
			}
		}
		resultSets.put("results", aux);

		//get the targetValue result set if  targetValueCdaId property exists
		try
		{
			if(pm.getParams().containsKey(TARGETVALUECDAID))
				resultSets.put("targetValue", getTargetValueCDA(cdaInputs, resultset));
		}catch(Exception e)
		{
			getLogger().error("Error retrieving data: cdaQueryComponent failed to return data. Querie ID"+TARGETVALUECDAID,e);
		}
		//get the targetValue result set if  rangeValueCdaId property exists

		if(pm.getParams().containsKey(RANGEVALUECDAID))
			resultSets.put("rangeValues", getRangeValuesCDA(cdaInputs, resultset));

		return resultSets;

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
	private ArrayList<IPentahoResultSet> getTargetValueCDA(Map<String, Object> cdaInputs,
			IPentahoResultSet resultset)
			throws Exception {
		ArrayList<IPentahoResultSet> aux= new ArrayList<IPentahoResultSet>();
		//invoke to get target value
		String queryID=pm.getParams().get(TARGETVALUECDAID);
		// set data access id
		cdaInputs.put("dataAccessId", queryID);
		cdaQueryComponent.setInputs(cdaInputs);

		//execute query
		if (cdaQueryComponent.execute()){
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
	private ArrayList<IPentahoResultSet> getRangeValuesCDA(Map<String, Object> cdaInputs,
			IPentahoResultSet resultset)
			throws Exception {
		ArrayList<IPentahoResultSet> aux= new ArrayList<IPentahoResultSet>();
		String queryID=pm.getParams().get(RANGEVALUECDAID);
		//invoke to get ranges values

		String[] queryIDArray=queryID.split(";");
		for (int i = 0; i < queryIDArray.length; i++) {
		try
		{
			// set data access id
			cdaInputs.put("dataAccessId", queryIDArray[i]);
			cdaQueryComponent.setInputs(cdaInputs);

			//execute query
			if (cdaQueryComponent.execute()){
				resultset = cdaQueryComponent.getResultSet();
				aux.add(resultset);
			}
		}catch(Exception e)
		{
			getLogger().error("Error retrieving data: cdaQueryComponent failed to return data. Querie ID"+RANGEVALUECDAID,e);
		}
		}

		return aux;
	}

	/**
	 * Get all parameter Values and return the String as requested by CDA
	 * process parameter string "name1=value1;name2=value2"
	 * The requested parameter names are in cdaParameters Ex. cdaParameters=name1;name2;name3...... 
	 * 
	 * @return return parameters as requested by CDA
	 */ 
	private String cdaParames() {
		StringBuffer cdaParametersInput=new StringBuffer();
		TreeMap<String, String> params = pm.getParams();
		String parameterKeys=params.get(CDAPARAMETERS);
		if(parameterKeys==null)
		{
			getLogger().debug("No parameters will be passed: "+CDAPARAMETERS+" don't exist");
			return "";
		}
		String[] parametersKeysArray=parameterKeys.split(";");
		for (int i = 0; i < parametersKeysArray.length; i++) {
			if(cdaParametersInput.length()!=0)
				cdaParametersInput.append(";");
			String value=params.get(parametersKeysArray[i]);
			if(value==null)
				new InvalidParameterException(InvalidParameterException.ERROR_003+" with key:"+parametersKeysArray[i]);
			cdaParametersInput.append(parametersKeysArray[i]).append("=").append(value);
		}
		return cdaParametersInput.toString();
	}

	@Override
	public String getMimeType() {
		return MIMETYPE;
	}

	@Override
	public Log getLogger() {
		return LogFactory.getLog(FusionContentGenerator.class);
	}

	/**
	 * created a ActionInfo with parameters CDASOLUTION,CDAPATH and CDANAME
	 * @return
	 */
	private ActionInfo getAction(){

		String solution = pm.getParams().get(CDASOLUTION); 
		String path = pm.getParams().get(CDAPATH); 
		String name = pm.getParams().get(CDANAME);
		
		//if no CDASOLUTION or CDAPATH provided set default values
		solution=(solution!=null?solution:pm.getPropSolution() );
		path=(path!=null?path:pm.getPropPath());
		
		return new ActionInfo(solution, path, name);
	}

	/**
	 * 
	 * Invokes Clear Cache of CDA
	 * 
	 * @param pathParams
	 * @param out
	 * @throws Exception
	 */
	public void clearCache(final IParameterProvider pathParams, final OutputStream out) throws Exception
	{
		SettingsManager.getInstance().clearCache();
		AbstractDataAccess.clearCache();
		out.write("Cache cleared".getBytes());
	}
}
