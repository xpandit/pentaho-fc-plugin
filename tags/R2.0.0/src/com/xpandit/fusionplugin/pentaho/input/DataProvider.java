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
import java.util.TreeMap;

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

    /*
     * Contains the result sets
     */
    Map<String, ArrayList<IPentahoResultSet>> resultSets = new TreeMap<String, ArrayList<IPentahoResultSet>>();

    /**
     * Add the result set with a specific type to the result set map
     * @param type of the result set
     * @param result result set to add
     */
    protected void addResultSet(String type,IPentahoResultSet resultSet){
        ArrayList<IPentahoResultSet> array = new ArrayList<IPentahoResultSet>();
        array.add(resultSet);
        resultSets.put(type,array);        
    }

    /**
     * Returns the data to render the chart within a set of result sets.
     * @param pm
     * @return
     * @throws InvalidDataResultSetException
     */
    public abstract Map<String, ArrayList<IPentahoResultSet>> getResultSets(PropertiesManager pm) throws InvalidDataResultSetException;
        
}
