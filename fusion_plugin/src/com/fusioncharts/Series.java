package com.fusioncharts;

import java.text.DecimalFormat;


/*******************************************************************************
* The Series class provides a series object that is used by the Graph class
* 
* Originally this was a subclass of WePopChart.java but we decided that it was a 
* better solution to separate it from the class.
* 
* 20090323 - First created by David Lai
* 
*****************************************************************************/
public class Series
extends Object
implements Cloneable
{
	
	/****************************************************************
	 * 
	 * Series Enum that determines the series type
	 * Can either be: Bar, Line, Area, Trendline
	 *
	 ***************************************************************/
	public enum SeriesType {
		BAR,
		LINE,
		AREA,
		TRENDLINE
	}//End SeriesType Enum
	
	/***************************************************************************
	 * Series Member Declaration
	 ***************************************************************************/
	private String        	label;
	private String[]      	color;
	private DecimalFormat 	format;
	private String[]      	event;
	private Double[]      	value;
	private String[]		toolText;
	private SeriesType		seriesType;
	private String 			parentYAxis;
	private	Double[]		xValue;
	private	Double[]		yValue;
	private	Double[]		zValue;
	private String 			anchorBorderThickness;
	private String 			anchorBorderColor;
  
  /***************************************************************************
  * Creates a Series object. The series is set to a BAR series by default.
  * 
  * @param  label
  *         The series label.
  * @param  count
  *         The number of data values.
  * 
  * @throws IllegalArgumentException
  *         If the count is less than or equal to zero.
  ***************************************************************************/
  public Series(String label, int count)
  throws IllegalArgumentException
  {
    if (count <= 0)
      throw new IllegalArgumentException("count (number of data values) must be greater than or equal to zero");

    this.label = label;
    this.color  = new String[count];
    this.format = null;
    this.event = new String[count];
    this.value  = new Double[count];
    this.toolText = new String[count];
    this.seriesType = SeriesType.BAR; //default bar series
    this.xValue=new Double[count];
    this.yValue=new Double[count];
    this.zValue=new Double[count];
  }//Series


/***************************************************************************
 * Accessor method to return the series type.
 * 
 * @return seriesType
 *         The series type. Note that normal seriesType can be assumed as regular
 ***************************************************************************/
public SeriesType getSeriesType() {
	return seriesType;
}

/***************************************************************************
 * Manipulator method to set the series type.
 * 
 * @param  seriesType
 *         The series type. For example if it is a trendline then mark it as "trendline"
 ***************************************************************************/
public void setSeriesType(SeriesType seriesType) {
	this.seriesType = seriesType;
}

/***************************************************************************
  * Manipulator method to set the series label.
  * 
  * @param  label
  *         The series label.
  ***************************************************************************/
  public void setLabel(String label)
  {
    //this.label  = WePopChart.formatText(label); //Put this back if we get any format text errors
	  this.label = label;
  }//setLabel

  /***************************************************************************
  * Accessor method to return the series label.
  * 
  * @return label
  *         The series label.
  ***************************************************************************/
  public String getLabel()
  {
    return this.label;
  }//getLabel

  /***************************************************************************
   * Sets color at the specified indice.
   * 
   * @param  index
   *         The indice of the color to set.
   * @param  color
   *         The color to set.
   *
   * @throws ArrayIndexOutOfBoundsException
   *         If the index is less than zero or greater than or equal to the
   *         length.
   ***************************************************************************/  
  public void setColor(int index, String color)
  throws ArrayIndexOutOfBoundsException
  {
    this.color[index] = color;
  }//setEvent
  
  /***************************************************************************
  * Manipulator method to set the colors.
  * The first color corresponds to index 0.  If the length of the array 
  * passed is less than the length of the value array, the last value 
  * of the array passed will be used to fill the remaining
  * events.
  * 
  * @param  colors
  *         The colors array in the format RRGGBB.
  ***************************************************************************/
  public void setColor(String ... colors)
  {	  
      for (int i = 0; i < this.color.length; i++) {
    	  if ((i < colors.length) && (colors[i] == null || colors[i].trim().length() == 0))
    		  this.color[i] = null;
    	  
    	  this.color[i] = i >= colors.length ? colors[colors.length-1] : colors[i];
      }
  }//setColor
  
  /***************************************************************************
  * Manipulator method to set the color specified red, green, and blue
  * values in the range (0 - 255). 
  *  
  * @param  r
  *         The red component.
  * @param  g
  *         The green component.
  * @param  b
  *         The blue component.
  * @param  index
  *         The indice of the color to set.
  *         
  * @throws IllegalArgumentException
  *         If the color component is not in the range of 0 to 255.
  ***************************************************************************/
  public void setColor(int r, int g, int b, int index)
  throws IllegalArgumentException
  {
    if (r < 0 || r > 255)
      throw new IllegalArgumentException("red must be in the range 0 to 255");
    if (g < 0 || g > 255)
      throw new IllegalArgumentException("green must be in the range 0 to 255");
    if (b < 0 || b > 255)
      throw new IllegalArgumentException("blue must be in the range 0 to 255");
    
    String red = null;
    String grn = null;
    String blu = null;
    
    red = Integer.toHexString(r).toUpperCase();
    if (red.length() == 1)
      red = "0"+red;
    
    grn = Integer.toHexString(g).toUpperCase();
    if (grn.length() == 1)
      grn = "0"+grn;
    
    blu = Integer.toHexString(b).toUpperCase();
    if (blu.length() == 1)
      blu = "0"+blu;
    
    this.setColor(index, red+grn+blu);
  }//setColor
  
  /***************************************************************************
  * Accessor method to get the color of the series.
  * 
  * @param  index
  *         The indice of the color to get.
  *         
  * @return color
  *         The color in the format RRGGBB.
  *         
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than zero or greater than or equal to the
  *         length.
  ***************************************************************************/
  public String getColor(int index)
  throws ArrayIndexOutOfBoundsException
  {
    return this.color[index];
  }//getColor

  /***************************************************************************
  * Manipulator method to set the decimal formatting object.
  *  
  * @param  format
  *         The decimal format.
  *         
  * @see    {@link java.text.DecimalFormat}
  *         For the available formatting patterns and characters. 
  ***************************************************************************/
  public void setFormat(DecimalFormat format)
  {
    this.format = format;
  }//setFormat
  
  /***************************************************************************
  * Manipulator method to set the decimal format pattern.
  * 
  * @param  format
  *         The decimal format pattern.
  *
  * @see    {@link java.text.DecimalFormat}
  *         For the available formatting patterns and characters.
  ***************************************************************************/
  public void setFormat(String format)
  {
    if (format == null || format.length() == 0)
      this.format = null;
    else
      this.format = new DecimalFormat(format);
  }//setFormat

  /***************************************************************************
  * Accessor method to return the decimal format of the series.
  * 
  * @return DecimalFormat
  *         The decimal format.
  ***************************************************************************/
  public DecimalFormat getFormat()
  {
    return this.format;
  }//getFormat

  /***************************************************************************
   * Sets the url or javascript event at the specified indice.
   * 
   * @param  index
   *         The indice of the event to set.
   * @param  event
   *         The url or javascript event.
   *
   * @throws ArrayIndexOutOfBoundsException
   *         If the index is less than zero or greater than or equal to the
   *         length.
   ***************************************************************************/  
  public void setEvent(int index, String event)
  throws ArrayIndexOutOfBoundsException
  {
    this.event[index] = event;
  }//setEvent
  
  /***************************************************************************
  * Sets the javascript event or url for drill downs.
  * The first value corresponds to index 0.  If the length of the array 
  * passed is less than the length of the value array, the last value 
  * of the array passed will be used to fill the remaining
  * events.
  * 
  * @param  events
  *         The javascript event to use for drill-downs.
  ***************************************************************************/
  public void setEvent(String ... events)
  {
	  for (int i = 0; i < this.event.length; i++)
	      this.event[i] = i >= events.length ? events[events.length-1] : events[i]; 
  }//setEvent
  
  /***************************************************************************
  * Gets the javascript event or url for drill downs at a specific index
  * 
  * @param  index
  *         The indice of the event to set.
  *  
  * @return String[]
  *         The javascript or url.
  * 
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than zero or greater than or equal to the
  *         length.
  ***************************************************************************/
  public String getEvent(int index)
  throws ArrayIndexOutOfBoundsException
  {
    return this.event[index];
  }//getEvent

  /***************************************************************************
  * Sets the x value at the specified indice.
  * 
  * @param  index
  *         The indice of the data to set.
  * @param  value
  *         The x value.
  *
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than zero or greater than or equal to the
  *         length.
  ***************************************************************************/
  public void setXValue(int index, Double value)
  throws ArrayIndexOutOfBoundsException
  {
    this.xValue[index] = value;
  }//setValue
  
  /***************************************************************************
  * Sets the x values.  The first value corresponds to index 0.  If the
  * length of the array passed is less than the length of the value array,
  * the last value is the array passed will be used to fill the remaining
  * values. 
  * 
  * @param  value
  *         The data value(s).
  ***************************************************************************/    
  public void setXValue(Double ... value)
  {
    for (int i = 0; i < this.xValue.length; i++)
      this.xValue[i] = i >= value.length ? value[value.length-1] : value[i];      
  }//setValue
  
 /***************************************************************************
  * Returns the x values.
  * 
  * @param  index
  *         The indice of the data to get.
  *         
  * @return value
  *         The data values.
  * 
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than zero or greater than or equal to the
  *         length.
  ***************************************************************************/  
  public Double getXValue(int index)
  throws ArrayIndexOutOfBoundsException
  {
	return this.xValue[index];
  }
  
  
  /***************************************************************************
   * Sets the y value at the specified indice.
   * 
   * @param  index
   *         The indice of the data to set.
   * @param  value
   *         The data value.
   *
   * @throws ArrayIndexOutOfBoundsException
   *         If the index is less than zero or greater than or equal to the
   *         length.
   ***************************************************************************/
   public void setYValue(int index, Double value)
   throws ArrayIndexOutOfBoundsException
   {
     this.yValue[index] = value;
   }//setValue
   
   /***************************************************************************
   * Sets the Y values.  The first value corresponds to index 0.  If the
   * length of the array passed is less than the length of the value array,
   * the last value is the array passed will be used to fill the remaining
   * values. 
   * 
   * @param  value
   *         The data value(s).
   ***************************************************************************/    
   public void setYValue(Double ... value)
   {
     for (int i = 0; i < this.yValue.length; i++)
       this.yValue[i] = i >= value.length ? value[value.length-1] : value[i];      
   }//setValue
   
  /***************************************************************************
   * Returns the Y values.
   * 
   * @param  index
   *         The indice of the data to get.
   *         
   * @return value
   *         The data values.
   * 
   * @throws ArrayIndexOutOfBoundsException
   *         If the index is less than zero or greater than or equal to the
   *         length.
   ***************************************************************************/  
   public Double getYValue(int index)
   throws ArrayIndexOutOfBoundsException
   {
 	return this.yValue[index];
   }
   
   
   /***************************************************************************
    * Sets the Z value at the specified indice.
    * 
    * @param  index
    *         The indice of the data to set.
    * @param  value
    *         The data value.
    *
    * @throws ArrayIndexOutOfBoundsException
    *         If the index is less than zero or greater than or equal to the
    *         length.
    ***************************************************************************/
    public void setZValue(int index, Double value)
    throws ArrayIndexOutOfBoundsException
    {
      this.zValue[index] = value;
    }//setValue
    
    /***************************************************************************
    * Sets the Z values.  The first value corresponds to index 0.  If the
    * length of the array passed is less than the length of the value array,
    * the last value is the array passed will be used to fill the remaining
    * values. 
    * 
    * @param  value
    *         The data value(s).
    ***************************************************************************/    
    public void setZValue(Double ... value)
    {
      for (int i = 0; i < this.zValue.length; i++)
        this.zValue[i] = i >= value.length ? value[value.length-1] : value[i];      
    }//setValue
    
   /***************************************************************************
    * Returns the Z values.
    * 
    * @param  index
    *         The indice of the data to get.
    *         
    * @return value
    *         The data values.
    * 
    * @throws ArrayIndexOutOfBoundsException
    *         If the index is less than zero or greater than or equal to the
    *         length.
    ***************************************************************************/  
    public Double getZValue(int index)
    throws ArrayIndexOutOfBoundsException
    {
  	return this.zValue[index];
    }
    
    
    /***************************************************************************
     * Sets the data value at the specified indice.
     * 
     * @param  index
     *         The indice of the data to set.
     * @param  value
     *         The data value.
     *
     * @throws ArrayIndexOutOfBoundsException
     *         If the index is less than zero or greater than or equal to the
     *         length.
     ***************************************************************************/
     public void setValue(int index, Double value)
     throws ArrayIndexOutOfBoundsException
     {
       this.value[index] = value;
     }//setValue
     
     /***************************************************************************
     * Sets the data values.  The first value corresponds to index 0.  If the
     * length of the array passed is less than the length of the value array,
     * the last value is the array passed will be used to fill the remaining
     * values. 
     * 
     * @param  value
     *         The data value(s).
     ***************************************************************************/    
     public void setValue(Double ... value)
     {
       for (int i = 0; i < this.value.length; i++)
         this.value[i] = i >= value.length ? value[value.length-1] : value[i];      
     }//setValue
     
    /***************************************************************************
     * Returns the data values.
     * 
     * @param  index
     *         The indice of the data to get.
     *         
     * @return value
     *         The data values.
     * 
     * @throws ArrayIndexOutOfBoundsException
     *         If the index is less than zero or greater than or equal to the
     *         length.
     ***************************************************************************/  
     public Double getValue(int index)
     throws ArrayIndexOutOfBoundsException
     {
   	return this.value[index];
     }

 /***************************************************************************
  * Returns the tooltip popup value.
  * 
  * @param  index
  *         The indice of the tooltext to get.
  *         
  * @return toolText
  *         The toolText popup.
  * 
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than zero or greater than or equal to the
  *         length.
  ***************************************************************************/ 
  public String getToolText(int index)
  throws ArrayIndexOutOfBoundsException
  {
	return toolText[index];
  }

  /***************************************************************************
   * Sets the Tool Tip popup values.  The first value corresponds to index 0.  If the
   * length of the array passed is less than the length of the toolText array,
   * the last value is the array passed will be used to fill the remaining
   * toolText values. 
   * 
   * @param  toolText
   *         The toolText value(s).
   ***************************************************************************/
  public void setToolText(String ... toolText) {
	  for (int i = 0; i < this.toolText.length; i++)
		  this.toolText[i] = i >= toolText.length ? toolText[toolText.length-1] : toolText[i];	  
  }

  /***************************************************************************
   * Sets the Tool Tip popup value at the specified indice.
   * 
   * @param  index
   *         The indice of the data to set.
   * @param  toolText
   *         The Tool Tip value.
   *
   * @throws ArrayIndexOutOfBoundsException
   *         If the index is less than zero or greater than or equal to the
   *         length.
   ***************************************************************************/
   public void setToolText(int index, String toolText)
   throws ArrayIndexOutOfBoundsException
   {
     this.toolText[index] = toolText;
   }//setValue
  
   /***************************************************************************
    * 
    * get the parentYAxis value for this series
    * 
    * @return
    * 
    ***************************************************************************/
   public String getParentYAxis() {
		return parentYAxis;
	}
   /***************************************************************************
    * 
    * set the parentYAxis value for this series
    * 
    * @param parentYAxis 
    * 
    ***************************************************************************/
	public void setParentYAxis(String parentYAxis) {
		this.parentYAxis = parentYAxis;
	}
   
   
  /***************************************************************************
  * Returns the number of data values.
  * 
  * @return int
  *         The number of data values.
  ***************************************************************************/    
  public int getNumberOfValues()
  {
    return this.value.length;
  }//getNumberOfValues
  
  
  /***************************************************************************
   * set the anchorBorderThickness value.
   * 
   *        
   ***************************************************************************/   
  public void setAnchorBorderThickness(String anchorBorderThickness) {
	  this.anchorBorderThickness= anchorBorderThickness;
		
	}
  /***************************************************************************
   * get the anchorBorderThickness value.
   * 
   *        
   ***************************************************************************/   
  public String getAnchorBorderThickness() {
	  return this.anchorBorderThickness;
		
	}
  
  /***************************************************************************
   * set the anchorBorderColor value.
   * 
   *        
   ***************************************************************************/   
  public void setAnchorBorderColor(String anchorBorderThickness) {
	  this.anchorBorderColor= anchorBorderThickness;
		
	}
  /***************************************************************************
   * get the anchorBorderColor with index .
   * 
   *        
   ***************************************************************************/   
  public String getAnchorBorderColor() throws ArrayIndexOutOfBoundsException
  {
	return  this.anchorBorderColor;
  }
  
  
  
  
  /***************************************************************************
  * Increments the value at a specified index by one.
  * 
  * @param  index
  *         The index of the value to modify.
  * 
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than 0 or greater than or equal to the
  *         length of all the values.
  ***************************************************************************/
  public void inc(int index)
  throws ArrayIndexOutOfBoundsException
  {
	  if (this.value[index] == null)
		  this.value[index] = new Double(0);
	  
    this.value[index]++;
  }//inc

  /***************************************************************************
  * Decrements the value at a specified index.
  * 
  * @param  index
  *         The index of the value to modify.
  *         
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than 0 or greater than or equal to the
  *         length of all the values.
  ***************************************************************************/
  public void dec(int index)
  throws ArrayIndexOutOfBoundsException
  {
	  if (this.value[index] == null)
		  this.value[index] = new Double(0);
	  
    this.value[index]--;
  }//dec
  
  /***************************************************************************
  * Adds the value at a specified index by the specified value.
  * 
  * @param  index
  *         The index of the value to modify.
  * @param  value
  *         The value to increment by.
  * 
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than 0 or greater than or equal to the
  *         length of all the values.
  ***************************************************************************/
  public void add(int index, Double value)
  throws ArrayIndexOutOfBoundsException
  {
	  if (this.value[index] == null)
		  this.value[index] = new Double(0);
	  
    this.value[index] += value;
  }//add
  
  /***************************************************************************
  * Subtracts the value at a specified index by the specified value.
  * 
  * @param  index
  *         The index of the value to modify.
  * @param  value
  *         The value to decrement by.
  *         
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than 0 or greater than or equal to the
  *         length of all the values.
  ***************************************************************************/
  public void sub(int index, double value)
  throws ArrayIndexOutOfBoundsException
  {
	  if (this.value[index] == null)
		  this.value[index] = new Double(0);
	  
    this.value[index] -= value;
  }//sub

  /***************************************************************************
  * Multiplies the value at a specified index by the specified value.
  * 
  * @param  index
  *         The index of the value to modify.
  * @param  value
  *         The value to multiply by.
  *         
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than 0 or greater than or equal to the
  *         length of all the values.
  ***************************************************************************/
  public void mul(int index, double value)
  throws ArrayIndexOutOfBoundsException
  {
	  if (this.value[index] == null)
		  this.value[index] = new Double(0);
	  
    this.value[index] *= value;
  }//mul
  
  /***************************************************************************
  * Divides the value at a specified index by the specified value.
  * 
  * @param  index
  *         The index of the value to modify.
  * @param  value
  *         The value to divide by.
  *         
  * @throws ArrayIndexOutOfBoundsException
  *         If the index is less than 0 or greater than or equal to the
  *         length of all the values.
  ***************************************************************************/
  public void div(int index, double value)
  throws ArrayIndexOutOfBoundsException
  {
	  if (this.value[index] == null)
		  this.value[index] = new Double(0);
	  
    this.value[index] /= value;      
  }//div
  
  /***************************************************************************
  * Calculates the sum of a segment of the series.  The starting index will
  * be the maximum of the start index and 0 and the ending index will be the
  * minimum between the ending index and the length of the values. 
  * 
  * @param  startIndex
  *         The index to start from.
  * @param  untilIndex
  *         The index to end at (not including).
  * 
  * @return double
  *         The sum of the series segment.
  ***************************************************************************/
  public double calculateSum(int startIndex, int untilIndex)
  {
    int result = 0;
    
    startIndex = Math.max(startIndex,0);
    untilIndex = Math.min(untilIndex,this.value.length);
    
    while (startIndex < untilIndex)
    {
      result += this.value == null ? 0 : this.value[startIndex];
      startIndex++;
    }
    return result;
  }//calculateSum
  
  /***************************************************************************
  * Calculates the sum of the series.
  * 
  * @return double
  *         The sum of the series.
  ***************************************************************************/
  public double calculateSum()
  {
    return calculateSum(0,this.value.length);
  }//calculateSum
  
  /***************************************************************************
  * Calculates the average of the series.
  * 
  * @return double
  *         The average of the series.
  ***************************************************************************/
  public double calculateAvg()
  {
    int result = 0;

    for (Double d : this.value) {
    	//only calculate if the value is not null, otherwise null + double = null
    	if (d != null)
      result += d;
    }
    result /= this.value.length;
    
    return result;
  }//calculateAvg

  /***************************************************************************
  * Calculates the minimum value of the series.
  * 
  * @return double
  *         The minimum of the series.
  ***************************************************************************/
  public double calculateMin()
  {
    double result = +Double.MAX_VALUE;
    
    for (Double d : this.value)
    {
      if (d != null && d < result)
        result = d;
    }//endfor - each value
    
    return result;
  }//calculateMin
   
  /***************************************************************************
  * Calculates the maximum value of the series.
  * 
  * @return double
  *         The maximum of the series.
  ***************************************************************************/
  public double calculateMax()
  {
    double result = -Double.MAX_VALUE;
    
    for (Double d : this.value)
    {
      if (d != null && d > result)
        result = d;
    }//endfor - each value
    
    return result;
  }//calculateMax

  /*****************************************************************************
  * Clears the data from this Series and resets the values to zero.  Series
  * properties such as color, format and drill-down event are maintained.
  *****************************************************************************/
  public void clear()
  {
    //clear the values
    for (int i = 0; i < this.value.length; i++)
    	this.value[i] = null;
  }//clear    
  
  /***************************************************************************
  * Creates and returns a copy of this object.
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
  public Object clone()
  throws CloneNotSupportedException
  {
    Series clonedObject;
    
    try
    {
      clonedObject = (Series)super.clone();
    }
    catch (CloneNotSupportedException e)
    {
      throw new CloneNotSupportedException("clone not supported in '"+getClass().getName()+"'");
    }//endtry - cloning object
    
    //clone the format object
    clonedObject.format = (DecimalFormat)this.format.clone();
    
    //clone the value array
    clonedObject.value = new Double[this.value.length];
    System.arraycopy(this.value,0,clonedObject.value,0,this.value.length);
    
    return clonedObject;
  }//clone
  
  /***************************************************************************
  * Method to return the string representation of this series.
  * 
  * @return String
  *         The script representation of this series.
  ***************************************************************************/
  public String toString()
  {
    StringBuilder result = new StringBuilder();

    //append the color property
    if (this.color != null)
      result.append("(CLR_").append(this.color).append(")");

    //append the label
    result.append(this.label);

    //append the series data
    if (this.value != null)
    {
      for (double d : this.value)
      {
        result.append(";");
        if (this.format == null)
          result.append(d);
        else
          result.append(this.format.format(d));
      }//endfor - each data value
    }//endif - has series

    return result.toString();
  }//toString
}//Series