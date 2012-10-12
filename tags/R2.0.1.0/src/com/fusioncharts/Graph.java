package com.fusioncharts;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;


/*******************************************************************************
 * The Graph class provides a graph that the ChartFactory can work with in order
 * to output the appropriate string data value for the type of chart to display
 * on the page.
 * 
 * Originally this was a subclass of WePopChart.java but we decided that it was a 
 * better solution to separate it from the class.  This will be the parent Graph class
 * for all graphing type packages in the future.  A set of methods that all graphs
 * can use is included.
 * 
 * 20090323 - First created by David Lai
 * 
 * @author David Lai
 *****************************************************************************/
public class Graph
extends Object
implements Cloneable, Comparable<Graph>
{
	private String				graphId;
	private ChartType				graphType;
	private LinkedList<Category>  categories;
	private LinkedList<Entity> entities;
	private LinkedList<Series> 	series;
	private String[]          	dials;
	private ArrayList<ColorRange>	dialRangeValues;
	private int					height;
	private int					width;
	private String				wMode;
	private double 				value;
	private double				targetValue;
	private int					dataSetLength;//data set length to be used as reference to the chart. Usually this represents the number of categories 


	/***************************************************************************
	 * Constructor for a Graph object.
	 * The default height is 300 pixels and the default width is 600 pixels
	 *
	 * @param  graphId
	 *         The graph name.
	 *         
	 * @param  graphType
	 *         The graph type ie:(pie graph, column chart). From the chart type enum  
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
	public Graph(String graphId, ChartType graphType, int length/*, HttpServletRequest request*/)
	throws IllegalArgumentException
	{
		if (graphType == null)
			throw new IllegalArgumentException("graphType can not be blank");
		if (graphId == null || graphId.length() == 0)
			throw new IllegalArgumentException("graphId name can not be blank");
		if (length < 0)
			throw new IllegalArgumentException("graph length must be greater than zero");

		this.graphId = graphId;
		this.graphType  = graphType;    
		this.categories = new LinkedList<Category>();
		this.entities = new LinkedList<Entity>();
		this.series     = new LinkedList<Series>();
		this.dials		= new String[length];
		this.dialRangeValues = new ArrayList<ColorRange>();
		this.height		= 300;
		this.width		= 600;
		this.dataSetLength=length;

		//creates the chart template skeleton of categories 
		for (int i = 0; i < this.dataSetLength; i++) {
			this.categories.add(null);
		}


		//link the graph object to the request
		// request.setAttribute(graphId, this);
	}//Graph

	/***************************************************************************
	 * Accessor method to return the graph type
	 * 
	 * @return graphType
	 *         The graph type.
	 ***************************************************************************/
	public ChartType getGraphType() {
		return graphType;
	}

	/***************************************************************************
	 * Accessor method to return the object identifier.
	 * 
	 * @return graphId
	 *         The object identifier.
	 ***************************************************************************/
	public String getGraphId()
	{
		return this.graphId;
	}//getObject


	/***************************************************************************
	 * Manipulator method to set the graph categories.  The categories will be
	 * set starting at index 0 until the min between the number of categories
	 * specified and the number of categories passed as arguments.
	 * 
	 * @param  categories
	 *         The list of category labels.
	 ***************************************************************************/
	public void setCategory(Category ... category)
	{
		for (int i = 0, its = Math.min(this.categories.size(),category.length); i < its; i++)
			setCategory(i, category[i]);
	}//setCategory

	/***************************************************************************
	 * Manipulator method to set a graph category.
	 * 
	 * @param  index
	 *         The index.
	 * @param  category
	 *         The category label.
	 ***************************************************************************/
	public void setCategory(int index, Category category)
	{ 
		if(this.categories.size()<=index)
			this.categories.add(index, category);
		else
			this.categories.set(index, category);
	}//setCategory

	/***************************************************************************
	 * Accessor method to get a graph category.
	 * 
	 * @param  index
	 *         The index.
	 * 
	 * @return categories
	 *         The category.
	 ***************************************************************************/
	public Category getCategory(int index)
	{
		return this.categories.get(index);
	}//getCategory
	
	
	
	/***************************************************************************
	 * Manipulator method to set the graph entities.  The entities will be
	 * set starting at index 0 until the min between the number of entities
	 * specified and the number of categories passed as arguments.
	 * 
	 * @param  categories
	 *         The list of category labels.
	 ***************************************************************************/
	public void setEntity(Entity ... entity)
	{
		for (int i = 0, its = Math.min(this.entities.size(),entity.length); i < its; i++)
			setEntity(i, entity[i]);
	}//setCategory

	/***************************************************************************
	 * Manipulator method to set a graph entity.
	 * 
	 * @param  index
	 *         The index.
	 * @param  entity
	 *         The entity label.
	 ***************************************************************************/
	public void setEntity(int index, Entity entity)
	{ 
		if(this.entities.size()<=index)
			this.entities.add(index, entity);
		else
			this.entities.set(index, entity);
	}//setCategory

	/***************************************************************************
	 * Accessor method to get a graph entity.
	 * 
	 * @param  index
	 *         The index.
	 * 
	 * @return entities
	 *         The entity.
	 ***************************************************************************/
	public Entity getEntity(int index)
	{
		return this.entities.get(index);
	}//getCategory

	
	
	
	
	

	/**
	 * 
	 * The following methods belong to the Dial component
	 * 
	 * TODO : Pass them to the Dial class when refactoring the FusionComponent hierarchy
	 */

	/***************************************************************************
	 * Manipulator method to set a dial value.
	 * 
	 * @param  index
	 *         The index.
	 * @param  dialValue
	 *         The dial value.
	 ***************************************************************************/
	public void setDialValue(int index, String dialValue)
	{
		this.dials[index] = dialValue;
	}//setDialValue

	/***************************************************************************
	 * Accessor method to get a graph dial value.
	 * 
	 * @param  index
	 *         The index.
	 * 
	 * @return dials
	 *         The dial values.
	 ***************************************************************************/
	public String getDialValue(int index)
	{
		return this.dials[index];
	}//getDialValue

	/***************************************************************************
	 * Accessor method to get the number of dials.
	 * 
	 * @return dials.length
	 *         The number of dials.
	 ***************************************************************************/
	public Integer getNumberOfDials()
	{
		return this.dials.length;
	}//getNumberOfDials 

	/***************************************************************************
	 * Manipulator method to set a color range values.
	 * 
	 * @param  index
	 *         The range index.
	 * @param  rangeValue
	 *         The range value.
	 ***************************************************************************/
	public void setColorRangeValues(int index, ColorRange rangeValue)
	{
		this.dialRangeValues.add(index, rangeValue);
	}//setDialRangeValues

	/***************************************************************************
	 * Manipulator method to get the dial range values.
	 * 
	 * @return range values
	 *         The range values array list.
	 ***************************************************************************/
	public ArrayList<ColorRange> getColorRangeValues()
	{
		return this.dialRangeValues;
	}//setDialRangeValues

	/***************************************************************************
	 * Returns the number of categories for this graph.
	 * 
	 * @return length
	 *         The number of categories.
	 ***************************************************************************/
	public int getNumberOfCategories()
	{
		return this.categories.size();
	}//getNumberOfCategories

	/***************************************************************************
	 * Returns the Series at a specified index.
	 * 
	 * @return series
	 *         The series.
	 * 
	 * @throws IndexOutOfBoundsException
	 *         If the indice specified is less than 0 or greater than or equal
	 *         to the number of series.
	 ***************************************************************************/
	public Series getSeries(int index)
	throws IndexOutOfBoundsException
	{
		return this.series.get(index);
	}//getSeries

	/***************************************************************************
	 * Returns the current number of series.
	 *  
	 * @return size
	 *         The number of series.
	 ***************************************************************************/
	public int getNumberOfSeries()
	{
		return this.series.size(); 
	}//getNumberOfSeries


	/***************************************************************************
	 * Returns the current number of entities.
	 *  
	 * @return size
	 *         The number of entities.
	 ***************************************************************************/
	public int getNumberOfEntities()
	{
		return this.entities.size(); 
	}//getNumberOfEntities
	
	/***************************************************************************
	 * Creates a Series for this graph.  The series will be inserted at the
	 * index specified. The length of the series will equal the length of the categories
	 * 
	 * @param  index
	 *         The index to insert the series at (first index is 0).
	 * @param  label
	 *         The series label.
	 * 
	 * @return Series
	 *         The series that was created.
	 * 
	 * @throws IndexOutOfBoundsException
	 *         If the index specified is out of range.
	 * @throws IllegalArgumentException
	 *         If an invalid argument was passed.
	 *
	 * @see    {@link com.pointclickcare.charts.Series#Series(String, int)}
	 *         The Series constructor definition. 
	 ***************************************************************************/
	public Series createSeries(int index, String label)
	throws IndexOutOfBoundsException, IllegalArgumentException
	{
		Series series = null;

		//create the Series object
		//usually length of series is = to the category length
		//an exception are the bubble charts
		series = new Series(label,dataSetLength);

		//add the series to the linkedlist
		this.series.add(index,series);

		return series;
	}//createSeries

	/***************************************************************************
	 * Creates a Series for this graph.  The series will be appended to the
	 * existing list of series.
	 * 
	 * @param  label
	 *         The series label.
	 * 
	 * @return Series
	 *         The series that was created.
	 * 
	 * @throws IllegalArgumentException
	 *         If an invalid argument was passed.
	 *
	 * @see    {@link com.pointclickcare.charts.Series#Series(String, int)}
	 *         The Series constructor definition. 
	 ***************************************************************************/
	public Series createSeries(String label)
	throws IllegalArgumentException
	{
		//appends the newly created series to the end of the linklist
		return this.createSeries(this.series.size(),label);
	}//createSeries


	/***************************************************************************
	 * Accessor method to get height of graph
	 *  
	 * @return height
	 *         Height of the graph
	 ***************************************************************************/
	public int getHeight() {
		return height;
	}

	/***************************************************************************
	 * Manipulator method to set the height of the graph.
	 * 
	 * @param  height
	 *         The height of the graph
	 ***************************************************************************/
	public void setHeight(int height) {
		this.height = height;
	}

	/***************************************************************************
	 * Accessor method to get width of graph
	 *  
	 * @return width
	 *         Width of the graph
	 ***************************************************************************/
	public int getWidth() {
		return width;
	}

	/***************************************************************************
	 * Manipulator method to set the width.
	 * 
	 * @param  width
	 *         the width to set it to
	 ***************************************************************************/
	public void setWidth(int width) {
		this.width = width;
	}


	/***************************************************************************
	 * Setter wMode to emeb object
	 * 
	 * @param wMode
	 * 
	 ***************************************************************************/
	public void setWMode(String wMode) {
		this.wMode = wMode;
	}

	/***************************************************************************
	 * getter wMode to emeb object
	 * 
	 * @return wMode
	 ***************************************************************************/
	public String getWMode() {
		return wMode;
	}


	/**
	 * @return the value
	 */
	public double getValue() {
		return value;
	}

	/**
	 * @param value the value to set
	 */
	public void setValue(double value) {
		this.value = value;
	}

	/**
	 * @return the targetValue
	 */
	public double getTargetValue() {
		return targetValue;
	}

	/**
	 * @param targetValue the targetValue to set
	 */
	public void setTargetValue(double targetValue) {
		this.targetValue = targetValue;
	}


	/***************************************************************************
	 * Calculates the minimum value of all the series in the graph.
	 * 
	 * @return double
	 *         The minimum of the series.
	 ***************************************************************************/
	public double calculateMin()
	{
		double result = +Double.MAX_VALUE;

		//loop through all series and get the minimum from all of them
		for (Series o : this.series)
		{
			double m = o.calculateMin();
			if (m < result)
				result = m;
		}//endfor - each series

		return result;
	}//calculateMin

	/***************************************************************************
	 * Calculates the maximum value of all the series in the graph.
	 * 
	 * @return double
	 *         The maximum of the series.
	 ***************************************************************************/
	public double calculateMax()
	{
		double result = -Double.MAX_VALUE;

		//loop through all the series and get the maximum from all of them
		for (Series o : this.series)
		{
			double m = o.calculateMax();
			if (m > result)
				result = m;
		}//endfor - each series

		return result;
	}//calculateMax

	/*****************************************************************************
	 * Clears the Series objects from this Graph.  Graph properties such as 
	 * category names, number of lines and auto-scale are maintained.
	 *****************************************************************************/
	public void clear()
	{
		//clear the series data
		this.series.clear();
	}//clear    

	/***************************************************************************
	 * Creates and returns a copy of the graph object.
	 * 
	 * @return Object
	 *         A clone of this instance.
	 * 
	 * @throws CloneNotSupportedException
	 *         If the object's class does not support the Cloneable interface.
	 *         Subclasses that override the clone method can also throw this
	 *         exception to indicate that an instance cannot be cloned.
	 *
	 * @see    {@link java.lang.Cloneable}
	 ***************************************************************************/
	@SuppressWarnings("unchecked")
	public Object clone()
	throws CloneNotSupportedException
	{
		Graph clonedObject;

		try
		{
			clonedObject = (Graph)super.clone();
		}
		catch (CloneNotSupportedException e)
		{
			throw new CloneNotSupportedException("clone not supported in '"+getClass().getName()+"'");
		}//endtry - cloning object

		//clone the categories array
		clonedObject.categories=(LinkedList<Category>) this.categories.clone();

		//clone the format object
		clonedObject.series = (LinkedList<Series>)this.series.clone();

		return clonedObject;
	}//clone

	/***************************************************************************
	 * Compares the graphType enum with the specified object for order. Returns a 
	 * negative integer, zero, or a positive integer as this object is less than, 
	 * equal to, or greater than the specified object. Enum constants are only 
	 * comparable to other enum constants of the same enum type. The natural order 
	 * implemented by this method is the order in which the constants are declared.
	 * 
	 * @param  o
	 *         The Object to be compared.
	 *
	 * @return int
	 *         A negative integer, zero, or a positive integer as this object
	 *         is less than, equal to, or greater than the specified object.
	 *          
	 * @throws ClassCastException
	 *         If the specified object's type prevents it from being compared
	 *         to this Object.
	 ***************************************************************************/
	public int compareTo(Graph graph)
	{
		return this.graphType.compareTo(graph.graphType);
	}//compareTo

	/***************************************************************************
	 * Indicates whether some other object is "equal to" this one.  A graph
	 * object is equal to the other if the object identifiers are the same.
	 * 
	 * @param  obj
	 *         The reference object with which to compare.
	 * 
	 * @return true
	 *         If this object is the same as the obj argument.
	 * @return false
	 *         Otherwise.
	 ***************************************************************************/
	public boolean equals(Object obj)
	{
		return obj instanceof Graph && this.graphId.equals(((Graph)obj).graphId);
	}//equals

	/***************************************************************************
	 * Returns a hash code value for the object. This method is supported for
	 * the benefit of hashMaps such as those provided by java.util.HashMap.
	 * 
	 * @return int
	 *         A hash code value for this object.
	 * 
	 * @see    {@link java.util.HashMap}
	 ***************************************************************************/
	public int hashCode()
	{
		return this.graphId.hashCode();
	}//hashCode

	/***************************************************************************
	 * Retreives a linked list of trendline series
	 * 
	 * @return  trendSeries
	 *         Linked list of trend series for the particular chart
	 ***************************************************************************/
	public LinkedList<Series> getTrendLineSeries() {
		LinkedList<Series> trendSeries = new LinkedList<Series>();
		Series item;		
		Iterator<Series> itr = this.series.listIterator();

		while (itr.hasNext())
		{
			item = itr.next();
			if(item.getSeriesType() == Series.SeriesType.TRENDLINE)
				trendSeries.add(item);
		}

		return trendSeries;
	}

	/***************************************************************************
	 * Retreives a linked list of series that are either bar, line or area type
	 * 
	 * @return  series
	 *         Linked list of series for the particular chart that are either
	 *         bar, line or area type
	 ***************************************************************************/
	public LinkedList<Series> getNonTrendLineSeries() {
		LinkedList<Series> nonTrendSeries = new LinkedList<Series>();
		Series item;
		Iterator<Series> itr = this.series.listIterator();

		while (itr.hasNext())
		{
			item = itr.next();
			if(item.getSeriesType() != Series.SeriesType.TRENDLINE)
				nonTrendSeries.add(item);
		}

		return nonTrendSeries;
	}

	public static String getMinScale(double minValue, double maxValue)
	{
		String result = "0.00";
		if (minValue <= maxValue)
		{
			double        len = maxValue - minValue; //range of the data series
			double        adj = len <= 10.0 ? 1.0 : 2.0; //scaling adjustment value (less than 10 use 1)
			double        min = (double)Math.floor(minValue >= 0.0 && minValue <= adj ? 0.0 : minValue - adj);
			DecimalFormat fmt = new DecimalFormat("0");
			result = fmt.format(min);
		}
		return result;
	}//getMinScale

	public static String getMaxScale(double minValue, double maxValue)
	{
		String result = "0.00";
		if (minValue <= maxValue)
		{
			double        len = maxValue - minValue; //range of the data series
			double        adj = len <= 10.0 ? 1.0 : 2.0; //scaling adjustment value (less than 10 use 1)
			double        min = (double)Math.floor(minValue >= 0.0 && minValue <= adj ? 0.0 : minValue - adj);
			double        max = (double)Math.ceil(min >= 0.0 && maxValue < 1.0 ? 1.0 : maxValue + adj);
			DecimalFormat fmt = new DecimalFormat("0");
			result = fmt.format(max);
		}
		return result;
	}//getMinScale





}//Graph