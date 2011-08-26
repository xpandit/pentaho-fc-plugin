/**
 * 
 */
package com.fusioncharts;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;


/*******************************************************************************
* The FusionGraph class extends the <i>Graph</i> class and provides the necessary
* members in order to generate FusionChart related properties.
* 
* The graph properties will be inserted in HashMap related groups.  For example
* anything that's related to the chart's cosmetics (bgcolor, caption, xaxis label),
* would be inserted into the chartProperties Hashmap.
* 
* 20090323 - First created by David Lai
* 
* @author David Lai
*****************************************************************************/
public class FusionGraph extends Graph {
	
	public enum FusionStyleType {
		FONT,
		ANIMATION,
		SHADOW,
		GLOW,
		BLUR,
		BEVEL;
	}
	
	public enum FusionStyleObject {
		BACKGROUND,
		CANVAS,
		CAPTION,
		DATALABELS,
		DATAPLOT,
		DATAVALUES,
		DIVLINES,
		HGRID,
		SUBCAPTION,
		TOOLTIP,
		TRENDLINES,
		TRENDVALUES,
		VLINES,
		XAXISNAME,
		YAXISNAME,
		YAXISVALUES;
	}

	/**
	 * FusionStyle is a subclass that is used to define styles for the Graph object.
	 * Users have to define the style name, the style type (which can be one of the enum constants from
	 * FusionStyleType) and what style properties to use.  Please refer to the Fusion Charts API documentation
	 * on setting style properties at {@link http://www.fusioncharts.com/docs/}
	 * 
	 * @author David Lai
	 *
	 */
	public static class FusionStyle {
		private String styleName;
		private FusionStyleType styleType;
		private Map<String,String> styleProperties;

		/***************************************************************************
		* Constructor for a FusionStyle object.
		*
		* @param  styleName
		*         The style Name to set it.
		*         
		* @param  styleType
		*         The Style type from the FusionStyleType enum        
		*         
		* @throws IllegalArgumentException
		*         If style name or style type is blank
		***************************************************************************/
		public FusionStyle(String styleName, FusionStyleType styleType) {
			if(styleName == null || styleName.length() == 0)
				throw new IllegalArgumentException("styleName name can not be blank");
			if(styleType == null)
				throw new IllegalArgumentException("styleType can not be null");
			
			this.styleName = styleName;
			this.styleType = styleType;
			this.styleProperties = new HashMap<String, String>();
		}
		
		/***************************************************************************
		* Getter method to get the Style's Name.
		*  
		* @return styleName
		*         The Style's Name
		***************************************************************************/
		public String getStyleName() {
			return styleName;
		}
		
		/***************************************************************************
		* Setter method to set the Style Name
		* 
		* @param  styleName
		*         the style name to set
		*         
		***************************************************************************/
		public void setStyleName(String styleName) {
			this.styleName = styleName;
		}

		/***************************************************************************
		* Getter method to get the Style's style type.
		*  
		* @return styleType
		*         The Style's style type
		***************************************************************************/
		public FusionStyleType getStyleType() {
			return styleType;
		}

		/***************************************************************************
		* Setter method to set the Style Type
		* 
		* @param  styleType
		*         the style type to set
		*         
		***************************************************************************/
		public void setStyleType(FusionStyleType styleType) {
			this.styleType = styleType;
		}

		/***************************************************************************
		* Getter method to get the properties of the style.
		*  
		* @return styleProperties
		*         The Style's properties
		***************************************************************************/
		public Map<String, String> getStyleProperties() {
			return styleProperties;
		}
		
		/***************************************************************************
		* Setter method to set the Style's Properties
		* 
		* @param  key
		*         Key of the attribute to insert into the style properties
		*         
		* @param  value
		*         Value of the attribute to insert into the style properties
		***************************************************************************/
		public void setStyleProperties(String key, String value) {
			this.styleProperties.put(key, value);
		}		
	}//End FusionStyle Subclass

	/***************************************************************************
	 * FusionGraph Member Declaration 
	 ***************************************************************************/
	private Map<String,String>	chartProperties;
	private Map<String,String>	categoriesProperties;
	private Map<String,String>	categoryProperties;
	private Map<String,String>	datasetProperties;
	private Map<String,FusionStyle> fusionStyles;
	private Map<FusionStyleObject,List<String>> fusionStyleObjects;
	  
	/***************************************************************************
	* Constructor for a FusionGraph object.
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
	* @param  request
	*         The user request.  HTTP request header fields allow the client to
	*         pass additional information about the request, and about the client
	*         itself, to the server.  These fields also act as request modifiers
	*         by the responding script.  For additional information on HTTP
	*         Headers, consult the W3C
	*         {@link http://www.w3.org/Protocols/rfc2616/rfc2616.html RFC2616}.
	*         
	* @throws IllegalArgumentException
	*         If the graph object name is blank or length is less than or
	*         equal to zero.
	***************************************************************************/
	public FusionGraph(String graphId, ChartType graphType, int length/*, HttpServletRequest request*/)
			throws IllegalArgumentException {
		super(graphId, graphType, length/*, request*/);
		this.chartProperties = new HashMap<String,String>();
		this.fusionStyleObjects = new HashMap<FusionStyleObject,List<String>>();
		this.fusionStyles = new HashMap<String,FusionStyle>();
	}

