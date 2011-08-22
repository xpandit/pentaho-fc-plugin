package com.xpandit.fusionplugin;

import java.util.ArrayList;
import java.util.Map;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.fusioncharts.ChartType;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;

/**
 * 
 * This factory returns a instance of Fusion Component depending on the chart type required
 * 
 * 
 * @author dduque
 * 
 */
// class should probably be removed, method could go to FCItem.
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
        String chartTypeParam = pm.getParams().get("chartType").toString();
        if (chartTypeParam == null)
            throw new InvalidParameterException(InvalidParameterException.ERROR_001);

        // find the right chart type
        ChartType[] values = ChartType.values();
        ChartType cType = null;
        for (int v = 0; v < values.length; ++v) {
            if (values[v].name().equals(chartTypeParam.toUpperCase())) {
                cType = values[v];
            }
        }
        if (cType == null)
            throw new InvalidParameterException(InvalidParameterException.ERROR_002);

        /*
         * int length = 0;
         * 
         * if (cType.getChartLibrary() == ChartType.ChartOrWidgetOrMapsOrPower.CHARTS) length =
         * resultSets.get(0).getRowCount(); if (cType == ChartType.ANGULARGAUGE) length = resultSets.size(); if (cType
         * == ChartType.HBULLET || cType == ChartType.VBULLET || cType == ChartType.BUBBLE) length = 1;
         */

        if (cType.getChartLibrary() == ChartType.ChartOrWidgetOrMapsOrPower.CHARTS) {
            try {
                return new FCChart(cType, resultSets);// length);
            } catch (InvalidDataResultSetException e) {
                throw new InvalidParameterException("Result sets not pproperly setup!");
            }
        } else if (cType.getChartLibrary() == ChartType.ChartOrWidgetOrMapsOrPower.WIDGETS) {
            try {
                return new FCWidget(cType, resultSets);// length);
            } catch (InvalidDataResultSetException e) {
                throw new InvalidParameterException("Result sets not pproperly setup!");
            }
        }

        throw new InvalidParameterException(InvalidParameterException.ERROR_004 + ":" + chartTypeParam);

    }
}
