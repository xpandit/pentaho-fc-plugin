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
 * Class that gathers data based on a JSON input.
 *
 * @author <a href="mailto:rplp@xpand-it.com">rplp</a>
 * @version $Revision: 666 $
 *
 */
public class JSONDataProvider extends DataProvider{

    /* (non-Javadoc)
     * @see com.xpandit.fusionplugin.pentaho.input.DataProvider#getResultSets(com.xpandit.fusionplugin.PropertiesManager)
     */
    @Override
    public Map<String, ArrayList<IPentahoResultSet>> getResultSets(PropertiesManager pm) throws InvalidDataResultSetException{
        
        Map<String, ArrayList<IPentahoResultSet>> resultSets = new TreeMap<String, ArrayList<IPentahoResultSet>>();
     
        String data = pm.getPropData();
        ArrayList<IPentahoResultSet> array = new ArrayList<IPentahoResultSet>();
        array.add(new JSONResultSet(data));
        resultSets.put(DataProvider.RESULTSET_TYPE_DATA,array);        
        return resultSets; 
    }
}
