package com.xpandit.fusionplugin;

import java.io.IOException;
import java.util.Properties;
import java.util.TreeMap;

import org.apache.log4j.Logger;
import org.pentaho.platform.api.repository2.unified.IUnifiedRepository;
import org.pentaho.platform.api.repository2.unified.RepositoryFile;
import org.pentaho.platform.api.repository2.unified.data.simple.SimpleRepositoryFileData;
import org.pentaho.platform.engine.core.system.PentahoSystem;

import com.xpandit.fusionplugin.exception.InvalidParameterException;

/**
 * 
 * Class thats manages all chart properties.
 * 
 * 3 types of properties are supported:
 * 
 * Global - From FusionCharts.properties file in plugin folder Local - From any file in any solution folder, the file
 * path and solution are set by Url Params(propFile,propPath and propSolution) Instance - From url params.
 * 
 * The priority of the parameters is Instance->Local->Global. Meaning that on each step they can be overridden.
 * 
 * @author dduque
 * 
 */
public class PropertiesManager {

    // Well known parameter types.
    public static final String NAME = "name";
    public static final String SOLUTION = "solution";
    public static final String PATH = "path";
    public static final String XFUSIONPATH = "xFusionPath";
    public static final String KEY_DATA = "data";

    // CDA Parameters
    public static final String CDANAME = "cdaName";
    public static final String CDAPATH = "cdaPath";
    public static final String CDASOLUTION = "cdaSolution";
    public static final String CDAID = "cdaDataAccessId";

    // Types of result sets
    public static final String TARGET_VALUES = "target";
    public static final String RANGE_VALUES = "range";

    // Other
    public static final String ISDASHBOARDMODE = "dashboard-mode";
    public static final String CHARTXML = "chartXML";
    
    //Security
    public static final String PREVENTXSS = "preventXSS";
    public static final String XSS_REGEX = "xssRegex";
    public static final String XSS_REGEX_ATTRIBUTES = "xssRegexAttributes";

    private Logger log = Logger.getLogger(PropertiesManager.class);// class Logger

    // Manager for properties obtained from the .xfusion file
    private TreeMap<String, Object> localProperties = null;

    // Properties obtained from the instance.
    private TreeMap<String, Object> instanceProperties = null;

    // Single property for non-legacy mode
    private String xFusionFile = null;
    
    // Set of all properties populated in the right order to allow overriding
    TreeMap<String, Object> params = null;

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
    public PropertiesManager(TreeMap<String, Object> instanceProperties) throws InvalidParameterException {
        // used to handle legacy mode of referencing files
        if (instanceProperties.get(XFUSIONPATH) != null && (String) instanceProperties.get(XFUSIONPATH) != "")
            this.xFusionFile = (String) instanceProperties.get(XFUSIONPATH);
        else if (instanceProperties.get(NAME) != null || instanceProperties.get(PATH) != null) {
            String filePath = (String) instanceProperties.get(SOLUTION) + "/" + (String) instanceProperties.get(PATH)
                    + "/" + (String) instanceProperties.get(NAME);
            // if any of the fields is empty we don't want double / on the path
            this.xFusionFile = filePath.replace("//", "/");
        }
        this.instanceProperties = instanceProperties;
        this.localProperties = new TreeMap<String, Object>();
        
        // put all properties by order all properties are replaced
        params = new TreeMap<String, Object>();
        params.putAll(GlobalPropertiesManager.getInstance().getProperties());

        // check if xFusion is being used
        if (this.xFusionFile == null) {
            log.debug("No xFusion file is configured");
        } else {
            fillLocalParameters();
            params.putAll(localProperties);
        }
        
        //if cross site scripting security is activated validate all outside parameters for suspicious values.
        //this parameter can only be activated on global or xfusion file
        if(params.get(PREVENTXSS)!= null && ((String) params.get(PREVENTXSS)).equalsIgnoreCase("true")){
            String regex = null;
            if(params.get(XSS_REGEX)!= null){
                regex = ((String) params.get(XSS_REGEX));
            } else { //default pattern if non is defined
                regex = "[\\wáÁãÃâÂéÉêÊíÍóÓõÕóÓúÚçÇ;]*|[\\w,]*|[\\w\\[\\]\\.&,]*|[\\w_]*|[\\w\\-]*|[\\w/]*|[\\w#;]*";
            }
            secureInstanceParameters(instanceProperties,regex);
            
            //remover a regex para não ser mostrados aos utilizadores
            params.remove(PREVENTXSS);
            params.remove(XSS_REGEX);
        }
        
        params.putAll(instanceProperties);
    }

