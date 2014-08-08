package com.xpandit.fusionplugin.pentaho.input;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.swing.table.TableModel;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.commons.connection.memory.MemoryMetaData;
import org.pentaho.commons.connection.memory.MemoryResultSet;
import org.pentaho.reporting.engine.classic.core.util.TypedTableModel;
import org.pentaho.reporting.engine.classic.extensions.datasources.cda.CdaResponseParser;

import pt.webdetails.cpf.InterPluginCall;

import com.xpandit.fusionplugin.PropertiesManager;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;
import com.xpandit.fusionplugin.exception.InvalidParameterException;

/**
 * Class that gathers data based on CDA files.
 * 
 * @author <a href="mailto:rplp@xpand-it.com">rplp</a>
 * @version $Revision: 666 $
 * 
 */
public class CDADataProvider extends DataProvider {

    private static final String CDAPATH = "cdaPath";
    private static final String CDAPARAMETERS = "cdaParameters";
    private static final String TARGETVALUECDAID = "targetValueCdaId";
    private static final String RANGEVALUECDAID = "rangeValueCdaId";
    private static final String CDAID = "cdaDataAccessId";
    private static final String CDAOUTPUTID = "outputIndexId";
    private static final String DATASTAMP = "dataStamp";

    private PropertiesManager pm = null;

    /**
     * Method that is able to call CDA, this is the only place where CDA is called.
     * 
     * @param cdaPath
     * @param dataAcessId
     * @param cdaInputs
     * @return
     * @throws InvalidParameterException
     */
    private IPentahoResultSet callCda(String cdaPath, String dataAccessId, Map<String, Object> cdaInputs)
            throws InvalidParameterException {
        try {
            // set "Basic Parameters"
            cdaInputs.put("dataAccessId", dataAccessId);
            cdaInputs.put("path", cdaPath);
            cdaInputs.put("outputType", "XML");

          //new call InterPluginCall
            InterPluginCall cdaCall = new InterPluginCall(InterPluginCall.CDA, null, "doQueryInterPlugin", cdaInputs);
            String response = cdaCall.callInPluginClassLoader();

            final InputStream responseBodyIs = new ByteArrayInputStream(response.toString().getBytes());
            TypedTableModel table = CdaResponseParser.performParse(responseBodyIs);
            return convertTableToResultSet(table);
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidParameterException(e.getMessage());
        }
    }

    /**
     * Converts tablemodel into IPentahoResultSet to make easier to use.
     * 
     * @param tableModel
     * @return
     */
    private IPentahoResultSet convertTableToResultSet(TableModel tableModel) {
        List<String> columnNames = new ArrayList<String>();
        for (int i = 0; i < tableModel.getColumnCount(); i++) {
            columnNames.add(tableModel.getColumnName(i));
        }
        MemoryMetaData metadata = new MemoryMetaData(columnNames);

        MemoryResultSet resultSet = new MemoryResultSet();
        resultSet.setMetaData(metadata);
        for (int i = 0; i < tableModel.getRowCount(); i++) {
            Object row[] = new Object[tableModel.getColumnCount()];
            for (int j = 0; j < tableModel.getColumnCount(); j++) {
                row[j] = tableModel.getValueAt(i, j);
            }
            resultSet.addRow(row);
        }
        return resultSet;
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * com.xpandit.fusionplugin.pentaho.input.DataProvider#getResultSets(com.xpandit.fusionplugin.PropertiesManager)
     */

    @Override
    public Map<String, ArrayList<IPentahoResultSet>> getResultSet(PropertiesManager pm)
            throws InvalidDataResultSetException, InvalidParameterException {
        this.pm = pm;

        boolean outputIndexIdDefined = false;
        Map<String, ArrayList<IPentahoResultSet>> resultSets = new TreeMap<String, ArrayList<IPentahoResultSet>>();

        Map<String, Object> cdaInputs = cdaParameters();

        IPentahoResultSet resultset = null;

        if (pm.getParams().get(CDAID) == null) {
            throw new InvalidParameterException(InvalidParameterException.ERROR_006 + CDAID);
        }

        if (pm.getParams().get(CDAOUTPUTID) != null) {
            outputIndexIdDefined = true;
        }

        // get dataAccessIDs using properties manager
        String[] queryIDs = ((String) pm.getParams().get(CDAID)).split(";");
        String[] outputIndexIds = null;

        if (outputIndexIdDefined) {
            // get outputIndexIds from request
            outputIndexIds = ((String) pm.getParams().get(CDAOUTPUTID)).split(";");
            // if there is an indexDefined than we must make sure they have the same size
            if (outputIndexIds.length != queryIDs.length) {
                throw new InvalidParameterException(InvalidParameterException.ERROR_007 + "\n Number of accessIds -> "
                        + outputIndexIds.length + "\n Number of outputIndexIds -> " + outputIndexIds.length);
            }
        }

        ArrayList<IPentahoResultSet> aux = new ArrayList<IPentahoResultSet>();
        int iteration = 0;
        for (String queryID : queryIDs) {

            // set data access id
            if (outputIndexIdDefined) {
                cdaInputs.put("outputIndexId", outputIndexIds[iteration]);
            }

            String cdaPath = (String) pm.getParams().get(CDAPATH);

            // set the output index to CDA is required as a parameter
            String outputIndexId = pm.getParams().containsKey(CDAOUTPUTID) ? (String) pm.getParams().get(CDAOUTPUTID)
                    : "1";
            cdaInputs.put(CDAOUTPUTID, outputIndexId);

            resultset = callCda(cdaPath, queryID, cdaInputs);
            aux.add(resultset);

            if (resultset == null) {
                throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_003,
                        "resultset==null Query ID:" + queryID);
            }

            ++iteration;
        }
        resultSets.put("results", aux);

        // get the targetValue result set if targetValueCdaId property exists
        try {
            if (pm.getParams().containsKey(TARGETVALUECDAID))
                resultSets.put("targetValue", getTargetValueCDA(cdaInputs, resultset));
        } catch (Exception e) {
            getLogger().error(
                    "Error retrieving data: cdaQueryComponent failed to return data. Query ID" + TARGETVALUECDAID, e);
        }

        // get the targetValue result set if rangeValueCdaId property exists
        if (pm.getParams().containsKey(RANGEVALUECDAID))
            resultSets.put("rangeValues", getRangeValuesCDA(cdaInputs, resultset));

        return resultSets;
    }

