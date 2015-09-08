package com.xpandit.fusionplugin.pentaho.content;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import org.apache.log4j.Logger;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.engine.core.solution.SimpleParameterProvider;

import pt.webdetails.cpf.utils.PluginUtils;
import pt.webdetails.cpk.CpkCoreService;
import pt.webdetails.cpk.CpkPentahoEnvironment;
import pt.webdetails.cpk.elements.IElement;
import pt.webdetails.cpk.utils.CpkUtils;

import com.sun.jersey.api.representation.Form;
import com.sun.jersey.spi.container.ContainerRequest;
import com.xpandit.fusionplugin.exception.InvalidParameterException;
import com.xpandit.fusionplugin.pentaho.FusionComponent;
import com.xpandit.fusionplugin.pentaho.input.ParameterParser;
import com.xpandit.fusionplugin.util.LicenseChecker;
import com.xpandit.fusionplugin.util.VersionChecker;

/**
 * 
 * xFusion plugin REST API. This class serves chart requests and version checks.
 * 
 * @author bacr
 * 
 */

@Path("/{plugin}/api")
public class FusionApi {

	Logger logger = Logger.getLogger(FusionApi.class);

	private static final String DEFAULT_NO_DASHBOARD_MESSAGE = "This plugin does not contain a dashboard";
	private static final String[] reservedWords = { "ping", "default", "reload", "refresh", "version", "status", "getSitemapJson", "elementsList", "listDataAccessTypes", "reloadPlugins" };
	
	protected CpkPentahoEnvironment cpkEnv;
	protected CpkCoreService coreService;
	
	FusionApi() {
		cpkEnv = new CpkPentahoEnvironment( new PluginUtils(), reservedWords );
		coreService = new CpkCoreService( this.cpkEnv );
	}
		
	/**
	 * Parameter adapter. We use it so we're able to run the ParameterParser class without the IParameterProvider map given by the old Content Generator.
	 * @param request HTTP Request with header and request parameters.
	 * @param jsonStr JSON string obtained through POST calls.
	 * @return A map with the IParameterProviders "request", "headers", "path".
	 */
	private Map<String, IParameterProvider> getParameterProviders(
			HttpServletRequest request, String jsonStr) {

		Map<String, IParameterProvider> parameterProviders = new HashMap<String, IParameterProvider>();
		// Create request parameters
		SimpleParameterProvider requestParams = new SimpleParameterProvider();
		Enumeration paramKeys = request.getParameterNames();
		while (paramKeys.hasMoreElements()) {
			String key = (String) paramKeys.nextElement();
			String value = request.getParameter(key);
			requestParams.setParameter(key, value);
		}
		// If there's a JSON string it should be put together with the request parameters so it can be correctly parsed
		if (jsonStr != null) {
			requestParams.setParameter("json", jsonStr);
		}

		// Create header parameters
		SimpleParameterProvider headerParams = new SimpleParameterProvider();
		Enumeration names = request.getHeaderNames();
		while (names.hasMoreElements()) {
			String name = (String) names.nextElement();
			String value = request.getHeader(name);
			headerParams.setParameter(name, value);
		}

		// Populate IParameterProvider map
		parameterProviders.put(IParameterProvider.SCOPE_REQUEST, requestParams);
		parameterProviders.put("headers", headerParams);
		parameterProviders.put("path", new SimpleParameterProvider());
		return parameterProviders;
	}

	/**
	 * Log in debug mode all the parsed request parameters.
	 * @param pp ParameterProvider to be logged.
	 */
	private void printParameterParser(ParameterParser pp) {
		for (Entry<String, Object> entry : pp.getParameters().entrySet()) {
			logger.debug(entry.getKey() + " :: " + entry.getValue());
		}
	}
	
