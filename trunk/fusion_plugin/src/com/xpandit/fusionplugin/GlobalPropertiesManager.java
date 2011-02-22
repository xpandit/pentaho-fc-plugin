package com.xpandit.fusionplugin;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;

import org.apache.log4j.Logger;
import org.pentaho.platform.engine.core.system.PentahoSystem;

/**
 * 
 * This class manage the global properties in fusionCharts.properties
 * 
 * @author dduque
 *
 */
public class GlobalPropertiesManager {
	
	public static final String PLUGIN_NAME = "fusion_plugin"; //$NON-NLS-1$

	private static TreeMap<String,String> globalProperties=null;//Global properties map
	
	private static  GlobalPropertiesManager sigleton=null;//singleton instance

	private Logger log = Logger.getLogger(GlobalPropertiesManager.class);//class Logger
	
	/**
	 * 
	 * inits the GlobalPropertiesManager based on fusionCharts.properties file
	 * 
	 */
	private GlobalPropertiesManager()
	{
		globalProperties=new TreeMap<String, String>();
		//load properties
		final File file = new File(PentahoSystem.getApplicationContext().getSolutionPath(
				"system/" + PLUGIN_NAME + "/fusionCharts.properties"));
	    
		//load properties
	    Properties properties = new Properties();
	    
	    try {
	    	InputStream is = new FileInputStream(file); 
	    	byte[] b= new byte[(int) file.length()];
	    	is.read(b);
			properties.load(new ByteArrayInputStream(b));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.error("Unable to Load Global file. Continue without properties file:",e);
			return;
		}
		
		//fill properties
		for (Object key : properties.keySet()) {
			String stringKey=(String) key;
			globalProperties.put(stringKey.trim(), properties.getProperty(stringKey).trim());
		}
	}
	
	/**
	 * 
	 * Returns a singleton instance of the GlobalPropertiesManager
	 * 
	 * @return
	 */
	public static synchronized GlobalPropertiesManager getInstance()
	{
		if(sigleton==null)
		{
			sigleton= new GlobalPropertiesManager();	
		}
		return sigleton;
	}

	/**
	 * 
	 * Get global properties
	 * 
	 * @return global properties map
	 */
	public Map<? extends String, ? extends String> getProperties() {
		return globalProperties;
	}
}
