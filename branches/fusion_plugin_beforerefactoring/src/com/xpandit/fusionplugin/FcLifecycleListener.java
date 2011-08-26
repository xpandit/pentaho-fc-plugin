package com.xpandit.fusionplugin;

import org.pentaho.platform.api.engine.IPluginLifecycleListener;
import org.pentaho.platform.api.engine.PluginLifecycleException;

/**
 * This class inits fc plugin within the bi-platform
 * @author gorman
 *
 */
public class FcLifecycleListener implements IPluginLifecycleListener
{

  public void init() throws PluginLifecycleException
  {
    // boot fc 
	GlobalPropertiesManager.getInstance();
  }


  public void loaded() throws PluginLifecycleException
  {
    ClassLoader contextCL = Thread.currentThread().getContextClassLoader();
    try
    {
      Thread.currentThread().setContextClassLoader(this.getClass().getClassLoader());
    }
    catch (Exception e)
    {
    }
    finally
    {
      Thread.currentThread().setContextClassLoader(contextCL);
    }
  }


  public void unLoaded() throws PluginLifecycleException
  {
  }
}