	/**
	 * Build a ParameterParser from a HTTP Request and an optional JSON string.
	 * @param request HTTP request.
	 * @param jsonStr Optional JSON string, useful in POST calls.
	 * @return The ParameterParser to be used in the built chart.
	 * @throws InvalidParameterException
	 */
	private ParameterParser buildParameterParser(HttpServletRequest request, String jsonStr)
			throws InvalidParameterException {
		ParameterParser parameterParser = new ParameterParser(getParameterProviders(request, jsonStr));
		return parameterParser;
	}
	
	/**
	 * Check Pentaho version
	 * @return
	 * @throws Exception
	 */
	@GET
	@Path("/checkVersions")
	public String getVersion() throws Exception {
		return VersionChecker.getVersions();
	}
	
	/**
	 * Get the Fusion Chart XML to be rendered
	 * @param request HTTP Request
	 * @return Fusion Chart XML
	 * @throws Exception
	 */
	@GET
	@Path("/renderChart")
	public String doGetRenderChart(@Context HttpServletRequest request) throws Exception {
		logger.debug("\n\nrenderChart START\n----------------");
		// Build parameter parser
		ParameterParser pp = buildParameterParser(request, null);
		printParameterParser(pp);
		
		// Check license and act accordingly
		String licenseChecked = LicenseChecker.verifyKey();
		if (licenseChecked.startsWith("Error")) {
			logger.error(licenseChecked);
			logger.debug("\n----------------\nrenderChart END\n\n");
			return licenseChecked;
		}
		else if (licenseChecked.startsWith("Warning")) {
			logger.warn(licenseChecked);
		}
		FusionComponent fc = new FusionComponent(pp);
		String fcResult = fc.renderChartGetData();
		logger.debug("\n----------------\nrenderChart END\n\n");
		return licenseChecked + fcResult;
	}

	/**
	 * Get a Fusion Chart to be embedded in Analyzer  
	 * @param request HTTP request
	 * @param jsonStr POST body with all the parameters and chart data
	 * @return Fusion Chart XML
	 * @throws Exception
	 */
	@POST
	@Path("/renderChartExternalData")
	public String doPostRenderChartExternalData(@Context HttpServletRequest request,
			@FormParam("json") String jsonStr) throws Exception {
		logger.debug("\n\nrenderChartExternalData START\n----------------");
		// Build parameter parser
		ParameterParser pp = buildParameterParser(request, jsonStr);
		printParameterParser(pp);
		
		// Check license and act accordingly
		String licenseChecked = LicenseChecker.verifyKey();
		if (licenseChecked.startsWith("Error")) {
			logger.error(licenseChecked);
			logger.debug("\n----------------\nrenderChartExternalData END\n\n");
			return licenseChecked;
		}
		else if (licenseChecked.startsWith("Warning")) {
			logger.warn(licenseChecked);
		}
		FusionComponent fc = new FusionComponent(pp);
		String fcResult = fc.renderChartGetData();
		logger.debug("\n----------------\nrenderChartExternalData END\n\n");
		return licenseChecked + fcResult;
	}

	/**
	 * Build an auto-updating chart to be rendered
	 * @param request HTTP request
	 * @return Real time Fusion Chart XML
	 * @throws Exception
	 */
	@GET
	@Path("/dataStream")
	public String doGetDataStream(@Context HttpServletRequest request) throws Exception {
		logger.debug("\n\ndataStream START\n----------------");
		// Build parameter parser
		ParameterParser pp = buildParameterParser(request, null);
		printParameterParser(pp);
		
		// Check license and act accordingly
		String licenseChecked = LicenseChecker.verifyKey();
		if (licenseChecked.startsWith("Error")) {
			logger.error(licenseChecked);
			logger.debug("\n----------------\ndataStream END\n\n");
			return licenseChecked;
		}
		else if (licenseChecked.startsWith("Warning")) {
			logger.warn(licenseChecked);
		}
		FusionComponent fc = new FusionComponent(pp);
		String fcResult = fc.dataStream();
		logger.debug("\n----------------\ndataStream END\n\n");
		return licenseChecked + fcResult;
	}

	
//	WORKAROUND: Replicate some CpkApi code
	
