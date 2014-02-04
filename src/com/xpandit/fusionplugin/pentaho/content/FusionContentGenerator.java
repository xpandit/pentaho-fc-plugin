package com.xpandit.fusionplugin.pentaho.content;

import java.io.OutputStream;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.platform.engine.services.solution.SimpleContentGenerator;

import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.pentaho.FusionComponent;
import com.xpandit.fusionplugin.pentaho.input.ParameterParser;
import com.xpandit.fusionplugin.util.LicenseChecker;
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

	private static final String MIMETYPE = "text/html";

	// Request parser
	ParameterParser parameterParser = null;

	// Properties Manager
	PropertiesManager pm = null;

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

		// TODO code bellow is too tightly coupled. Parameter manager should have all the necessary methods.
		parameterParser = new ParameterParser(parameterProviders);

		// Identify operation based on URL call
		String method = parameterParser.extractMethod();

		FusionComponent fc = new FusionComponent(parameterParser);

		// Verify first if license has not expired
		if(LicenseChecker.verifyKey(out)){
			if (method == null) { // Generate chart
				fc.renderChartGetData(out);
			} else if ("dataStream".equals(method)) { // called by real time charts to update data
				fc.dataStream(out);
			} else if ("checkVersions".equals(method)) { // check the Pentaho version
				VersionChecker.getVersions(out);
			} else if ("renderChartExternalData".equals(method)) { // render chart using external data
				fc.renderChartGetData(out);
			}
		}
	}

	
}