    /**
     * fill all instance parameters based on xfusion solution file
     * 
     * @throws InvalidParameterException
     */
    private void fillLocalParameters() throws InvalidParameterException {

        // get file
        final IUnifiedRepository repository = PentahoSystem.get(IUnifiedRepository.class, null);
        final RepositoryFile file = repository.getFile(xFusionFile);

        // if is no file and propFile is set log a warning
        if (file == null) {
            throw new InvalidParameterException(InvalidParameterException.ERROR_005 + ":"
                    + "No solution file found to set properties:" + "xFusionFile->" + xFusionFile);
        }

        // load properties
        Properties properties = new Properties();
        try {
            properties.load(repository.getDataForRead(file.getId(), SimpleRepositoryFileData.class).getInputStream());
        } catch (IOException e) {
            throw new InvalidParameterException("Unable to Load properties file: "+ xFusionFile);
        }

        // fill properties
        for (Object key : properties.keySet()) {
            String stringKey = (String) key;
            localProperties.put(stringKey.trim(), properties.getProperty(stringKey).trim());
        }
    }

    /**
     * Join all parameter types and returns the object
     * 
     * @return Map with all parameters joined by order
     */
    public TreeMap<String, Object> getParams() {

        // used for legacy mode of referencing files
        // TODO do we need to handle cda file was specified and it is on the same directory as xfusion?
        if (params.get(CDASOLUTION) != null) {
            String solution = (String) params.get(CDASOLUTION);
            String path = (String) params.get(CDAPATH);
            String name = (String) params.get(CDANAME);

            if (path != null && path != "")
                params.put(CDAPATH, "/" + solution + "/" + path + "/" + name);
            else
                params.put(CDAPATH, "/" + solution + "/" + name);
        //CDA name can be set alone if an xfusion file is defined. Same directory is used for both.    
        } else if (params.get(CDANAME) != null && xFusionFile != null) {
            params.put(CDAPATH,xFusionFile.substring(0,xFusionFile.lastIndexOf("/")+1) + (String) params.get(CDANAME));
        }

        // the default for dashboard mode is false because this used to be the default behavior when opening an xfusion
        // TODO replace this default by having multiple entry points with method annotations and thus set dashboard mode
        // only when an xfusion is opened.
        if (params.get(ISDASHBOARDMODE) == null) {
            params.put(ISDASHBOARDMODE, "false");
        }

        return params;
    }

    /**
     * 
     * returns list of instance parameters
     * 
     * @return
     */
    public TreeMap<String, Object> getInstanceParameters() {
        return instanceProperties;
    }
    
    /**
     * Method that verifies if all instance parameters are compliant and don't have any scripting
     * @param instanceProperties Parameters obtained from the request
     * @param regex  Regex pattern to apply on validation
     * @throws InvalidParameterException Throws exception if pattern is not matched
     */
    private void secureInstanceParameters(TreeMap<String, Object> properties, String regex) throws InvalidParameterException{
        
        for(String key : properties.keySet()){
            if(!key.matches(regex))
                throw new InvalidParameterException("Cross-site scripting validation is active! Parameter name:\""+key+"\" is not compliant with regex validation");
            String value = properties.get(key).toString();
            if(!value.matches(regex))
                throw new InvalidParameterException("Cross-site scripting validation is active! Parameter (\""+key+"\") value:\""+value+"\" is not compliant with regex validation");
        }
    }
}