	/***************************************************************************
	* Getter method to get the Chart Properties.
	*  
	* @return chartProperties
	*         Map of the Chart Properties
	***************************************************************************/
	public Map<String, String> getChartProperties() {
		return chartProperties;
	}

	/***************************************************************************
	* Setter method to set the Chart Properties
	* 
	* @param  key
	*         Key of the attribute to insert into the Chart Properties
	*         
	* @param  value
	*         Value of the attribute to insert into the Chart Properties
	***************************************************************************/
	public void setChartProperties(String key, String value) {
		this.chartProperties.put(key, value);		
	}

	/***************************************************************************
	* Getter method to get the Categories Properties.
	*  
	* @return categoriesProperties
	*         Categories Properties
	***************************************************************************/
	public Map<String, String> getCategoriesProperties() {
		return categoriesProperties;
	}

	/***************************************************************************
	* Setter method to set the Categories Properties
	* 
	* @param  HashMap
	*         Key value pair of the Categories attribute to be set.
	***************************************************************************/
	public void setCategoriesProperties(HashMap<String, String> categoriesProperties) {
		this.categoriesProperties = categoriesProperties;
	}

	/***************************************************************************
	* Getter method to get the Category Properties.
	*  
	* @return HashMap
	*         Category Properties
	***************************************************************************/
	public Map<String, String> getCategoryProperties() {
		return categoryProperties;
	}

	/***************************************************************************
	* Setter method to set the Category Properties
	* 
	* @param  HashMap
	*         Key value pair of the Category attribute to be set.
	***************************************************************************/
	public void setCategoryProperties(HashMap<String, String> categoryProperties) {
		this.categoryProperties = categoryProperties;
	}

	/***************************************************************************
	* Getter method to get the Dataset Properties.
	*  
	* @return HashMap
	*         Dataset Properties
	***************************************************************************/
	public Map<String, String> getDatasetProperties() {
		return datasetProperties;
	}

	/***************************************************************************
	* Setter method to set the Dataset Properties
	* 
	* @param  HashMap
	*         Key value pair of the Dataset attribute to be set.
	***************************************************************************/
	public void setDatasetProperties(HashMap<String, String> datasetProperties) {
		this.datasetProperties = datasetProperties;
	}

	/***************************************************************************
	* Getter method to get the Fusion Styles.
	*  
	* @return fusionStyles
	*         Map of the Fusion Styles
	***************************************************************************/
	public Map<String, FusionStyle> getFusionStyles() {
		return fusionStyles;
	}

	/***************************************************************************
	* Setter method to set the Fusion Styles Map
	* 
	* @param  styleName
	*         Style name of the fusion style to insert into the Fusion Styles Map
	*         
	* @param  fusionStyle
	*         The Fusion Style to insert into the Fusion Styles Map
	***************************************************************************/
	public void setFusionStyles(String styleName, FusionStyle fusionStyle) 
	{
		this.fusionStyles.put(styleName, fusionStyle);
	}

	/***************************************************************************
	* Getter method to get the Fusion Styles.
	*  
	* @return fusionStyles
	*         Map of the Fusion Styles
	***************************************************************************/
	public Map<FusionStyleObject, List<String>> getFusionStyleObjects() {
		return fusionStyleObjects;
	}

	/***************************************************************************
	* Insert method to attach styles to a style object
	* 
	* @param  fusionStyleObject
	*         The object that the style will be added to
	*         
	* @param  fusionStyle
	*         The Fusion Style to insert into the Fusion Styles Map
	***************************************************************************/
	public void insertFusionStyleObject(FusionStyleObject fusionStyleObject, String fusionStyleName) 
	throws IllegalArgumentException {
		if (!this.fusionStyles.containsKey(fusionStyleName))
			throw new IllegalArgumentException("Fusion Style Name does not exist in the graph's styles");
		
		//get a list of the styles already attached to the style object, otherwise create a new linked list
		List<String> styleList;
		
		if(this.fusionStyleObjects.containsKey(fusionStyleObject))
			styleList = this.fusionStyleObjects.get(fusionStyleObject);
		else
			styleList = new LinkedList<String>();
		
		styleList.add(fusionStyleName);
		this.fusionStyleObjects.put(fusionStyleObject, styleList);				
	}

	
	/***************************************************************************
	* HELPER METHODS
	* 
	***************************************************************************/
	
}//End of FusionGraph class
