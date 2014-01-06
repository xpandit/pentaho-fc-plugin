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
//TODO MemoryMetaData could be used to replace this class. This could would be moved to JSONDataProvider
public class JSONPentahoMetaData extends AbstractPentahoMetaData {

    //JSON keys used 
    private static final String KEY_COL_TYPE = "type";
    private static final String KEY_COL_NAME = "label";
    private static final String TYPE_NUMERIC = "number";
    private static final String TYPE_STRING = "string";
    
    //Represents possible data types
    public enum DataType {STRING,DOUBLE}; 
    
    private int rowCount = 0;

    private JSONArray columns = null;
    private int columnCount = 0;
    private Object[][] columnHeaders = null;
    private DataType[] columnTypes = null;

    public JSONPentahoMetaData(JSONArray columns, JSONArray rows) throws InvalidDataResultSetException{
        this.columns = columns;
        this.columnCount = columns.length();
        this.rowCount = rows.length();
        initColumnHeaders();
        initColumnTypes();
    }

    /**
     * Initialize column headers
     * @throws InvalidDataResultSetException
     */
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
    
    /**
     * Initialize information about column types
     * @throws InvalidDataResultSetException
     */
    private void initColumnTypes() throws InvalidDataResultSetException{
        DataType[] result = new DataType[columnCount];
        try {
            for (int c = 0; c < columnCount; c++) {
                JSONObject col = columns.getJSONObject(c);
                String type = (String) col.get(KEY_COL_TYPE);
                if(type.equals(TYPE_NUMERIC))
                    result[c] = DataType.DOUBLE;
                else if(type.equals(TYPE_STRING)){
                    result[c] = DataType.STRING;
                } else {
                    throw new InvalidDataResultSetException("ERROR_002","Unkown type of column: "+type);
                }
            }
        } catch (JSONException ex) {
            throw new InvalidDataResultSetException("ERROR_002","Cannot parse columns.");
        }
        this.columnTypes = result;
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
    
    /**
     * Return the data type associated with a column
     * @param columnIndex The column index.
     * @return
     */
    public DataType getColumnType(int columnIndex) {
        return columnTypes[columnIndex];
    }
}
