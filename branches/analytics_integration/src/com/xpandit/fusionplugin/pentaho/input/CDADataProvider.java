package com.xpandit.fusionplugin.pentaho.input;

import java.util.ArrayList;
import java.util.Map;

import org.pentaho.commons.connection.IPentahoResultSet;

import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;

/**
 * Class that gathers data based on CDA files.
 *
 * @author <a href="mailto:rplp@xpand-it.com">rplp</a>
 * @version $Revision: 666 $
 *
 */
public class CDADataProvider extends DataProvider{

    /* (non-Javadoc)
     * @see com.xpandit.fusionplugin.pentaho.input.DataProvider#getResultSets(com.xpandit.fusionplugin.PropertiesManager)
     */
    @Override
    public Map<String, ArrayList<IPentahoResultSet>> getResultSets(PropertiesManager pm)
            throws InvalidDataResultSetException {
        // TODO Auto-generated method stub
        return null;
    }

}
