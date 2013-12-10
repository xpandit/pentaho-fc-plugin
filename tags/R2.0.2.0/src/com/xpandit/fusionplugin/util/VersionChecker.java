package com.xpandit.fusionplugin.util;

import java.io.IOException;
import java.io.OutputStream;

import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.versionchecker.util.VersionInfo;
import org.pentaho.versionchecker.util.VersionHelper;

/**
 * 
 * This class gets the version of pentaho platform an components  
 * 
 * @author DGPG
 *
 */
public class VersionChecker {

	
	static VersionInfo versionInfoPentahoSystem = VersionHelper.getVersionInfo(PentahoSystem.class);

	
	public static void getVersions(OutputStream out) throws IOException {
		//generate a JS variable to be evaluated on client side
		out.write(("XDashFusionChartComponent.pentahoVersion={MajorVersion:"+versionInfoPentahoSystem.getVersionMajor()+",MinorVersion:"+versionInfoPentahoSystem.getVersionMinor()+"}").getBytes());
	}	
}
