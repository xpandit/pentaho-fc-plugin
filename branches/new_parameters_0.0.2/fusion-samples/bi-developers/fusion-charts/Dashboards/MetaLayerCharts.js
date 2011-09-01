var MetaLayerCharts = {
	lineChartDef: {
		width: "400",
		height: "150",
		chartType: "Line",
		xFusionPath: "bi-developers/fusion-charts/Fusion Charts Free/LineChart.xfusion",
		cdaDataAccessId:"2"
	},
	
	pieChartDef: {
		width: "400",
		height: "150",
		chartType: "Pie3D",
		xFusionPath: "bi-developers/fusion-charts/Fusion Charts Free/PieChart3D.xfusion",
		cdaDataAccessId:"2"
	},
	
	columnChartDef: {
		width: "400",
		height: "150",
		chartType: "Column3D",
		xFusionPath: "bi-developers/fusion-charts/Fusion Charts Free/ColumnChart3D.xfusion",
		cdaDataAccessId:"2"
	},
	
	msColumnChartDef: {
		width: "400",
		height: "150",
		chartType: "MSColumn3D",
		xFusionPath: "bi-developers/fusion-charts/Fusion Charts Free/MSColumnChart3D.xfusion",
		cdaDataAccessId:"2"
	},
	
	barChartDef: {
		width: "400",
		height: "150",
		chartType: "Bar2D",
		xFusionPath: "bi-developers/fusion-charts/Fusion Charts Free/BarChart2D.xfusion",
		cdaDataAccessId:"2"
	},
	
	drillBarChartDef: {
		width: "400",
		height: "150",
		chartType: "Bar2D",
		xFusionPath: "bi-developers/fusion-charts/Fusion Charts Free/DrillBarChart2D.xfusion",
		seriesParam:"SeriesParamName",
		categoriesParam:"categoriesParamName",
		chartLink:"JavaScript:drillBarChart.drillFunction('{SeriesParamName}','{categoriesParamName}')", 	
		cdaDataAccessId:"2"
	}
};