var MetaLayerCharts = {
	lineChartDef: {
		width: "400",
		height: "150",
		chartType: "Line",
		cdaPath: "/public/plugin-samples/fusion-charts/Fusion Charts Free/LineChart.cda",
		cdaDataAccessId: "2",
		chartTitle: "Sales Per year",
		xAxisName: "Years",
		yAxisName: "Sales",
		chartType: "Line",
		height: "200",
		width: "500",
		free: "true",
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
		cdaDataAccessId:"2",
		seriesName:"Sales 1;Sales 2"
	},
	
	barChartDef: {
		width: "400",
		height: "150",
		chartType: "Bar2D",
		cdaDataAccessId:"2",
		outputIndexId:"2"
	},
	drillBarChartDef: {
		width: "400",
		height: "150",
		chartType: "Bar2D",
		pathMode: "new",
		xFusionPath: "/public/plugin-samples/fusion-charts/Fusion Charts Free/DrillBarChart2D.xfusion",
		seriesParam:"SeriesParamName",
		categoriesParam:"categoriesParamName",
		chartLink:"JavaScript:drillBarChart.drillFunction('{SeriesParamName}','{categoriesParamName}')", 	
		cdaDataAccessId:"2"
	}
};