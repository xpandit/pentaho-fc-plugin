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
 * Class that manages the global properties obtained from fusionCharts.properties.
 * Acts as a singleton to allow reading the file only once when the plugin is initialized.
 * 
 * @author dduque
 * 
 */
public class GlobalPropertiesManager {
    
    //Plugin name to allow obtaing the global properties file
    public static final String PLUGIN_NAME = "fusion_plugin"; //$NON-NLS-1$

    // Global properties map
    private static TreeMap<String, String> globalProperties = null;

    // singleton instance
    private static GlobalPropertiesManager sigleton = null;

    // class Logger
    private Logger log = Logger.getLogger(GlobalPropertiesManager.class);

    /**
     * 
     * Initializes the GlobalPropertiesManager based on fusionCharts.properties file
     * 
     */
    private GlobalPropertiesManager() {
        globalProperties = new TreeMap<String, String>();
        // load properties
        final File file = new File(PentahoSystem.getApplicationContext().getSolutionPath(
                "system/" + PLUGIN_NAME + "/fusionCharts.properties"));

        // load properties
        Properties properties = new Properties();

        try {
            InputStream is = new FileInputStream(file);
            byte[] b = new byte[(int) file.length()];
            is.read(b);
            properties.load(new ByteArrayInputStream(b));
        } catch (IOException e) {
            log.error("Unable to Load Global file. Continue without properties file:", e);
            return;
        }

        // fill properties
        for (Object key : properties.keySet()) {
            String stringKey = (String) key;
            globalProperties.put(stringKey.trim(), properties.getProperty(stringKey).trim());
        }
    }

    /**
     * 
     * Returns a singleton instance of the GlobalPropertiesManager
     * 
     * @return
     */
    public static synchronized GlobalPropertiesManager getInstance() {
        if (sigleton == null) {
            sigleton = new GlobalPropertiesManager();
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
