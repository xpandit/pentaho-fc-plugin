package com.xpandit.fusionplugin.content;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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

import com.fusioncharts.ChartFactory;
import com.fusioncharts.ChartType;
import com.fusioncharts.FusionGraph;
import com.fusioncharts.Series;
import com.xpandit.fusionplugin.FusionComponent;
import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;

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
	


	CdaQueryComponent cdaQueryComponent;
	
	IParameterProvider requestParams;
	
	PropertiesManager pm;

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
		
		IPentahoResultSet resultset=invokeCDA();
		if(resultset==null)
			getLogger().error("Error : resultset is null -> see previous error");
		
		// get the requested chartType
		String chartTypeParam=pm.getParams().get("chartType").toString(); 
		if(chartTypeParam==null)
			throw new InvalidParameterException(InvalidParameterException.ERROR_001);
		
		ChartType[] values=ChartType.values();
		ChartType cType=null;
		for( int v=0;v<values.length;++v)
		{
			if(values[v].name().equals(chartTypeParam.toUpperCase()))
			{
				cType=values[v];
			}
		}
		if(cType==null)
			throw new InvalidParameterException(InvalidParameterException.ERROR_002);
		
		//init chart
		FusionComponent fusionComponent = new FusionComponent("chart",cType,resultset.getRowCount());
		
		//set data
		fusionComponent.setData(resultset);
		
		//fill the properties of chart
		fusionComponent.setChartProperties(pm.getParams());

		//generate output
		gererateOutput(out,fusionComponent);
	}

	/**
	 * 
	 * Generate the output html 
	 * If ISDASHBOARDMODE is set to false does't render the all html page
	 * IS ISDASHBOARDMODE not defined or is true does't render the all html page
	 * 
	 * @param out Out Stremam 
	 * @param fusionComponent Fusion Component to render
	 * @throws Exception
	 * @throws IOException
	 */
	private void gererateOutput(OutputStream out,FusionComponent fusionComponent) throws Exception, IOException {
		TreeMap<String, String> params = pm.getParams();
		if(params.containsKey(ISDASHBOARDMODE))
		{
			if(!Boolean.parseBoolean(params.get(ISDASHBOARDMODE)))
			{
				String output="<html><head>" +
				"  <title>Example Graph</title>  " +
				" <SCRIPT LANGUAGE='Javascript' SRC='"+PentahoSystem.getApplicationContext().getFullyQualifiedServerURL()+"content/fusion/js/FusionCharts.js'></SCRIPT>" +
				"<script type='text/javascript' src='"+PentahoSystem.getApplicationContext().getFullyQualifiedServerURL()+"content/fusion/js/FusionChartsDOM_commented.js'></script></head>" +
				"<body onload=\"setTimeout('FusionChartsDOM.RenderAllCharts(true)',1000)\">";
				output+=fusionComponent.execute();
				output+="</body></html>";
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
	 * @throws UnsupportedEncodingException thrown where encoding is not suported
	 */
	private void setProperties(IParameterProvider requestParams) throws UnsupportedEncodingException 
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
	private IPentahoResultSet invokeCDA() throws Exception {
		final ISolutionRepository repository = PentahoSystem.get(ISolutionRepository.class, userSession);
		final ISolutionFile file = repository.getSolutionFile(getAction().toString(), ISolutionRepository.ACTION_EXECUTE);

		if (file==null){
			getLogger().error("No solution file found: ".concat(getAction().toString()));
			return null;
		}

		cdaQueryComponent = new CdaQueryComponent();
		cdaQueryComponent.setFile(file.getFullPath());

		//get dataAccess ID from request
		Map <String, Object> cdaInputs = new HashMap <String, Object>();
		cdaInputs.put("dataAccessId", pm.getParams().get(CDAID));
		cdaInputs.put("cdaParameterString",cdaParames());
		cdaQueryComponent.setInputs(cdaInputs);
		
		IPentahoResultSet resultset = null;

		//execute query
		if (cdaQueryComponent.execute()){
			resultset = cdaQueryComponent.getResultSet();
		}

		if (resultset==null){
			getLogger().error("Error retrieving data: cdaQueryComponent failed to return data. ");
			return null;
		}
		return resultset;

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

		final String solution = pm.getParams().get(CDASOLUTION); 
		final String path = pm.getParams().get(CDAPATH); 
		final String name = pm.getParams().get(CDANAME);
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
	
	public FusionGraph dummyChartPie()
	{
		//Initialize FusionChart variables
		FusionGraph graph		= null;
		ChartFactory chart	= null;
		String errMsg = null;

		try
		{
			/**
			 * Start code of building the graph
			 *
			 **/
			//create graph object
			graph = new FusionGraph("columnsGraph",ChartType.COLUMN3D,5);

			//set chart properties and chart look
			graph.setWidth(390);
			graph.setHeight(150);
			graph.setChartProperties("showZeroPies","0");
			graph.setChartProperties("bgColor","FFFFFF,CCCC33");
			graph.setChartProperties("smartLineThickness","2");
			graph.setChartProperties("baseFont","Arial");
			graph.setChartProperties("baseFontSize","12");
			graph.setChartProperties("showToolTipShadow","1"); 
			graph.setChartProperties("toolTipBgColor","D9E5F1");
			graph.setChartProperties("pieRadius","90");

			//create series
			Series series = graph.createSeries("bar series");
			String[] categories = {"a","b","c","d","e"};
			Double[] seriesValues = {100.0,150.0,120.0,130.0,140.0};
			String[] seriesColors = {"FFFFFF","FFFCCC","33FF00","6600CC","990000"};

			//lets pretend that we got categories and seriesValues from data instead of hardcoding it
			for(int i = 0; i< categories.length;i++)
			{
				graph.setCategory(i,categories[i]);

				series.setValue(i,seriesValues[i]);
				series.setColor(i,seriesColors[i]);
			}
		}
		catch (Exception e)
		{
			errMsg = "Error: "+ e;
		}
		return graph;
	}

	public FusionGraph dummyChartBar()
	{
		//Initialize FusionChart variables
		FusionGraph graph		= null;
		try
		{
			/**
			 * Start code of building the graph
			 *
			 **/
			//create graph object
			graph = new FusionGraph("pieGraph",ChartType.PIE3D,5);

			//set chart properties and chart look
			graph.setWidth(390);
			graph.setHeight(150);
			graph.setChartProperties("showZeroPies","0");
			graph.setChartProperties("bgColor","FFFFFF,CCCC33");
			graph.setChartProperties("smartLineThickness","2");
			graph.setChartProperties("baseFont","Arial");
			graph.setChartProperties("baseFontSize","12");
			graph.setChartProperties("showToolTipShadow","1");
			graph.setChartProperties("toolTipBgColor","D9E5F1");
			graph.setChartProperties("pieRadius","90");

			//create series
			Series series = graph.createSeries("pie series");
			String[] categories = {"a","b","c","d","e"};
			Double[] seriesValues = {100.0,150.0,120.0,130.0,140.0};
			String[] seriesColors = {"FFFFFF","FFFCCC","33FF00","6600CC","990000"};

			//lets pretend that we got categories and seriesValues from data instead of hardcoding it
			for(int i = 0; i< categories.length;i++)
			{
				graph.setCategory(i,categories[i]);

				series.setValue(i,seriesValues[i]);
				series.setColor(i,seriesColors[i]);
			}
		}
		catch (Exception e)
		{
		}
		return graph;
	}


}
