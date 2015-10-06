package com.xpandit.fusionplugin.pentaho;

import pt.webdetails.cpf.PluginSettings;
import org.pentaho.platform.engine.core.system.PentahoSystem;

public class FusionPluginSettings extends PluginSettings {
	
	private static final String BASE_PATH = "";
	
	public FusionPluginSettings(){
		super(FcPluginEnvironment.getInstance().getContentAccessFactory().getPluginSystemWriter(""));
	}
	
	 public String getBasePath() {
		    return getStringSetting( "basePath", PentahoSystem.getApplicationContext().getSolutionPath( BASE_PATH ) );
		  }
}
