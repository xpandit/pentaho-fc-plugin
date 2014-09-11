package com.xpandit.fusionplugin.util;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.pentaho.platform.engine.core.system.PentahoSystem;

import com.xpandit.keygen.serial.SerialData;
import com.xpandit.keygen.serial.SerialGenerator;


public class LicenseChecker {

	public final static Charset ENCODING = StandardCharsets.UTF_8;
	public static final String PLUGIN_NAME = "fusion_plugin"; 
	private static final long FIVE_DAY_WARNING = 432000;
	
	
	/**
	 * Verifies plugin key/license has not expired 
	 */
	public static boolean verifyKey(OutputStream out) throws IOException
	{
		Path path = Paths.get(PentahoSystem.getApplicationContext().getSolutionPath(
				"system/" + PLUGIN_NAME + "/key.txt"));

		File f = new File(path.toString());
		
		if(!f.exists()) { 
			f.createNewFile();
			out.write(("Error: Fusion Charts Plugin needs a license.").getBytes());
			return false;
		}
		
		// get key from file
		List<String> lines = Files.readAllLines(path, ENCODING);
		String key = lines.get(0);
		// parse key
		SerialData key_data = SerialGenerator.parse(key);

		// get current timestamp
		Date now = new Date();
		long now_seconds = TimeUnit.MILLISECONDS.toSeconds(now.getTime());

		if(key_data.getTimeStamp() < now_seconds)
		{
			//License expired
			out.write(("Error: Fusion Charts Plugin license has expired.").getBytes());
			return false;
		}
		else if(key_data.getTimeStamp() - now_seconds <= FIVE_DAY_WARNING)
		{
			//Send warning
			int d = (int)TimeUnit.SECONDS.toDays(key_data.getTimeStamp() - now_seconds);
			long hours = TimeUnit.SECONDS.toHours(key_data.getTimeStamp() - now_seconds) - (d *24);
			double aux = d + ((double)hours/24.0);
			int days = (int)Math.ceil(aux);
			
			if(days == 0){
				out.write(("Warning: FC Plugin license ends today!").getBytes());
			}else{
				out.write(("Warning: FC Plugin license will expire in "+days+
						((days == 1) ? " day!" : " days!")).getBytes());
			}
			return true;
		}
		else{
			//OK
			return true;
		}
	}
}
