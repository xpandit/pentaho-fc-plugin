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
import org.pentaho.commons.connection.IPentahoMetaData;
import org.pentaho.commons.connection.IPentahoResultSet;

import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.pentaho.input.JSONPentahoMetaData.DataType;

/**
 * Implements IPentahoResultSet based on a JSON input.
 * 
 * @author rplp
 * @version $Revision: 666 $
 * 
 */
public class JSONResultSet implements IPentahoResultSet {

    private static final String KEY_ROW = "c";
    private static final String KEY_ROWS = "rows";
    private static final String KEY_COLUMNS = "cols";
    private static final String KEY_VALUE_NUM = "v";
    private static final String KEY_VALUE_STR = "f";

    private JSONPentahoMetaData metaData = null;
    private Object[][] resultSet = null;
    private int nRows = 0;
    private int nColumns = 0;

    /**
     * Used to determin what row is being read.
     */
    private int currentRow = 0;

    public JSONResultSet(String strJsonTable) throws InvalidDataResultSetException {
        JSONObject jsonTable = null;
        try {
            jsonTable = new JSONObject(strJsonTable);
        } catch (JSONException e) {
            throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_002,
                    "Cannot convert JSON table.");
        }

        JSONArray columns = null;
        JSONArray rows = null;
        try {
            columns = jsonTable.getJSONArray(KEY_COLUMNS);
            rows = jsonTable.getJSONArray(KEY_ROWS);
        } catch (JSONException ex) {
            throw new InvalidDataResultSetException("ERROR_002", "");
        }

        metaData = new JSONPentahoMetaData(columns, rows);
        this.nRows = metaData.getRowCount();
        this.nColumns = metaData.getColumnCount();
        initResultSet(columns, rows);
    }

    private void initResultSet(JSONArray columns, JSONArray rows) throws InvalidDataResultSetException {
        resultSet = new Object[nRows][nColumns];

        try {
            for (int r = 0; r < nRows; r++) {
                JSONArray row = rows.getJSONObject(r).getJSONArray(KEY_ROW);
                for (int c = 0; c < nColumns; c++) {
                    if (metaData.getColumnType(c).equals(DataType.STRING))
                        resultSet[r][c] = row.getJSONObject(c).getString(KEY_VALUE_STR);
                    else
                        resultSet[r][c] = row.getJSONObject(c).getDouble(KEY_VALUE_NUM);
                }
            }
        } catch (Exception ex) {
            throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_002, "Cannot convert data.");
        }
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#next()
     */
    public Object[] next() {
        return resultSet[currentRow++];
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#beforeFirst()
     */
    public void beforeFirst() {
        currentRow = 0;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#close()
     */
    public void close() {
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#closeConnection()
     */
    public void closeConnection() {
        close();
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#isScrollable()
     */
    public boolean isScrollable() {
        return true;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#getValueAt(int, int)
     */
    public Object getValueAt(int row, int column) {
        return resultSet[row][column];
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#getRowCount()
     */
    public int getRowCount() {
        return metaData.getRowCount();
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#getColumnCount()
     */
    public int getColumnCount() {
        return metaData.getColumnCount();
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#memoryCopy()
     */
    public IPentahoResultSet memoryCopy() {
        // TODO Auto-generated method stub
        return null;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#getDataColumn(int)
     */
    public Object[] getDataColumn(int column) {
        Object[] columnData = new String[nColumns];
        for (int r = 0; r < nRows; r++) {
            columnData[r] = resultSet[r][column];
        }
        return columnData;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#getDataRow(int)
     */
    public Object[] getDataRow(int row) {
        return resultSet[row];
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IDisposable#dispose()
     */
    public void dispose() {
        // TODO Auto-generated method stub
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.pentaho.commons.connection.IPentahoResultSet#getMetaData()
     */
    public IPentahoMetaData getMetaData() {
        return metaData;
    }

}
