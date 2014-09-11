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
public class ChartFactoryWidget extends ChartFactory {

	//****************************************************************************
	// CONSTRUCTORS / METHODS
	//****************************************************************************

	/*****************************************************************************
	 * Constructs a ChartFactory object.
	 * 
	 * 	@param 	isFree 
	 *         	Render to free version of fusion charts or not
	 * 
	 * @throws Exception
	 *         If the application parameters could not be retrieved.
	 *****************************************************************************/
	public ChartFactoryWidget(boolean isFree )
	throws Exception
	{	      	      
		super(isFree);

	}//ChartFactory


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
		 
		
		//Dial charts
		if(graph.getGraphType().compareTo(ChartType.ANGULARGAUGE)==0){
			//set to html style so that tooltips can show on multilines
			attachFusionDial(xmlwriter, graph);
		}
		//bulletCharts
		if((graph.getGraphType().compareTo(ChartType.HBULLET)==0)||
				(graph.getGraphType().compareTo(ChartType.VBULLET)==0))
		{
			attachFusionBullet(xmlwriter, graph);
		}
		endChartBuild(xmlwriter);
		return writer.toString();

	}

	
	/***************************************************************************
	 * Method used to construct the xml data for a Dial that a user wants to apply
	 * for the graph.     
	 * Used for Fusion Widgets
	 *
	 * @param  xmlwriter
	 *         The xml writer object passed in will attach the dial to the xml
	 *         
	 * @param  graph
	 *         The graph object we will be taking the dial from
	 *         
	 * @throws WritingException
	 *         If the xml string that we are building is invalid. Ie: Unclosed Entities
	 *         
	 ***************************************************************************/	
	private void attachFusionDial(XmlWriter xmlwriter, FusionGraph graph)
	throws WritingException {
		
		attachColorRange(xmlwriter,graph);
		
		xmlwriter.writeEntity("dials");
		
		for(int i=0 ; i < graph.getNumberOfDials() ; ++i) {
		    Dial d=graph.getDialValue(i);
			xmlwriter.writeEntity("dial");
			xmlwriter.writeAttribute("value", d.getValue().toString());
			if(d.getLabel()!=null)
			    xmlwriter.writeAttribute("toolText", d.getLabel());
			if(d.getLink()!=null)
			    xmlwriter.writeAttribute("link", d.getLink());
			xmlwriter.endEntity(); //end of dial entity			
		}
		
		xmlwriter.endEntity(); //end of dials entity
		
		
	}
	
	
	
	/***************************************************************************
	 * Method used to construct the xml data for a Dial that a user wants to apply
	 * for the graph.     
	 * Used for Fusion Widgets
	 *
	 * @param  xmlwriter
	 *         The xml writer object passed in will attach the dial to the xml
	 *         
	 * @param  graph
	 *         The graph object we will be taking the dial from
	 *         
	 * @throws WritingException
	 *         If the xml string that we are building is invalid. Ie: Unclosed Entities
	 *         
	 ***************************************************************************/	
	private void attachFusionBullet(XmlWriter xmlwriter, FusionGraph graph)
	throws WritingException {
		
		attachColorRange(xmlwriter,graph);
		
		xmlwriter.writeEntity("value");
		xmlwriter.writeText(String.valueOf(graph.getValue()));
		xmlwriter.endEntity(); //end of value entity
		
		xmlwriter.writeEntity("target");
		xmlwriter.writeText(String.valueOf(graph.getTargetValue()));
		xmlwriter.endEntity(); //end of value entity
		
	}
}
