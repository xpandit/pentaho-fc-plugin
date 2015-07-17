package com.xpandit.fusionplugin.pentaho;

import com.xpandit.fusionplugin.GlobalPropertiesManager;
import org.pentaho.platform.api.engine.IPluginLifecycleListener;
import org.pentaho.platform.api.engine.PluginLifecycleException;
import pt.webdetails.cpf.PentahoPluginEnvironment;
import pt.webdetails.cpf.PluginEnvironment;
import pt.webdetails.cpk.CpkLifecycleListener;

/**
 * This class initializes fc plugin within the bi-platform
 * 
 * @author gorman
 * 
 */
public class FcLifecycleListener extends CpkLifecycleListener implements IPluginLifecycleListener {

	
	public void init() throws PluginLifecycleException {
		// initialize gloab properties manager
		GlobalPropertiesManager.getInstance();
		super.init();
	}

	public void loaded() throws PluginLifecycleException {
		ClassLoader contextCL = Thread.currentThread().getContextClassLoader();
		try {
            super.loaded();
            FcPluginEnvironment.getInstance().init();
			Thread.currentThread().setContextClassLoader(this.getClass().getClassLoader());
		} catch (Exception e) {
		} finally {
			Thread.currentThread().setContextClassLoader(contextCL);
		}
		super.loaded();
	}

	@Override
	public void unLoaded() throws PluginLifecycleException {
		// TODO Auto-generated method stub
		super.unLoaded();
	}

    @Override
    public PluginEnvironment getEnvironment() {
        return PentahoPluginEnvironment.getInstance();
    }
}
