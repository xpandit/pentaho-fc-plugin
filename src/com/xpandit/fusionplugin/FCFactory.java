package com.xpandit.fusionplugin;

import java.util.ArrayList;
import java.util.Map;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.ChartType;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;

/**
 * 
 * This factory returns a instance of Fusion Charts depending on the chart type required
 * 
 * 
 * @author dduque
 * 
 */
//TODO class should probably be removed, method could go to FCItem.
public class FCFactory {

    /**
     * 
     * Returns the instance of FusionComponent responsible to manage the requested chart type
     * 
     * @param pm PropertiesManager
     * @param resultSets Array of pentaho result sets
     * @return
     * @throws InvalidParameterException
     */
    public static FCItem getFusionComponent(PropertiesManager pm, Map<String, ArrayList<IPentahoResultSet>> resultSets)
            throws InvalidParameterException {

        // get the requested chartType
        String chartTypeParam = (String)pm.getParams().get("chartType");
        if (chartTypeParam == null)
            throw new InvalidParameterException(InvalidParameterException.ERROR_001);

        //in maps the name is FCMaps_<map> 
        //we split the value to get the correct value and to not put all charts in charts types
        String chartTypeAxu=chartTypeParam.split("_")[0];
        
        
        //identify chart type
        ChartType cType = null;
        try{
            cType = ChartType.valueOf(ChartType.class,chartTypeAxu.toUpperCase());
        } catch (Exception ex){ //chart type not supported 
            throw new InvalidParameterException(InvalidParameterException.ERROR_002);
            }
        
        //based on the chart characteristics choose the correct implementation
        if (cType.getChartLibrary() == ChartType.ChartLibrary.CHARTS) {
            try {
                return new FCChart(cType, resultSets,pm);
            } catch (InvalidDataResultSetException e) {
                throw new InvalidParameterException("Result sets not properly setup!");
            }
        } else if (cType.getChartLibrary() == ChartType.ChartLibrary.WIDGETS) {
            try {
              
            	//if is a realtime chart the behavior is the same of the charts
            	if(isRealTimeChart(chartTypeParam)){
            		return new FCChart(cType, resultSets,pm);
            	}
            	
                return new FCWidget(cType, resultSets, pm);
            } catch (InvalidDataResultSetException e) {
                throw new InvalidParameterException("Result sets not properly setup!");
            }
        }else if(cType.getChartLibrary() == ChartType.ChartLibrary.MAPS){
        	try {
                return new FCMaps(cType, resultSets,pm);
            } catch (InvalidDataResultSetException e) {
                throw new InvalidParameterException("Result sets not properly setup!");
            }
        }

        throw new InvalidParameterException(InvalidParameterException.ERROR_004 + ":" + chartTypeParam);

    }
    
    public static boolean isRealTimeChart(String chartTypeParam) {
    	   	
    	if(chartTypeParam.toUpperCase().equals( ChartType.REALTIMELINE.name())){return true;}
    	if(chartTypeParam.toUpperCase().equals( ChartType.REALTIMESTACKEDAREA.name())){return true;}
    	if(chartTypeParam.toUpperCase().equals( ChartType.REALTIMELINEDY.name())){return true;}
    	if(chartTypeParam.toUpperCase().equals( ChartType.REALTIMECOLUMN.name())){return true;}
    	
    	return false;
	}
}
