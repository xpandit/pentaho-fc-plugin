package com.xpandit.fusionplugin.pentaho;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import org.pentaho.platform.api.engine.IPluginLifecycleListener;
import org.pentaho.platform.api.engine.PluginLifecycleException;
import org.pentaho.platform.engine.core.system.PentahoSystem;

import pt.portoeditora.pebook.serial.SerialData;
import pt.portoeditora.pebook.serial.SerialGenerator;

import com.xpandit.fusionplugin.GlobalPropertiesManager;

/**
 * This class initializes fc plugin within the bi-platform
 * 
 * @author gorman
 * 
 */
public class FcLifecycleListener implements IPluginLifecycleListener {

	
	public void init() throws PluginLifecycleException {
		// initialize gloab properties manager
		GlobalPropertiesManager.getInstance();
	}

	public void loaded() throws PluginLifecycleException {
		ClassLoader contextCL = Thread.currentThread().getContextClassLoader();
		try {
			Thread.currentThread().setContextClassLoader(this.getClass().getClassLoader());
		} catch (Exception e) {
		} finally {
			Thread.currentThread().setContextClassLoader(contextCL);
		}
	}

	public void unLoaded() throws PluginLifecycleException {
	}

}
