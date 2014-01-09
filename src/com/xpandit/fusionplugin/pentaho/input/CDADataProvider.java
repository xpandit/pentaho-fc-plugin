package com.xpandit.fusionplugin.pentaho.input;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.table.TableModel;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.commons.connection.memory.MemoryMetaData;
import org.pentaho.commons.connection.memory.MemoryResultSet;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.api.engine.IPluginManager;
import org.pentaho.platform.engine.core.system.PentahoSessionHolder;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.reporting.engine.classic.core.util.TypedTableModel;
import org.pentaho.reporting.engine.classic.extensions.datasources.cda.CdaResponseParser;

import pt.webdetails.cpf.web.DelegatingServletOutputStream;

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
	 * @param cdaPath
	 * @param dataAcessId
	 * @param cdaInputs
	 * @return
	 * @throws InvalidParameterException
	 */
	private IPentahoResultSet callCda(String cdaPath, String dataAcessId, Map<String, Object> cdaInputs) throws InvalidParameterException{

		final IPentahoSession userSession = PentahoSessionHolder.getSession();
		final IPluginManager pluginManager = PentahoSystem.get(IPluginManager.class, userSession);

		try {
			Object cdaBean = pluginManager.getBean("cda.api");
			Class cdaBeanClass = cdaBean.getClass();

			Class[] paramTypes;
			Object[] paramValues;
			Method m;
			final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

			paramTypes = new Class[] { String.class, String.class, int.class, String.class, Boolean.class,
					Boolean.class, int.class, int.class, String.class, List.class, HttpServletResponse.class,
					HttpServletRequest.class };
			m = cdaBeanClass.getMethod("doQueryGet", paramTypes);

			// Set parameters
			paramValues = new Object[12];
			paramValues[0] = cdaPath;
			paramValues[1] = "xml";
			paramValues[2] = 1;              //outputIndexId
			paramValues[3] = dataAcessId;
			paramValues[4] = false;             //bypassCache
			paramValues[5] = false;             //paginateQuery
			paramValues[6] = 0;                 //pageSize
			paramValues[7] = 0;                 //pageStart
			paramValues[8] = "false";             //wrapItUp
			/*String[] sortFields = params.getStringArrayParameter("sortBy", new String[0]);
            List<String> sortList = new ArrayList<String>(sortFields.length);
            for (String sortField : sortFields) {
                sortList.add(sortField);
            }*/
			List<String> sortList = new ArrayList<String>(0);
			paramValues[9] = sortList;//sortList;
			paramValues[10] = getResponse(outputStream);

			//convert CDA parameters to String, String map
			Map <String, String> inputs = new HashMap<String, String>();
			for(String key : cdaInputs.keySet()){
				inputs.put(key, (String) cdaInputs.get(key));
			}
			paramValues[11] = getRequest(inputs);

			m.invoke(cdaBean, paramValues);

			//convert result into IPentahoResultSet
			String responseBody = outputStream.toString();
			final InputStream responseBodyIs = new ByteArrayInputStream( responseBody.getBytes( "UTF-8" ) );
			TypedTableModel table = CdaResponseParser.performParse(responseBodyIs);
			return convertTableToResultSet(table);

		} catch (Exception e) {
			throw new InvalidParameterException(e.getMessage());
		}
	}

	/**
	 * Converts tablemodel into IPentahoResultSet to make easier to use.
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

	/**
	 * Helper class that implements a dummy HttpServletRequest to use on the CDA call
	 * @param cdaInputs
	 * @return HttpServletRequest
	 */
	private static HttpServletRequest getRequest(final Map<String, String> cdaInputs) {
		return new HttpServletRequest() {

			public String getAuthType() {
				return null;
			}

			public Cookie[] getCookies() {
				return new Cookie[0];
			}

			public long getDateHeader(String s) {
				return 0;
			}

			public String getHeader(String s) {
				return null;
			}

			@SuppressWarnings("rawtypes")
			public Enumeration getHeaders(String s) {
				return null;
			}

			@SuppressWarnings("rawtypes")
			public Enumeration getHeaderNames() {
				return null;
			}

			public int getIntHeader(String s) {
				return 0;
			}

			public String getMethod() {
				return null;
			}

			public String getPathInfo() {
				return null;
			}

			public String getPathTranslated() {
				return null;
			}

			public String getContextPath() {
				return null;
			}

			public String getQueryString() {
				return null;
			}

			public String getRemoteUser() {
				return null;
			}

			public boolean isUserInRole(String s) {
				return false;
			}

			public Principal getUserPrincipal() {
				return null;
			}

			public String getRequestedSessionId() {
				return null;
			}

			public String getRequestURI() {
				return null;
			}

			public StringBuffer getRequestURL() {
				return null;
			}

			public String getServletPath() {
				return null;
			}

			public HttpSession getSession(boolean b) {
				return null;
			}

			public HttpSession getSession() {
				return null;
			}

			public boolean isRequestedSessionIdValid() {
				return false;
			}

			public boolean isRequestedSessionIdFromCookie() {
				return false;
			}

			public boolean isRequestedSessionIdFromURL() {
				return false;
			}

			public boolean isRequestedSessionIdFromUrl() {
				return false;
			}

			public Object getAttribute(String s) {
				return null;
			}

			@SuppressWarnings("rawtypes")
			public Enumeration getAttributeNames() {
				return null;
			}

			public String getCharacterEncoding() {
				return null;
			}

			public void setCharacterEncoding(String s) throws UnsupportedEncodingException {
			}

			public int getContentLength() {
				return 0;
			}

			public String getContentType() {
				return null;
			}

			public ServletInputStream getInputStream() throws IOException {
				return null;
			}

			public String getParameter(String s) {
				return cdaInputs.get(s);
			}

			@SuppressWarnings("rawtypes")
			public Enumeration getParameterNames() {
				return Collections.enumeration(cdaInputs.keySet());
			}

			public String[] getParameterValues(String s) {
				return new String[] {cdaInputs.get(s)};
			}

			@SuppressWarnings("rawtypes")
			public Map getParameterMap() {
				return cdaInputs;
			}

			public String getProtocol() {
				return null;
			}

			public String getScheme() {
				return null;
			}

			public String getServerName() {
				return null;
			}

			public int getServerPort() {
				return 0;
			}

			public BufferedReader getReader() throws IOException {
				return null;
			}

			public String getRemoteAddr() {
				return null;
			}

			public String getRemoteHost() {
				return null;
			}

			public void setAttribute(String s, Object o) {
			}

			public void removeAttribute(String s) {
			}

			public Locale getLocale() {
				return null;
			}

			@SuppressWarnings("rawtypes")
			public Enumeration getLocales() {
				return null;
			}

			public boolean isSecure() {
				return false;
			}

			public RequestDispatcher getRequestDispatcher(String s) {
				return null;
			}

			public String getRealPath(String s) {
				return null;
			}

			public int getRemotePort() {
				return 0;
			}

			public String getLocalName() {
				return null;
			}

			public String getLocalAddr() {
				return null;
			}

			public int getLocalPort() {
				return 0;
			}
		}        
		;
	}

	/**
	 * Helper class that implements a dummy HttpServletResponse to use on the CDA call
	 * @param stream
	 * @return
	 */
	private static HttpServletResponse getResponse (final OutputStream stream) {
		return new HttpServletResponse() {

			public ServletOutputStream getOutputStream() throws IOException {
				return new DelegatingServletOutputStream(stream);
			}

			//Needed to override but no implementation provided

			public void addCookie(Cookie cookie) {
			}

			public boolean containsHeader(String s) {
				return false;
			}

			public String encodeURL(String s) {
				return null;
			}

			public String encodeRedirectURL(String s) {
				return null;
			}

			public String encodeUrl(String s) {
				return null;
			}

			public String encodeRedirectUrl(String s) {
				return null;
			}

			public void sendError(int i, String s) throws IOException {
			}

			public void sendError(int i) throws IOException {
			}

			public void sendRedirect(String s) throws IOException {
			}

			public void setDateHeader(String s, long l) {
			}

			public void addDateHeader(String s, long l) {
			}

			public void setHeader(String s, String s2) {
			}

			public void addHeader(String s, String s2) {
			}

			public void setIntHeader(String s, int i) {
			}

			public void addIntHeader(String s, int i) {
			}

			public void setStatus(int i) {
			}

			public void setStatus(int i, String s) {

			}

			public String getCharacterEncoding() {
				return null;
			}

			public String getContentType() {
				return null;
			}

			public PrintWriter getWriter() throws IOException {
				return null;
			}

			public void setCharacterEncoding(String s) {
			}

			public void setContentLength(int i) {
			}

			public void setContentType(String s) {
			}

			public void setBufferSize(int i) {
			}

			public int getBufferSize() {
				return 0;
			}

			public void flushBuffer() throws IOException {
			}

			public void resetBuffer() {
			}

			public boolean isCommitted() {
				return false;
			}

			public void reset() {
			}

			public void setLocale(Locale locale) {
			}

			public Locale getLocale() {
				return null;
			}
		} 
		;
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
			cdaInputs.put("dataAccessId", queryID);
			if (outputIndexIdDefined) {
				cdaInputs.put("outputIndexId", outputIndexIds[iteration]);
			}

			String cdaPath= (String) pm.getParams().get(CDAPATH);
			resultset= callCda(cdaPath,queryID,cdaInputs);
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
		
		String cdaPath= (String) pm.getParams().get(CDAPATH);
		resultset= callCda(cdaPath,queryID,cdaInputs);
		
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

				String cdaPath= (String) pm.getParams().get(CDAPATH);
				resultset= callCda(cdaPath,queryIDArray[i],cdaInputs);
	
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
	private HashMap<String, Object> cdaParameters() {
		HashMap<String, Object> cdaParameters = new HashMap<String, Object>();
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

		StringBuffer cdaParameterString = new StringBuffer();

		String[] parametersKeysArray = parameterKeys.split(";");
		for (int i = 0; i < parametersKeysArray.length; i++) {
			Object value = params.get(parametersKeysArray[i]);
			if (value == null)
				new InvalidParameterException(InvalidParameterException.ERROR_003 + " with key:"
						+ parametersKeysArray[i]);
			else {
				// if is string just set the string
				if (value instanceof String)
					cdaParameterString.append(parametersKeysArray[i]).append("=").append(value).append(";");
				else { // if it's a list set all the elements
					String[] listValue = (String[]) value;
					for (String valueElement : listValue) {
						cdaParameterString.append(parametersKeysArray[i]).append("=").append(valueElement).append(";");
					}
				}
			}
		}
		cdaParameters.put("cdaParameterString", cdaParameterString.toString());

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
