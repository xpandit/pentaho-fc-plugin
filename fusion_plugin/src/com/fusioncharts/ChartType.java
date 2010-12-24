package com.fusioncharts;

public enum ChartType {
	
	//add extra values to each enum if desired
	COLUMN2D (SingleOrMulti.SINGLE, "Column2D"),
	COLUMN3D (SingleOrMulti.SINGLE, "Column3D"),
	PIE3D (SingleOrMulti.SINGLE, "Pie3D"),
	PIE2D (SingleOrMulti.SINGLE, "Pie2D"),
	LINE (SingleOrMulti.SINGLE, "Line"),
	BAR2D (SingleOrMulti.SINGLE, "Bar2D"),
	MSCOLUMN2D (SingleOrMulti.MULTI, "MSColumn2D"),
	MSCOLUMN3D (SingleOrMulti.MULTI, "MSColumn3D"),
	MSLINE (SingleOrMulti.MULTI, "MSLine"),
	MSBAR2D (SingleOrMulti.MULTI, "MSBar2D"),
	MSBAR3D (SingleOrMulti.MULTI, "MSBar3D"),
	MSCOMBI2D(SingleOrMulti.MULTI, "MSCombi2D"),
	MSCOMBI3D(SingleOrMulti.MULTI, "MSCombi3D"),
	STACKEDCOLUMN2D (SingleOrMulti.MULTI, "StackedColumn2D"),
	STACKEDCOLUMN3D (SingleOrMulti.MULTI, "StackedColumn3D"),
	MSCOLUMNLINE3D(SingleOrMulti.MULTI, "MSColumnLine3D"),
	MSCOLUMN3DLINEDY(SingleOrMulti.MULTI, "MSColumn3DLineDY");
	
	enum SingleOrMulti {
		SINGLE,
		MULTI;
	}
	
	private final SingleOrMulti singleOrMulti;
	private String string;
	
	ChartType(SingleOrMulti singleOrMulti, String string)
	{
		this.singleOrMulti = singleOrMulti;
		this.string = string;
	}
	
	public boolean isSingleSeries()
	{
		if(this.singleOrMulti == SingleOrMulti.SINGLE)
			return true;
		return false;
	}
	
	public String toString()
	{
		return this.string;
	}
	
}
