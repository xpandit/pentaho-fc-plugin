/*
 * PentahoFCPlugin Project
 *
 * Copyright (C) 2012 Xpand IT.
 *
 * This software is proprietary.
 */
package com.xpandit.fusionplugin.pentaho.input;

import java.util.ArrayList;
import java.util.Map;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;


/**
 * Abstract data provider
 *
 * @author <a href="mailto:rplp@xpand-it.com">rplp</a>
 * @version $Revision: 666 $
 *
 */
public abstract class DataProvider {
    public static final String RESULTSET_TYPE_DATA = "results";
    public static final String RESULTSET_TYPE_TARGET = "targetValue";
    public static final String RESULTSET_TYPE_RANGE = "rangeValues";
    
    /**
     * Returns the data to render the chart within a set of result sets.
     * @param pm
     * @return
     * @throws InvalidDataResultSetException
     */
    public abstract Map<String, ArrayList<IPentahoResultSet>> getResultSets(PropertiesManager pm) throws InvalidDataResultSetException;
        
}
