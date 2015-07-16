package com.xpandit.fusionplugin.pentaho.content;

import java.io.OutputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;

import org.apache.log4j.Logger;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.engine.core.solution.SimpleParameterProvider;
import org.pentaho.platform.web.http.request.HttpRequestParameterProvider;

import com.xpandit.fusionplugin.exception.InvalidParameterException;
import com.xpandit.fusionplugin.pentaho.FusionComponent;
import com.xpandit.fusionplugin.pentaho.input.ParameterParser;

@Path("/{plugin}/api")
public class FusionApi {

	Logger logger = Logger.getLogger(FusionApi.class);

	public Map<String, IParameterProvider> getParameterProviders(
			HttpServletRequest request) {
		Map<String, IParameterProvider> parameterProviders = new HashMap<String, IParameterProvider>();
		IParameterProvider requestParameters = new HttpRequestParameterProvider(request);
		SimpleParameterProvider headerParams = new SimpleParameterProvider();
		Enumeration names = request.getHeaderNames();
		while (names.hasMoreElements()) {
			String name = (String) names.nextElement();
			String value = request.getHeader(name);
			headerParams.setParameter(name, value);
		}
		parameterProviders.put(IParameterProvider.SCOPE_REQUEST, requestParameters);
		parameterProviders.put("headers", headerParams);
		parameterProviders.put("path", new SimpleParameterProvider());
		return parameterProviders;
	}

	public void printParameterParser(ParameterParser pp) {
		logger.debug("START");
		for (Entry<String, Object> entry : pp.getParameters().entrySet()) {
			logger.debug(entry.getKey() + " :: " + entry.getValue());
		}
		logger.debug("END");
	}
	
	public ParameterParser buildParameterParser(HttpServletRequest request)
			throws InvalidParameterException {
		ParameterParser parameterParser = new ParameterParser(getParameterProviders(request));
		return parameterParser;
	}

	public ParameterParser buildParameterParser(HttpServletRequest request,
			MultivaluedMap<String, String> formParams) throws InvalidParameterException {
		ParameterParser pp = buildParameterParser(request);
		for (String key : formParams.keySet()) {
			Object value = formParams.get(key);
//			logger.debug(value.getClass());
			if (value.getClass() == java.util.LinkedList.class) {
				LinkedList ll = (LinkedList) value;
				pp.putParameter(key, ll.getFirst());
			}
			else {
				pp.putParameter(key, value);
			}
		}
		return pp;
	}

	@GET
	@Path("/chart")
	public void getChartGET(@Context HttpServletRequest request,
			@Context HttpServletResponse response) throws Exception {
		OutputStream out = response.getOutputStream();
		ParameterParser pp = buildParameterParser(request);
		printParameterParser(pp);
		FusionComponent fc = new FusionComponent(pp);
		fc.renderChartGetData(out);
	}

	@POST
	@Path("/chart")
	public void getChartPOST(@Context HttpServletRequest request,
			@Context HttpServletResponse response,
			MultivaluedMap<String, String> formParams) throws Exception {
		OutputStream out = response.getOutputStream();
		ParameterParser pp = buildParameterParser(request, formParams);
		printParameterParser(pp);
		FusionComponent fc = new FusionComponent(pp);
		fc.renderChartGetData(out);
	}

}
