/*
 * PentahoFCPlugin Project
 * 
 * Copyright (C) 2012 Xpand IT.
 * 
 * This software is proprietary.
 */
package com.xpandit.fusionplugin.pentaho.input;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.pentaho.commons.connection.AbstractPentahoMetaData;

import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;

/**
 * Contains meta data associated with the data result set.
 * 
 * @author rplp
 * @version $Revision: 666 $
 * 
 */
public class JSONPentahoMetaData extends AbstractPentahoMetaData {

    private static final String KEY_COL_NAME = "label";

    private int rowCount = 0;

    private JSONArray columns = null;
    private int columnCount = 0;
    private Object[][] columnHeaders = null;

    public JSONPentahoMetaData(JSONArray columns, JSONArray rows) throws InvalidDataResultSetException{
        this.columns = columns;
        this.columnCount = columns.length();
        this.rowCount = rows.length();
        initColumnHeaders();
    }

    private void initColumnHeaders() throws InvalidDataResultSetException{
        Object[][] result = new Object[rowCount][columnCount];
        try {
            for (int c = 0; c < columnCount; c++) {
                JSONObject col = columns.getJSONObject(c);
                result[0][c] = col.get(KEY_COL_NAME);
            }
        } catch (JSONException ex) {
            throw new InvalidDataResultSetException("ERROR_002","Cannot parse columns.");
        }
        this.columnHeaders = result;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.AbstractPentahoMetaData#getColumnHeaders()
     */
    @Override
    public Object[][] getColumnHeaders() {
        return columnHeaders;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.AbstractPentahoMetaData#getRowHeaders()
     */
    @Override
    public Object[][] getRowHeaders() {
        return null;
    }

    /**
     * Obtain the number of rows.
     * @return The number of rows.
     */
    public int getRowCount(){
        return rowCount;
    }
}
