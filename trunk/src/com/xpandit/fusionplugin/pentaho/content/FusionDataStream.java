package com.xpandit.fusionplugin.pentaho.content;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Map;
import java.util.Properties;

import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.reporting.libraries.formula.util.URLEncoder;

import com.xpandit.fusionplugin.PropertiesManager;

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
			Map<String, ArrayList<IPentahoResultSet>> resultSets,PropertiesManager pm) throws IOException {

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
		
		
		String chartLink=pm.getParams().get("chartLink");
		StringBuffer serieChartLink=new StringBuffer("&link=");
		
		//generate value
		buffer.append("&value=");

		for (int j=1;j<columnCount;++j)
		{

			//generate more rows 
			for (int i=0;i<rowCount;++i)
			{	
				buffer.append(result.getValueAt(i,j));
                                String serieChartLinkAux=chartLink;
				if(!chartLink.equals(""))
                                {    
				    serieChartLinkAux=serieChartLinkAux.replace("{series}",result.getValueAt(i,0).toString());
                                    serieChartLink.append( serieChartLinkAux.replace("{value}",result.getValueAt(i,j).toString()));
                                }
                                
				if(i<rowCount-1)
				{
					buffer.append(',');
					
					if(!chartLink.equals(""))
					    serieChartLink.append(',');

				}
			}
			
			
			//generate more columns 
			if(j<columnCount-1)
			{
				buffer.append('|');
				
				if(!chartLink.equals(""))
                                    serieChartLink.append('|');

			}
		}
				
		if(!chartLink.equals(""))
                {    
		    buffer.append(serieChartLink.toString());
                }
		
		out.write(buffer.toString().getBytes());
	}

}