    /**
     * 
     * Invoke the CDA to get the Target Value of a chart
     * 
     * @param cdaInputs
     * @param resultset
     * @return
     * @throws Exception
     */
    // TODO requires refactoring -> CDA code is being called too many times.
    private ArrayList<IPentahoResultSet> getTargetValueCDA(Map<String, Object> cdaInputs, IPentahoResultSet resultset)
            throws Exception {
        ArrayList<IPentahoResultSet> aux = new ArrayList<IPentahoResultSet>();
        // invoke to get target value
        String queryID = (String) pm.getParams().get(TARGETVALUECDAID);

        String cdaPath = (String) pm.getParams().get(CDAPATH);
        resultset = callCda(cdaPath, queryID, cdaInputs);

        aux.add(resultset);
        return aux;
    }

    /**
     * 
     * Invoke the CDA to get the list of range colors and the base value to calculate the range values
     * 
     * @param cdaInputs
     * @param resultset
     * @return
     */
    // TODO requires refactoring -> CDA code is being called to many times.
    private ArrayList<IPentahoResultSet> getRangeValuesCDA(Map<String, Object> cdaInputs, IPentahoResultSet resultset)
            throws InvalidDataResultSetException {
        ArrayList<IPentahoResultSet> aux = new ArrayList<IPentahoResultSet>();
        String queryID = (String) pm.getParams().get(RANGEVALUECDAID);
        // invoke to get ranges values

        String[] queryIDArray = queryID.split(";");
        for (int i = 0; i < queryIDArray.length; i++) {
            try {

                String cdaPath = (String) pm.getParams().get(CDAPATH);
                resultset = callCda(cdaPath, queryIDArray[i], cdaInputs);

                aux.add(resultset);

            } catch (Exception e) {
                throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_004, "Querie ID: "
                        + RANGEVALUECDAID);
            }
        }

        return aux;
    }

    /**
     * Get all parameter Values and return a map that can be used as CDA parameters
     * 
     * @return return parameters as requested by CDA
     */
    private TreeMap<String, Object> cdaParameters() {
        TreeMap<String, Object> cdaParameters = new TreeMap<String, Object>();
        TreeMap<String, Object> params = pm.getParams();
        String parameterKeys = (String) params.get(CDAPARAMETERS);
        if (parameterKeys == null) {
            getLogger().debug("No parameters will be passed: " + CDAPARAMETERS + " don't exist");
            return cdaParameters;
        }

        // forward the dataStamp to CDA if it exists in the parameters
        if (params.get(DATASTAMP) != null) {
            parameterKeys = parameterKeys + ";" + DATASTAMP;
        }

        String[] parametersKeysArray = parameterKeys.split(";");
        for (int i = 0; i < parametersKeysArray.length; i++) {
            Object value = params.get(parametersKeysArray[i]);
            if (value == null)
                new InvalidParameterException(InvalidParameterException.ERROR_003 + " with key:"
                        + parametersKeysArray[i]);
            else {
                // copy the values defined as CDA parameter
                cdaParameters.put("param" + parametersKeysArray[i], value);
            }
        }
        return cdaParameters;
    }

    public Log getLogger() {
        return LogFactory.getLog(CDADataProvider.class);
    }

    @Override
    public Map<String, ArrayList<IPentahoResultSet>> getResultSetsRange(PropertiesManager pm)
            throws InvalidDataResultSetException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map<String, ArrayList<IPentahoResultSet>> getResultSetsTarget(PropertiesManager pm)
            throws InvalidDataResultSetException {
        return null;
    }

}
