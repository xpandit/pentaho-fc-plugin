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
    public Map<String, ArrayList<IPentahoResultSet>> getResultSet(PropertiesManager pm) throws InvalidDataResultSetException{
             
        String data = (String) pm.getParams().get(PropertiesManager.KEY_DATA);

        JSONResultSet resultSet = new JSONResultSet(data); 
                
        addResultSet(DataProvider.RESULTSET_TYPE_DATA,resultSet);
        
        return resultSets; 
    }
    @Override
    public Map<String, ArrayList<IPentahoResultSet>> getResultSetsRange(PropertiesManager pm) throws InvalidDataResultSetException{
             
        if (pm.getParams().containsKey(PropertiesManager.RANGE_VALUES)){
            JSONResultSet rangeResultSet = new JSONResultSet((String)pm.getParams().get(PropertiesManager.RANGE_VALUES));
            addResultSet(DataProvider.RESULTSET_TYPE_RANGE,rangeResultSet); 
        }
        return resultSets; 
    }
    @Override
    public Map<String, ArrayList<IPentahoResultSet>> getResultSetsTarget(PropertiesManager pm) throws InvalidDataResultSetException{
                     
        if (pm.getParams().containsKey(PropertiesManager.TARGET_VALUES)){
            JSONResultSet targetResultSet = new JSONResultSet((String)pm.getParams().get(PropertiesManager.TARGET_VALUES));
            addResultSet(DataProvider.RESULTSET_TYPE_TARGET,targetResultSet);
        }
        return resultSets; 
    }
    
    
}
