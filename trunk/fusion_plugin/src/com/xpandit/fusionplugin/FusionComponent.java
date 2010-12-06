package com.xpandit.fusionplugin;

import java.io.Console;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.util.Map;

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
import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.api.engine.IPluginResourceLoader;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.engine.services.runtime.TemplateUtil;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class FusionComponent {

  private static final long serialVersionUID = -4782203780348114858L;

  private Logger log = Logger.getLogger(FusionComponent.class);

  private OutputStream out;

  // input parameters
  private IPentahoResultSet data;
  private String chartType = "";
  private String chartTitle = "";
  private String xAxisName = "";
  private String yAxisName = "";

  private InputStream mapTemplate = null;

  private InputStream htmlTemplate = null;

  public boolean validate() {
    return true;
  }

  public boolean execute() {

    String map = null;
    String html = null;
    try {

      if (data != null) {
        map = assembleMapandData(data);
      }

      if (getHtmlTemplate() != null) {
        html = IOUtils.toString(getHtmlTemplate());
        html = TemplateUtil.applyTemplate(html, "mapXml", map);
      }

      if (out != null) {
        out.write(html.getBytes("UTF-8"));
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return true;
  }

  private String assembleMapandData(IPentahoResultSet entityData) {

    assert (entityData != null);

    String template = "";

    DocumentBuilderFactory dbf;
    DocumentBuilder db;
    Document doc;

    try {
      dbf = DocumentBuilderFactory.newInstance();
      db = dbf.newDocumentBuilder();
      doc = db.parse(getMapTemplate());
      
      /*Element chart = doc.createElement("chart");
      chart.setAttribute("chartTitle", chartTitle);
      chart.setAttribute("xAxisName", xAxisName);
      chart.setAttribute("yAxisName", yAxisName);*/
      
      Node dataElement = doc.getElementsByTagName("chart").item(0);

      int rowCount = entityData.getRowCount();

      if(chartType.equals("BarChart") || chartType.equals("PieChart")){
    	  for (int i = 0; i < rowCount; i++) {
	        Object[] row = entityData.getDataRow(i);
	        Element node = doc.createElement("set");
	        node.setAttribute("label", String.valueOf(row[0]));
	        node.setAttribute("value", String.valueOf(row[1]));
	        dataElement.appendChild(node);
	      }
      }    	  
      else if(chartType.equals("ScrollBarChart")){
    	  
    	  Element nodeCategories = doc.createElement("categories");
    	  Element nodeDataSet = doc.createElement("dataset");
    	  
    	  for (int i = 0; i < rowCount; i++) {
  	        Object[] row = entityData.getDataRow(i);
  	        Element nodeCategory = doc.createElement("category");
  	        Element nodeSet = doc.createElement("set");
  	        nodeCategory.setAttribute("label", String.valueOf(row[0]));
  	        nodeSet.setAttribute("value", String.valueOf(row[1]));
  	        
  	        nodeCategories.appendChild(nodeCategory);
  	        nodeDataSet.appendChild(nodeSet);
  	      }
    	  
    	  dataElement.appendChild(nodeCategories);
    	  dataElement.appendChild(nodeDataSet);
      }
      else if(chartType.equals("GaugeChart")){
    	  
    	  Object[] row = entityData.getDataRow(0);
    	  
    	  org.apache.xerces.dom.NamedNodeMapImpl dialAttributes = (org.apache.xerces.dom.NamedNodeMapImpl)doc.getElementsByTagName("dial").item(0).getAttributes();
    	  
    	  Node dialValue = dialAttributes.getNamedItem("value");
    	  dialValue.setNodeValue(String.valueOf(row[0]));
    	  
    	  /*org.apache.xerces.dom.NamedNodeMapImpl pointAttributes = (org.apache.xerces.dom.NamedNodeMapImpl)doc.getElementsByTagName("point").item(0).getAttributes();
    	  
    	  Node pointValue = pointAttributes.getNamedItem("value");
    	  pointValue.setNodeValue(String.valueOf(row[1]));*/
      }
      else if(chartType.equals("LineChart")){
    	  
    	  /*
    	  Element nodeCategories = doc.createElement("categories");
    	  
    	  
    	  for (int i = 0; i < rowCount; i++) {
	  	        Object[] row = entityData.getDataRow(i);
	  	        Element nodeCategory = doc.createElement("category");
	  	        nodeCategory.setAttribute("label", String.valueOf(row[0]));
	  	        
	  	        nodeCategories.appendChild(nodeCategory);
	  	      }
    	  
    	  int columnCount = entityData.getColumnCount(); 
    	  Element nodeDataSet = doc.createElement("dataset");
    	  
    	  for (int i = 0; i < rowCount; i++) {
	    	  for (int j = 0; j < columnCount; j++) {
	  	        Object value = entityData.getValueAt(i, j);
	  	        Element nodeSet = doc.createElement("set");
	  	        nodeSet.setAttribute("value", String.valueOf(value));
	  	        
	  	        nodeDataSet.appendChild(nodeSet);
	  	      }
    	  }
    	  dataElement.appendChild(nodeCategories);
    	  dataElement.appendChild(nodeDataSet);*/
      }
      
      //doc.appendChild(dataElement);
      
      template = docToString(doc).toString();
      template = template.replaceAll("\"", "'");
      
    } catch (Exception e) {
      e.printStackTrace();
    }

    return template;
  }

  public void done() {
  }

  public void setSession(IPentahoSession session) {

  }

  public void setOutputStream(OutputStream stream) {
    out = stream;
  }

  public OutputStream getOutputStream() {
    return out;
  }

  public void configure(Map<String, String> map) {
  }

  public String getMimeType() {
    return "text/html";
  }

  public void setData(IPentahoResultSet data) {
    this.data = data;
  }

  public void setChartType(String chartType) {
    this.chartType = chartType;
  }
  
  public void setChartTitle(String chartTitle) {
    this.chartTitle = chartTitle;
  }
  
  public void setXAxisName(String xAxisName) {
    this.xAxisName = xAxisName;
  }
  
  public void setYAxisName(String yAxisName) {
    this.yAxisName = yAxisName;
  }

  public void setHtmlTemplate(InputStream htmlTemplate) {
    this.htmlTemplate = htmlTemplate;
  }

  public void setMapTemplate(InputStream mapTemplate) {
    this.mapTemplate = mapTemplate;
  }

  public InputStream getMapTemplate() {

    if (mapTemplate == null) {
    	if(chartType.equals("BarChart"))
    		mapTemplate = getFromLocation("component-def/bar-template.xml");
    	else if(chartType.equals("PieChart"))
    		mapTemplate = getFromLocation("component-def/pie-template.xml");
    	else if(chartType.equals("ScrollBarChart"))
    		mapTemplate = getFromLocation("component-def/scroll-bar-template.xml");
    	else if(chartType.equals("GaugeChart"))
    		mapTemplate = getFromLocation("component-def/gauge-template.xml");
    	else if(chartType.equals("LineChart"))
    		mapTemplate = getFromLocation("component-def/line-template.xml");
    }
    return mapTemplate;
  }

  public InputStream getHtmlTemplate() {

    if (htmlTemplate == null) {
    	if(chartType.equals("BarChart"))
    		htmlTemplate = getFromLocation("component-def/bar-html-template.html");
    	else if(chartType.equals("PieChart"))
    		htmlTemplate = getFromLocation("component-def/pie-html-template.html");
    	else if(chartType.equals("ScrollBarChart"))
    		htmlTemplate = getFromLocation("component-def/scroll-bar-html-template.html");
    	else if(chartType.equals("GaugeChart"))
    		htmlTemplate = getFromLocation("component-def/gauge-html-template.html");
    	else if(chartType.equals("LineChart"))
    		htmlTemplate = getFromLocation("component-def/line-html-template.html");
    }
    return htmlTemplate;
  }

  /**
   *  Demonstrates how to retrieve resources from within the plugin structure
   *  without creating path dependencies
   *  
   * @param location relative path to resource, including full filename and extension
   * @return inputStream contents of the resource
   */
  private final InputStream getFromLocation(String location) {

    InputStream in = null;
    IPluginResourceLoader resLoader = PentahoSystem.get(IPluginResourceLoader.class, null);
    in = resLoader.getResourceAsStream(FusionComponent.class, location);
    return in;
  }

  private final StringBuffer docToString(final org.w3c.dom.Document doc)
                          throws TransformerConfigurationException, TransformerException {

    StringBuffer sb = null;
    StringWriter writer = new StringWriter();

    TransformerFactory tf = TransformerFactory.newInstance();
    Transformer t = tf.newTransformer(); // can throw TransformerConfigurationException
    t.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
    Source docSrc = new DOMSource(doc);

    t.transform(docSrc, new StreamResult(writer)); // can throw TransformerException
    sb = writer.getBuffer();

    return sb;
  }

}
