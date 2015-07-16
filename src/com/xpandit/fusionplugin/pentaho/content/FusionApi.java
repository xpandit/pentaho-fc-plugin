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
import com.xpandit.fusionplugin.util.VersionChecker;


@Path("/{plugin}/api")
public class FusionApi {

	Logger logger = Logger.getLogger(FusionApi.class);

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

	private void printParameterParser(ParameterParser pp) {
		logger.debug("START");
		for (Entry<String, Object> entry : pp.getParameters().entrySet()) {
			logger.debug(entry.getKey() + " :: " + entry.getValue());
		}
		logger.debug("END");
	}
	
	private ParameterParser buildParameterParser(HttpServletRequest request, String jsonStr)
			throws InvalidParameterException {
		ParameterParser parameterParser = new ParameterParser(getParameterProviders(request, jsonStr));
		return parameterParser;
	}
	
	@GET
	@Path("/checkVersions")
	public String getVersion() throws Exception {
		return VersionChecker.getVersions();
	}
	
	@GET
	@Path("/renderChart")
	public String doGetRenderChart(@Context HttpServletRequest request) throws Exception {
		logger.debug("\n\nrenderChart START\n----------------");
		ParameterParser pp = buildParameterParser(request, null);
		printParameterParser(pp);
		FusionComponent fc = new FusionComponent(pp);
		logger.debug("\n----------------\nrenderChart END\n\n");
		return fc.renderChartGetData();
	}

	@POST
	@Path("/renderChartExternalData")
	public String doPostRenderChartExternalData(@Context HttpServletRequest request,
			@FormParam("json") String jsonStr) throws Exception {
		logger.debug("\n\nrenderChartExternalData START\n----------------");
		ParameterParser pp = buildParameterParser(request, jsonStr);
		printParameterParser(pp);
		FusionComponent fc = new FusionComponent(pp);
		logger.debug("\n----------------\nrenderChartExternalData END\n\n");
		return fc.renderChartGetData();
	}

	@GET
	@Path("/dataStream")
	public String doGetDataStream(@Context HttpServletRequest request) throws Exception {
		logger.debug("\n\ndataStream START\n----------------");
		logger.debug("\n----------------\ndataStream END\n\n");
		return "";
	}


}
