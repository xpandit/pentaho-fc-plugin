package com.xpandit.fusionplugin.pentaho.content;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

import org.apache.log4j.Logger;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.engine.core.solution.SimpleParameterProvider;

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
		logger.debug("\n----------------\nrenderChart END\n\n");
		return licenseChecked + fc.renderChartGetData();
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
		logger.debug("\n----------------\nrenderChartExternalData END\n\n");
		return licenseChecked + fc.renderChartGetData();
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
		logger.debug("\n----------------\ndataStream END\n\n");
		return licenseChecked + fc.dataStream();
	}


}
