var MetaLayerCharts = {
	lineChartDef: {
		width: "400",
		height: "150",
		chartType: "Line",
		cdaDataAccessId:"2"
	},
	pieChartDef: {
		width: "400",
		height: "150",
		chartType: "Pie3D",
		cdaDataAccessId:"2"
	},
	columnChartDef: {
		width: "400",
		height: "150",
		chartType: "Column3D",
		cdaDataAccessId:"2"
	},
	
	msColumnChartDef: {
		width: "400",
		height: "150",
		chartType: "MSColumn3D",
		cdaDataAccessId:"2"
	},
	
	barChartDef: {
		width: "400",
		height: "150",
		chartType: "Bar2D",
		cdaDataAccessId:"2"
	},
	drillBarChartDef: {
		width: "400",
		height: "150",
		chartType: "Bar2D",
		seriesParam:"SeriesParamName",
		categoriesParam:"categoriesParamName",
		chartLink:"JavaScript:drillBarChart.drillFunction('{SeriesParamName}','{categoriesParamName}')", 	
		cdaDataAccessId:"2"
	}
};