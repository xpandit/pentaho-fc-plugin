package com.fusioncharts;

/**
 * 
 * The Series class provides a category object that is used by the Graph class
 * 
 * 
 * @author dduque
 *
 */
public class Category {
	
	private Double xValue;
	private String lable;
	private Double showLable;
	private String toolText;
	private Double showVerticalLine=(double) 1;
	private Double lineDashed;
	
	/**
	 * @return the xValue
	 */
	public Double getxValue() {
		return xValue;
	}
	/**
	 * @param xValue the xValue to set
	 */
	public void setxValue(Double xValue) {
		this.xValue = xValue;
	}
	/**
	 * @return the lable
	 */
	public String getLable() {
		return lable;
	}
	/**
	 * @param lable the lable to set
	 */
	public void setLable(String lable) {
		this.lable = lable;
	}
	/**
	 * @return the showLable
	 */
	public Double getShowLable() {
		return showLable;
	}
	/**
	 * @param showLable the showLable to set
	 */
	public void setShowLable(Double showLable) {
		this.showLable = showLable;
	}
	/**
	 * @return the toolText
	 */
	public String getToolText() {
		return toolText;
	}
	/**
	 * @param toolText the toolText to set
	 */
	public void setToolText(String toolText) {
		this.toolText = toolText;
	}
	/**
	 * @return the showVerticalLine
	 */
	public Double getShowVerticalLine() {
		return showVerticalLine;
	}
	/**
	 * @param showVerticalLine the showVerticalLine to set
	 */
	public void setShowVerticalLine(Double showVerticalLine) {
		this.showVerticalLine = showVerticalLine;
	}
	/**
	 * @return the lineDashed
	 */
	public Double getLineDashed() {
		return lineDashed;
	}
	/**
	 * @param lineDashed the lineDashed to set
	 */
	public void setLineDashed(Double lineDashed) {
		this.lineDashed = lineDashed;
	}

}
