package com.xpandit.fusionplugin.pentaho.content;

import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;

import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.reporting.libraries.base.util.StringUtils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * 
 * Class that parses URL requests to the component, obtaining all the necessary values.
 *
 * @author rplp
 * @version $Revision: 666 $
 *
 */
public class ParameterParser {
    
    /**
     * Encoding in use
     */
    private static final String ENCODING = "UTF-8";
   
    /**
     * Parameters obtained from the platform call.
     */
    private Map<String, IParameterProvider>  parameterProviders = null;
    
    /**
     * Parameters values after parsing.
     */
    private TreeMap<String, String> parameters = null;
    
    /**
     * Constructor for the class.
     * @param parameterProviders Parameters obtained from platform call.
     * @throws UnsupportedEncodingException 
     */
    public ParameterParser(Map<String, IParameterProvider>  parameterProviders) throws UnsupportedEncodingException{
        this.parameterProviders = parameterProviders;
        initializeParameters();
    }
    
    private void initializeParameters() throws UnsupportedEncodingException{
        //inialize object
        parameters = new TreeMap<String, String>();
        
        //get correct IParameterProvider
        IParameterProvider requestParams=parameterProviders.get(IParameterProvider.SCOPE_REQUEST);
        
        //go through all parameters and set properly
        @SuppressWarnings("unchecked")
        Iterator<Object> parameterNames = requestParams.getParameterNames();
        for (Iterator<Object> parameterIterator = parameterNames; parameterIterator.hasNext();) {
                String parameterKey = (String) parameterIterator.next();
                //TODO Remove!!!
                //String parameterValue=requestParams.getParameter(parameterKey).toString();
                String parameterValue=URLDecoder.decode(requestParams.getStringParameter(parameterKey,""), ENCODING);
                parameters.put(parameterKey.trim(),parameterValue.trim());
        }
    }
    
    /**
     * 
     * Method that parses the URL call in order to identify the correspoding operation
     * 
     * @param pathString Url call that was made to the content generator.
     * @return method The corresponding operation.
     */
    public String extractMethod() {
        
        IParameterProvider pathParams = parameterProviders.get("path");
        String pathString = pathParams.getStringParameter("path", null);
        
        if (StringUtils.isEmpty(pathString)) {
            return null;
        }
        final String pathWithoutSlash = pathString.substring(1);
        if (pathWithoutSlash.indexOf('/') > -1) {
            return null;
        }
        final int queryStart = pathWithoutSlash.indexOf('?');
        if (queryStart < 0) {
            return pathWithoutSlash;
        }
        return pathWithoutSlash.substring(0, queryStart);
    }
    
    /**
     * Get all parameters.
     * @return All parameters.
     */
    public TreeMap<String, String> getParameters(){
       return parameters;
    }
    
    /**
     * Obtain a specific parameter.
     * @param name The parameter name.
     * @return The parameter value.
     */
    public String getParameters(String name){
       return parameters.get(name);
    }
}
