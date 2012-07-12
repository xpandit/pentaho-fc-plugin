package com.xpandit.fusionplugin.pentaho.content;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Map;

import org.pentaho.commons.connection.IPentahoResultSet;

/**
 * 
 * Generate the results for the Real Time Charts
 * 
 * @author DGPG
 *
 */
public class FusionDataStream {

	/**
	 * 
	 * This method process the chart for the URLDataStream on the RealTime Charts
	 * 
	 * @param out
	 * @param resultSets
	 * @throws IOException
	 */
	public static void dataStream(OutputStream out,
			Map<String, ArrayList<IPentahoResultSet>> resultSets) throws IOException {

		IPentahoResultSet result= resultSets.get("results").get(0);
		int columnCount=result.getColumnCount();
		int rowCount=result.getRowCount();

		StringBuffer buffer=new StringBuffer();
		
		//generate Label
		buffer.append("&label=");
		for (int i=0;i<rowCount;++i)
		{	
			buffer.append(result.getValueAt(i,0));
			if(i<rowCount-1)
			{
				buffer.append(',');
			}
		}
		
		//generate value
		buffer.append("&value=");

		for (int j=1;j<columnCount;++j)
		{

			//generate more rows 
			for (int i=0;i<rowCount;++i)
			{	
				buffer.append(result.getValueAt(i,j));
				if(i<rowCount-1)
				{
					buffer.append(',');
				}
			}
			//generate more columns 
			if(j<columnCount-1)
			{
				buffer.append('|');
			}
		}

		out.write(buffer.toString().getBytes());
	}

}
