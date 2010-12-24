package com.xpandit.fusionplugin;

import java.io.Console;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;


import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.pentaho.commons.connection.IPentahoMetaData;
import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.api.engine.IPluginResourceLoader;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.engine.services.runtime.TemplateUtil;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.fusioncharts.ChartFactory;
import com.fusioncharts.ChartType;
import com.fusioncharts.FusionGraph;
import com.fusioncharts.Series;
import com.xpandit.fusionplugin.exception.InvalidDataResultSetException;

public class FusionComponent {

	/**
	 * 
	 */
	private static final String WIDTH				= "width";
	private static final String HEIGHT				= "height";
	private static final String FREE				= "free";
	

	private static final long serialVersionUID = -4782203780348114858L;

	private Logger log = Logger.getLogger(FusionComponent.class);

	private static final String[] specialParameters={WIDTH,HEIGHT,FREE}; 
	private OutputStream out;

	// input parameters
	private IPentahoResultSet data;
	private String chartType = "";
	private String chartTitle = "";
	private String xAxisName = "";
	private String yAxisName = "";

	private InputStream mapTemplate = null;

	private InputStream htmlTemplate = null;

	private FusionGraph graph	= null; // Fusion chart Graph Object 
	
	private boolean isFreeVersion=true;

	/***************************************************************************
	 * Constructor for a FusionComponent object.
	 *
	 * @param  graphId
	 *         The graph name.
	 *         
	 * @param  graphType
	 *         The graph type ie:(pie graph, column chart)        
	 *         
	 * @param  length
	 *         The length of the categories.
	 *         
	 *         
	 ***************************************************************************/
	public FusionComponent(String string, ChartType column3d, int length) {
		graph = new FusionGraph(string,column3d,length);
	}

	public boolean validate() {
		return true;
	}

	/**
	 * 
	 * @param isFreeVersion renders the chart to be used with free version or not
	 * @return
	 * @throws Exception
	 */
	public String execute() throws Exception {

		ChartFactory chart	= new ChartFactory(isFreeVersion());   
		//attach graph to chart factory
		chart.insertGraph(graph);
		return chart.buildDOMFusionChart(graph.getGraphId());

	}
	/**
	 * 
	 * Set data to chart
	 * 
	 * @param data Pentaho ResultSet with data from a query
	 * @throws InvalidDataResultSetException when reult set is invalid 
	 */
	public void setData(IPentahoResultSet data) throws InvalidDataResultSetException {
		if(data==null)
			throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001 , "data is null");
		this.data = data;

		// get Data Set Metadata
		IPentahoMetaData metadata = data.getMetaData();
		//verify meta data
		int metadataSize= metadata.getColumnCount();
		if(metadataSize<2)
			throw new InvalidDataResultSetException(InvalidDataResultSetException.ERROR_001 , "less than 2");


		for(int seriesCount=1;seriesCount<metadataSize;++seriesCount)
		{
			// get measure column name to set series title
			String seriesTitle=metadata.getColumnHeaders()[0][seriesCount].toString();
			
			//TODO:Improve Code
			String[] seriesTitleArr=seriesTitle.split("/.")[0].split("\\]\\.");
			seriesTitle=seriesTitleArr[seriesTitleArr.length-1].replace("]","").replace("[","");

			Series series = graph.createSeries(seriesTitle);
			//get data
			int rowCount=data.getRowCount();
			for (int i = 0; i < rowCount; i++) {
				try
				{
					graph.setCategory(i,data.getValueAt(i,0).toString());
					series.setValue(i,Double.parseDouble((data.getValueAt(i,seriesCount).toString())));
				}
				catch(Exception e)
				{
					log.error("Problem in result set. Probably null values fouded at index:"+i, e);
				}
			}  
		}
	} 

	/**
	 * 
	 * Set chart Properties by name and value
	 * The properties set with the same key will be replaced
	 * 
	 * @param key key of property
	 * @param value value of property
	 */
	public void setChartProperties(String key, String value) {
		if(isSpecialParam(key))
			processSpecialParameters(key,value);
		else
			graph.setChartProperties(key,value);

	}
	/**
	 * 
	 * Set chart Properties by map
	 * The properties set with the same key will be replaced
	 * 
	 * @param params map with all parameters
	 */
	public void setChartProperties(TreeMap<String, String> params) {
		Set<String> keys=params.keySet();
		for (String mapKey : keys) {
			setChartProperties(mapKey,params.get(mapKey));
		}
	}
	/**
	 * 
	 * @param parameter
	 * @return
	 */
	private boolean isSpecialParam(String parameter)
	{
		for (int i=0;i<specialParameters.length;++i)
		{
			if(specialParameters[i].equals(parameter))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 
	 * Do special treatment to special parameters
	 * 
	 * @param parameterKey
	 * @param parameterValue
	 */
	private void processSpecialParameters(String parameterKey, String parameterValue)
	{
		if(parameterKey.equals(WIDTH))
			graph.setWidth(Integer.parseInt(parameterValue));
		if(parameterKey.equals(HEIGHT))
			graph.setHeight(Integer.parseInt(parameterValue));
		if(parameterKey.equals(FREE))
			setFreeVersion(Boolean.parseBoolean(parameterValue));
	}

	
	private void setFreeVersion(boolean isFreeVersion) {
		this.isFreeVersion = isFreeVersion;
	}

	private boolean isFreeVersion() {
		return isFreeVersion;
	}
}
