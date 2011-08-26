package com.xpandit.fusionplugin;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.Properties;
import java.util.TreeMap;

import org.apache.log4j.Logger;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.api.engine.ISolutionFile;
import org.pentaho.platform.api.repository.ISolutionRepository;
import org.pentaho.platform.engine.core.solution.ActionInfo;
import org.pentaho.platform.engine.core.system.PentahoSystem;

import com.xpandit.fusionplugin.exception.InvalidParameterException;

/**
 * 
 * This class manage all properties of the charts
 * 
 * Are supported 3 types of properties Global,Local and Instance
 * 
 * Global - From FusionCharts.properties file in plugin folder
 * Local - From any file in any solution folder, the file path and solution are set by Url Params(propFile,propPath and propSolution)
 * Instance - From url params
 * 
 * The Priority of the parameters is  Instance->Local->Global
 * 
 * @author dduque
 *
 */
public class PropertiesManager {
	
	private Logger log = Logger.getLogger(PropertiesManager.class);//class Logger
	
	private GlobalPropertiesManager globalProperties;//Global properties manager
	private TreeMap<String,String> localProperties=null;//Local properties map
	private TreeMap<String,String> instanceProperties=null;//instance properties map
	
	String propFile ;//name of properties file
	String propPath; // path of properties file
	String propSolution;//Solution name of properties file 
	IParameterProvider parameters;// Url Parameters
	String encoding;// encoding of url params

	/**
	 * 
	 * Initialize the properties manager
	 * 
	 * @param propFile File Name of local file properties 
	 * @param propPath Path of local file properties 
	 * @param propSolution Solution Name of local file properties 
	 * @param parameters Url Parameters 
	 * @param encoding Encoding of URL params
	 * @throws InvalidParameterException 
	 */
	public PropertiesManager(String propFile ,String propPath, String propSolution, IParameterProvider parameters, String encoding) throws InvalidParameterException
	{
		this.propFile=propFile;
		this.propPath=propPath;
		this.propSolution=propSolution;
		this.parameters=parameters;
		fillLocalParameters();
		fillInstancePrameters();
	}
	/**
	 * fill all instance parameters based on solution file
	 * @throws InvalidParameterException 
	 */
	private void fillLocalParameters() throws InvalidParameterException {
		localProperties=new TreeMap<String, String>();
		
		//get file 
		final ISolutionRepository repository = PentahoSystem.get(ISolutionRepository.class, null);
	    final ISolutionFile file = repository.getSolutionFile(new ActionInfo(propSolution,propPath,propFile).toString(), ISolutionRepository.ACTION_EXECUTE);
	    
	    //if is no file and propFile is set log a warning
	    if(file!=null)
	    {
		    if (file.getData()==null)
		    {
		    	if(!propFile.equals(""))
		    		throw new InvalidParameterException(InvalidParameterException.ERROR_005+":"+"No solution file found to set properties:"+"propSolution->"+propSolution+";propPath-->"+propPath+";propFile-->"+propFile);
		    	return;
		    }
	    }
	    else
	    {
	    	if(!propFile.equals(""))
	    		throw new InvalidParameterException(InvalidParameterException.ERROR_005+":"+"No solution file found to set properties:"+"propSolution->"+propSolution+";propPath-->"+propPath+";propFile-->"+propFile);
	    }
	    	
	    	
	    //load properties
	    Properties properties = new Properties();
	    try {
			properties.load(new ByteArrayInputStream(file.getData()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.error("Unable to Load properties file. Continue without properties file:"+"propSolution->"+propSolution+";propPath-->"+propPath+";propFile-->"+propFile,e);
			return;
		}
		
		//fill properties
		for (Object key : properties.keySet()) {
			String stringKey=(String) key;
			localProperties.put(stringKey.trim(), properties.getProperty(stringKey).trim());
		}
		

		
	}
	/**
	 * fill all instance parameters based on url params 
	 */
	private void fillInstancePrameters() {
		instanceProperties=new TreeMap<String, String>();
		
		Iterator parameterNames = parameters.getParameterNames();
		for (Iterator<Object> parameterIterator = parameterNames; parameterIterator.hasNext();) {
			String parameterKey = (String) parameterIterator.next();
			String parameterValue=parameters.getParameter(parameterKey).toString();
			instanceProperties.put(parameterKey.trim(),parameterValue.trim());
		}
		
	}
	/**
	 * Join all parameter types and returns the object
	 * 
	 * @return Map with all parameters joined by order 
	 */
	public TreeMap<String,String> getParams()
	{
		TreeMap<String,String> params=new TreeMap<String, String>();
		
		//put all properties by order all properties are replaced
		params.putAll(globalProperties.getInstance().getProperties());
		params.putAll(localProperties);
		params.putAll(instanceProperties);
		
		return params;
	}
	/**
	 * 
	 * returns the Solution of the xFusion properties file
	 * 
	 * @return
	 */
	public String getPropSolution() {
		return this.propSolution;
	}
	
	/**
	 * 
	 * returns the path of the xFusion properties file
	 * 
	 * @return
	 */
	public String getPropPath() {
		return this.propPath;
	}
}
