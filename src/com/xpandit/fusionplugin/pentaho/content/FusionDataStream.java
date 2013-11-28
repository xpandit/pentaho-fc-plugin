package com.xpandit.fusionplugin.pentaho.content;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.xpandit.fusionplugin.PropertiesManager;

/**
 * 
 * Generate the results for the Real Time Charts
 * 
 * @author DGPG
 *
 */
public class FusionDataStream {

    //Encoding in use
    //private static final String ENCODING = "UTF-8";
    private static final String LABEL = "&label=";
    private static final String VALUE = "&value=";
    private static final String DATASTAMP = "&dataStamp=";

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
        TreeMap<String,Object> params = pm.getParams();

        int columnCount=result.getColumnCount();
        int rowCount=result.getRowCount();

        StringBuffer buffer=new StringBuffer();

        //generate Label
        buffer.append(LABEL);
        for (int i=0;i<rowCount;++i)
        {	
            buffer.append(result.getValueAt(i,0));
            if(i<rowCount-1)
            {
                buffer.append(',');
            }
        }

        String datastampColumn = (String) params.get("datastampColumn");
        int datastampColumnIdx = result.getMetaData().getColumnIndex(datastampColumn);
        String lastDatastamp = (String) params.get("dataStamp");
        String chartLink = (String) params.get("chartLink");
        StringBuffer serieChartLink = new StringBuffer("&link=");

        //generate value
        buffer.append(VALUE);

        for (int j=1;j<columnCount;++j)
        {
            // skip the datastamp column if exists
            if(datastampColumn != null && datastampColumnIdx == j)
                continue;

            //generate more rows 
            for (int i=0;i<rowCount;++i)
            {	
                buffer.append(result.getValueAt(i,j));
                String serieChartLinkAux=chartLink;
                //generate the chart link for data stream charts
                if((!(chartLink==null))&&!chartLink.equals(""))
                {     
                    serieChartLinkAux=serieChartLinkAux.replace("{categories}",result.getValueAt(i,0).toString());
                    serieChartLinkAux=serieChartLinkAux.replace("{series}",result.getMetaData().getColumnHeaders()[0][j].toString());
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

                if((!(chartLink==null))&&!chartLink.equals(""))
                    serieChartLink.append('|');

            }
        }

        //append the "click" for each "categories"
        if((!(chartLink==null))&&!chartLink.equals(""))
        {
            buffer.append(serieChartLink.toString());
        }

        //avoid the chart to be moved ahead when no data
        if (result.getValueAt(0,0).toString().trim().equalsIgnoreCase(""))
        {
            buffer=new StringBuffer(); // return an empty string buffer instead of &label=&value=|. This will cause the chart to freeze and not move ahead...
        }

        if(datastampColumn != null) {
            buffer.append(DATASTAMP);
            if(rowCount > 0 ) {
                buffer.append(result.getValueAt(rowCount-1, datastampColumnIdx)); //update the datastamp
            } else {
                buffer.append(lastDatastamp);
            }
        }

        out.write(buffer.toString().getBytes());
    }

    /**
     * 
     * Handles the data stream for angular charts 
     * 
     * @param out
     * @param resultSets
     * @param pm
     * @throws IOException
     */
    public static void dataStreamAngular(OutputStream out,
            Map<String, ArrayList<IPentahoResultSet>> resultSets,PropertiesManager pm) throws IOException {

        IPentahoResultSet result= resultSets.get("results").get(0);
        int rowCount=result.getRowCount();

        StringBuffer buffer=new StringBuffer();

        String chartLink=(String)pm.getParams().get("chartLink");
        StringBuffer serieChartLink=new StringBuffer("&link=");

        //generate value
        buffer.append(VALUE);

        //generate more rows 
        for (int i=0;i<rowCount;++i)
        {       
            buffer.append(result.getValueAt(i,1));
            String serieChartLinkAux=chartLink;
            //generate the chart link for data stream charts
            if((!(chartLink==null))&&!chartLink.equals(""))
            {    
                serieChartLinkAux=serieChartLinkAux.replace("{series}",result.getValueAt(i,0).toString());
                serieChartLink.append( serieChartLinkAux.replace("{value}",result.getValueAt(i,1).toString()));
            }

            if(i<rowCount-1)
            {
                buffer.append('|');

                if((!(chartLink==null))&&!chartLink.equals(""))
                    serieChartLink.append('|');

            }

        }

        //append the "click" for each "categories"
        if((!(chartLink==null))&&!chartLink.equals(""))
        {   

            buffer.append(serieChartLink.toString());
        }

        //avoid the chart to be moved ahead when no data
        if (result.getValueAt(0,0).toString().trim().equalsIgnoreCase(""))
        {
       
            buffer=new StringBuffer(); // return an empty string buffer instead of &label=&value=|. This will cause the chart to freeze and not move ahead...
            out.write(buffer.toString().getBytes());
        }
        else
        {
            out.write(buffer.toString().getBytes());
        }
    }
}
