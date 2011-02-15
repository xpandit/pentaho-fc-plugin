package com.promosoft.fusionplugin;

import java.util.ArrayList;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.ChartType;
import com.promosoft.fusionplugin.exception.InvalidParameterException;

/**
 * 
 * This factory returns a instance of Fusion Component 
 * depending on which chart type required
 * 
 * 
 * @author dduque
 *
 */
public class FusionComponentFactory {

	/**
	 * 
	 * Returns the instance of FusionComponent responsible to manage the requested chart type
	 * 
	 * @param pm PropertiesManager
	 * @param resultSets Array of pentaho result sets 
	 * @return
	 * @throws InvalidParameterException
	 */
	public static FusionComponent getFusionComponent(PropertiesManager pm,ArrayList<IPentahoResultSet> resultSets) throws InvalidParameterException
	{
		// get the requested chartType
		String chartTypeParam=pm.getParams().get("chartType").toString(); 
		if(chartTypeParam==null)
			throw new InvalidParameterException(InvalidParameterException.ERROR_001);
		
		//find the right chart type
		ChartType[] values=ChartType.values();
		ChartType cType=null;
		for( int v=0;v<values.length;++v)
		{
			if(values[v].name().equals(chartTypeParam.toUpperCase()))
			{
				cType=values[v];
			} 
		}
		if(cType==null)
			throw new InvalidParameterException(InvalidParameterException.ERROR_002);
				
		// choose the right value  FusionComponent
		if(cType==ChartType.BUBBLE)
			return new FusionComponent("chart", cType, 1);
		if(cType.getChartLibrary()==ChartType.ChartOrWidgetOrMapsOrPower.CHARTS)
			return new FusionComponent("chart", cType, resultSets.get(0).getRowCount());
		if(cType==ChartType.ANGULARGAUGE)
			return new FusionComponentWidget("widget", cType, resultSets.size());
		if(cType==ChartType.HBULLET||cType==ChartType.VBULLET)
			return new FusionComponentWidget("widget", cType, 1);

		throw new InvalidParameterException(InvalidParameterException.ERROR_004+":"+chartTypeParam);
	
	}
}