	@GET
	@Path( "/default" )
	public void defaultElement( @Context HttpServletResponse response ) throws IOException {
		IElement defaultElement = coreService.getDefaultElement();
		if ( defaultElement != null ) {
			CpkUtils.redirect( response, defaultElement.getId() );
		} else {
			response.getOutputStream().write( DEFAULT_NO_DASHBOARD_MESSAGE.getBytes( "UTF-8" ) );
			response.getOutputStream().flush();
		}
	}


	  @GET
	  @Path( "/{param}" )
	  public void genericEndpointGet( @PathParam( "param" ) String param, @Context HttpServletRequest request,
	                                  @Context HttpServletResponse response, @Context HttpHeaders headers )
	    throws Exception {
	    setCorsHeaders( request, response );
	    callEndpoint( param, request, response, headers );
	  }

	  @POST
	  @Path( "/{param}" )
	  public void genericEndpointPost( @PathParam( "param" ) String param, @Context HttpServletRequest request,
	                                   @Context HttpServletResponse response, @Context HttpHeaders headers )
	    throws Exception {
	    setCorsHeaders( request, response );
	    callEndpoint( param, request, response, headers );
	  }

	  private void setCorsHeaders( HttpServletRequest request, HttpServletResponse response ) {
	    String origin = request.getHeader( "ORIGIN" );
	    if ( origin != null ) {
	      response.setHeader( "Access-Control-Allow-Origin", origin );
	      response.setHeader( "Access-Control-Allow-Credentials", "true" );
	    }
	  }

	  public void createContent( Map<String, Map<String, Object>> bloatedMap ) throws Exception {
	    coreService.createContent( bloatedMap );
	  }

	  private void callEndpoint( String endpoint, HttpServletRequest request, HttpServletResponse response,
	                             HttpHeaders headers )
	    throws Exception {
	    Map<String, Map<String, Object>> bloatedMap = buildBloatedMap( request, response, headers );
	    bloatedMap.get( "path" ).put( "path", "/" + endpoint );
	    coreService.createContent( bloatedMap );

	    // make sure that everything written in the output stream is sent to the client
	    response.getOutputStream().flush();
	  }

	  private Map<String, Map<String, Object>> buildBloatedMap( HttpServletRequest request, HttpServletResponse response,
	                                                            HttpHeaders headers ) {
	    Map<String, Map<String, Object>> mainMap = new HashMap<String, Map<String, Object>>();

	    mainMap.put( "request", buildRequestMap( request, headers ) );
	    mainMap.put( "path" + "", buildPathMap( request, response, headers ) );

	    return mainMap;

	  }

	  private Map<String, Object> buildRequestMap( HttpServletRequest request, HttpHeaders headers ) {
	    Map<String, Object> requestMap = new HashMap<String, Object>();

	    //requestMap.put( PARAM_WEBAPP_DIR, PentahoSystem.getApplicationContext().getApplicationPath( "" ) );

	    if ( request == null ) {
	      return requestMap;
	    }
	    Enumeration e = request.getParameterNames();
	    while ( e.hasMoreElements() ) {
	      Object o = e.nextElement();
	      requestMap.put( o.toString(), request.getParameter( o.toString() ) );
	    }
	    Form form =
	      ( (ContainerRequest) headers ).getFormParameters();
	    Iterator<String> it = form.keySet().iterator();
	    while ( it.hasNext() ) {
	      String next = it.next();
	      requestMap.put( next, form.get( next ).get( 0 ) );
	    }
	    return requestMap;
	  }

	  private Map<String, Object> buildPathMap( HttpServletRequest request, HttpServletResponse response,
	                                            HttpHeaders headers ) {

	    Map<String, Object> pathMap = new HashMap<String, Object>();
	    pathMap.put( "httprequest", request );
	    pathMap.put( "httpresponse", response );
	    if ( headers != null && headers.getRequestHeaders()
	      .containsKey( "contentType" ) ) {
	      pathMap.put( "contentType", headers.getRequestHeader( "contentType" ) );
	    }
	    return pathMap;
	  }
	
}
