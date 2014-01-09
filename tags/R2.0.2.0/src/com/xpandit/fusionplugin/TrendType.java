package com.xpandit.fusionplugin;

import com.fusioncharts.ChartType.SingleOrMulti;

/**
 * Enumerator for all the supported trending line types in the analyser's trending line dropdown.
 * 
 * @author bffaustino
 * 
 */
public enum TrendType {
	
	/**
	 * Default trend line type defined by the none value. Does not have a property assigned with its label (NA).
	 */
	NONE("none", "NA", SingleOrMulti.SINGLE),
	/**
	 * Trending line with the series minimum value. Is defined by the min value with its label on the trendLineMin.
	 */
	MINIMUM("min", "trendLineMin", SingleOrMulti.SINGLE),
	/**
	 * Trending line with the series average value. Is defined by the avg value with its label on the trendLineAvg.
	 */
	AVERAGE("avg", "trendLineAvg", SingleOrMulti.SINGLE),
	/**
	 * Trending line with the series simple linear regression values. Is defined by the slr value with its label on the trendLineSLR.
	 */
	SIMPLE_LINEAR_REGRESSION("slr", "trendLineSLR", SingleOrMulti.MULTI),
	/**
	 * Trending line with the series maximum value. Is defined by the max value with its label on the trendLineMax.
	 */
	MAXIMUM("max", "trendLineMax", SingleOrMulti.SINGLE),
	/**
	 * Trending line type that enables the plot of all the trending lines. It is defined by the all value and does not have
	 * a property assigned with its label (NA).
	 */
	ALL("all", "NA", SingleOrMulti.SINGLE);
	
	public enum SingleOrMulti {
		SINGLE, MULTI;
	}
	
	private String value;
	private String property;
	private final SingleOrMulti singleOrMulti;
	
	/**
	 * TrendType constructor 
	 * 
	 * @param value The same value that is defined in the respective fusioncharts_wrapper.js
	 * @param property The name of the property that stores the label of this trending line
	 */
	TrendType(String value, String property, SingleOrMulti singleOrMulti){
		this.value = value;
		this.property = property;
		this.singleOrMulti = singleOrMulti;
	}
	
	/**
	 * Get method for the TrendType value
	 * 
	 * @return The value of the trending line
	 */
	public String getValue(){
		return value;
	}

	/**
	 * Get method for the TrendType property name
	 * 
	 * @return The name of the property that stores the label
	 */
	public String getProperty(){
		return property;
	}
	
	/**
	 * 
	 * @return
	 */
	public boolean isSinglePoint() {
		if (this.singleOrMulti == SingleOrMulti.SINGLE)
			return true;
		return false;
	}
	
	/**
	 * Returns a TrendType that matches the value in the input
	 * 
	 * @param value The value of the trending line
	 * @return TrendType that matches the value
	 */
	public static TrendType getEnum(String value){
		if(TrendType.MINIMUM.getValue().equals(value))
			return TrendType.MINIMUM;
		else if(TrendType.AVERAGE.getValue().equals(value))
			return TrendType.AVERAGE;
		else if(TrendType.SIMPLE_LINEAR_REGRESSION.getValue().equals(value))
			return TrendType.SIMPLE_LINEAR_REGRESSION;
		else if(TrendType.MAXIMUM.getValue().equals(value))
			return TrendType.MAXIMUM;
		else if(TrendType.ALL.getValue().equals(value))
			return TrendType.ALL;
		else return TrendType.NONE;
	}
}
