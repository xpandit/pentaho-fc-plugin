package com.fusioncharts;

import java.io.Writer;

import com.generationjava.io.WritingException;
import com.generationjava.io.xml.XmlWriter;


/*******************************************************************************
 * The ChartFactory class allows a chart object for widgets.
 * 
 * 
 *
 ********************************************************************************/
public class ChartFactoryMaps extends ChartFactory {


	/**
	 * @param isFree
	 * @throws Exception
	 */
	public ChartFactoryMaps(boolean isFree) throws Exception {
		super(isFree);
		// TODO Auto-generated constructor stub
	}



	/***************************************************************************
	 * Method used to construct the xml data for a particular entities.
	 * Used for Fusion Charts
	 *
	 * @param  xmlwriter
	 *         The xml writer object passed in will attach the xml for the series
	 *         
	 *         
	 * @param  graph
	 *         The graph object we will be taking the series from
	 *         
	 * @throws WritingException
	 *         If the xml string that we are building is invalid. Ie: Unclosed Entities
	 *         
	 ***************************************************************************/
	private void attachFusionEntities(XmlWriter xmlwriter, FusionGraph graph)
	throws WritingException
	{
		
		attachColorRange(xmlwriter,graph);
		
		xmlwriter.writeEntity("data");
		//loop through and insert all values from the series
		for (int i = 0; i < graph.getNumberOfEntities(); i++) {

			Entity ent=graph.getEntity(i);
			
			xmlwriter.writeEntity("entity");
			xmlwriter.writeAttribute("id",ent.getId());				

			//Make sure we don't put null attributes
			if(ent.getColor() != null)
				xmlwriter.writeAttribute("color", ent.getColor());

			xmlwriter.writeAttribute("value", ent.getValue().toString());

			if(ent.getEvent() != null)
				xmlwriter.writeAttribute("link", ent.getEvent());

			/*if(singleSeries.getToolText(i) != null)
				xmlwriter.writeAttribute("tooltext", escapeGoofyCharacters(singleSeries.getToolText(i)));
			 */
			xmlwriter.endEntity();				
		}	
		xmlwriter.endEntity();		
	}



	/***************************************************************************
	 * Constructor for a FusionGraph object.
	 *
	 * @param  graphName
	 *         The graph name.
	 *         
	 * @return the xml string for the Fusion Chart
	 *         
	 * @throws WritingException
	 *         If the xml string that we are building is invalid. Ie: Unclosed Entities
	 *         
	 * @throws IllegalArgumentException
	 *         If the Graph Name does not exist
	 ***************************************************************************/
	@Override
	public String buildFusionChart(String graphName)
	throws WritingException, IllegalArgumentException
	{				
		//instantiate the xml writer
		Writer writer = new java.io.StringWriter();
		XmlWriter xmlwriter = new XmlWriter(writer);

		FusionGraph graph = startChartBuild(graphName, xmlwriter);

		attachFusionEntities(xmlwriter, graph);

		//set to html style so that tooltips can show on multilines
		attachFusionStyles(xmlwriter, graph);


		endChartBuild(xmlwriter);
		return writer.toString();
	}


	/**
	 * 
	 * starts the chart xml
	 * 
	 * renders all chart properties
	 * 
	 * @param graphName Chart name
	 * @param xmlwriter cml writer
	 * @return 
	 * @throws WritingException
	 */
	@Override
	protected FusionGraph startChartBuild(String graphName, XmlWriter xmlwriter)
	throws WritingException {
		//check if graphName is valid
		if(!graph.containsKey(graphName))
			throw new IllegalArgumentException("graph name specified does not exist");

		xmlwriter.writeEntity("map"); //start graph is free

		//We need to get the graph
		FusionGraph graph = (FusionGraph)this.graph.get(graphName);


		// attach all chart properties
		for (String key : graph.getChartProperties().keySet())
		{
			xmlwriter.writeAttribute(key, escapeGoofyCharacters(graph.getChartProperties().get(key)));
		}
		return graph;
	}
}
