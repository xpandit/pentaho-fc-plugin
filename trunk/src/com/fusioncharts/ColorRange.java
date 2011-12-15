package com.fusioncharts;

/**
 * 
 * Each instance of this class represents a Color range element 
 * 
 * @author dduque
 *
 */
public class ColorRange {
	
	Double minValue;//min value
	Double maxValue;//max value 
	String colorCode;//color code
	String displayValue;//Display Value
	
	/**
	 * 
	 * Constructor
	 * 
	 * @param minValue min value of this color range
	 * @param maxValue max value of this color range
	 * @param colorCode color code of this color range
	 * @param displayValue name of this color range
	 */
	public ColorRange(Double minValue, Double maxValue, String colorCode,String displayValue)
	{
		this.minValue=minValue;
		this.maxValue=maxValue;
		this.colorCode=colorCode;
		this.displayValue=displayValue;
	}

	/**
	 * 
	 * get min value of color range 
	 * 
	 * @return
	 */
	public Double getMinValue() {
		return minValue;
	}

	/**
	 *  set min value of color range 
	 *  
	 * @param minValue
	 */
	public void setMinValue(Double minValue) {
		this.minValue = minValue;
	}
	/**
	 * 
	 * get max value of color range 
	 * 
	 * @return
	 */
	public Double getMaxValue() {
		return maxValue;
	}

	/**
	 *  set max value of color range 
	 *  
	 * @param minValue
	 */
	public void setMaxValue(Double maxValue) {
		this.maxValue = maxValue;
	}
	/**
	 * 
	 * get code color value of color range 
	 * 
	 * @return
	 */
	public String getColorCode() {
		return colorCode;
	}
	/**
	 *  set color code of color range 
	 *  
	 * @param minValue
	 */
	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
	}
	/**
	 * @return the displayValue
	 */
	public String getDisplayValue() {
		return displayValue;
	}

	/**
	 * @param displayValue the displayValue to set
	 */
	public void setDisplayValue(String displayValue) {
		this.displayValue = displayValue;
	}

}
