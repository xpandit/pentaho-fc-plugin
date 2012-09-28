package com.fusioncharts;



/*******************************************************************************
 * The ChartFactory class allows a chart object for widgets.
 * 
 * 
 *
 ********************************************************************************/
public class ChartFactoryChart extends ChartFactory {

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
	public ChartFactoryChart(boolean isFree )
	throws Exception
	{	      	      
		super(isFree);

	}//ChartFactory
}
