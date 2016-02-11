var MetaLayerCharts= {
	PieChart3D: {
		height          : "300",
		width           : "450",
		chartType       : "Pie3D",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/SingleSeriesCharts.cda",
		dataAccessId 		: "2",
		chartProperties:{
			caption     		: "Sales Per Year",
			xAxisName       : "Years",
			yAxisName       : "Sales",
			pieRadius				: "70",
			theme						: "ocean",
		}
	},

	Column2D: {
		height          : "300",
		width           : "450",
		chartType       : "Column2D",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/SingleSeriesCharts.cda",
		dataAccessId 		: "2",
		chartProperties:{
			caption      		: "Sales Per Year",
			xAxisName       : "Years",
			yAxisName       : "Sales",
			theme						: "ocean",
		}
	},

	Marimekko: {
		height          : "300",
		width           : "450",
		chartType       : "marimekko",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/MultiSeriesCharts.cda",
		dataAccessId 		: "1",
		chartProperties:{
			caption: "Top 3 Electronic Brands in Top 3 Revenue Earning States",
      subcaption: "Last month",
      aligncaptiontocanvas: "0",
      yaxisname: "Statewise Sales (in %)",
      xaxisname: "Brand",
      numberprefix: "$",
      valueBgColor: "#FFFFFF",
      valueBgAlpha: "60",
      showPlotBorder: "1",
      plotBorderThickness: "0.25",
      showxaxispercentvalues: "1",
      showsum: "1",
			plottooltext: "<div id='nameDiv' style='font-size: 14px; border-bottom: 1px dashed #666666; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block;'>$label :</div>{br}State: <b>$seriesName</b>{br}Sales : <b>$dataValue</b>{br}Market share in $seriesName : <b>$percentValue</b>{br}Overall market share of $label: <b>$xAxisPercentValue</b>",
			theme: "fint"
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/MultiSeriesCharts.cda",
			dataAccessId: "2",
			// "categories": [
      //   {
      //       "category": [
      //           {
      //               "label": "Bose"
      //           },
      //           {
      //               "label": "Dell"
      //           },
      //           {
      //               "label": "Apple"
      //           }
      //       ]
      //   }
    	// ],
		}
	},

	MSColumn2D: {
		height          : "300",
		width           : "450",
		chartType       : "mscolumn2d",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/MultiSeriesCharts.cda",
		dataAccessId 		: "3",
		chartProperties:{
				caption: "Comparison of Quarterly Revenue",
        xAxisname: "Quarter",
        yAxisName: "Revenues (In USD)",
				numberPrefix: "$",
        plotFillAlpha: "80",
        paletteColors: "#0075c2,#1aaf5d",
        baseFontColor: "#333333",
        baseFont: "Helvetica Neue,Arial",
        captionFontSize: "14",
        subcaptionFontSize: "14",
        subcaptionFontBold: "0",
        showBorder: "0",
        bgColor: "#ffffff",
        showShadow: "0",
        canvasBgColor: "#ffffff",
        canvasBorderAlpha: "0",
        divlineAlpha: "100",
        divlineColor: "#999999",
        divlineThickness: "1",
        divLineDashed: "1",
        divLineDashLen: "1",
        divLineGapLen: "1",
        usePlotGradientColor: "0",
        showplotborder: "0",
        valueFontColor: "#ffffff",
        placeValuesInside: "1",
        showHoverEffect: "1",
        rotateValues: "1",
        showXAxisLine: "1",
        xAxisLineThickness: "1",
        xAxisLineColor: "#999999",
        showAlternateHGridColor: "0",
        legendBgAlpha: "0",
        legendBorderAlpha: "0",
        legendShadow: "0",
        legendItemFontSize: "10",
        legendItemFontColor: "#666666"
		},
		dataSetProperties: {
			dataCallback(seriesname,data){
				if(seriesname === "Previous Year"){
					if(data.value < 12000){
						data.color = "FF0000";
					}
				}
			},
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/MultiSeriesCharts.cda",
			dataAccessId: "4",
			// "categories": [
      //   {
      //       "category": [
      //           {
      //               "label": "Bose"
      //           },
      //           {
      //               "label": "Dell"
      //           },
      //           {
      //               "label": "Apple"
      //           }
      //       ]
      //   }
    	// ],
		}
	},

	StackedColumn2D : {
		height          : "300",
		width           : "450",
		chartType       : "stackedcolumn2d",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/StackedCharts.cda",
		dataAccessId 		: "1",
		chartProperties:{
				"caption": "Product-wise quarterly revenue in current year",
        "subCaption": "Harry's SuperMart",
        "xAxisname": "Quarter",
        "yAxisName": "Revenue (In USD)",
        "numberPrefix": "$",
        "paletteColors": "#0075c2,#1aaf5d",
        "bgColor": "#ffffff",
        "borderAlpha": "20",
        "showCanvasBorder": "0",
        "usePlotGradientColor": "0",
        "plotBorderAlpha": "10",
        "legendBorderAlpha": "0",
        "legendShadow": "0",
        "valueFontColor": "#ffffff",
        "showXAxisLine": "1",
        "xAxisLineColor": "#999999",
        "divlineColor": "#999999",
        "divLineDashed": "1",
        "showAlternateHGridColor": "0",
        "subcaptionFontBold": "0",
        "subcaptionFontSize": "14",
        "showHoverEffect": "1",
				"showBorder": "0",
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/StackedCharts.cda",
			dataAccessId: "2",
		}
	},

	MSStackedColumn2D : {
		height          : "300",
		width           : "450",
		chartType       : "msstackedcolumn2d",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/StackedCharts.cda",
		dataAccessId 		: "4",
		cdaArray				:[
			{path: "/public/plugin-samples/fusion-charts/Fusion Charts/StackedCharts.cda", dataAccessId: "3"},
		],
		chartProperties : {
				"caption": "Product-wise break-up of quarterly revenue in last year",
        "subcaption": "Harry's SuperMart",
        "xaxisname": "Quarter",
        "yaxisname": "Sales (In USD)",
        "paletteColors": "#0075c2,#45AFF5,#2C8A56,#1aaf5d,#50DE90",
        "numberPrefix": "$",
        "numbersuffix": "M",
        "bgColor": "#ffffff",
        "borderAlpha": "20",
        "showCanvasBorder": "0",
        "usePlotGradientColor": "0",
        "plotBorderAlpha": "10",
        "legendBorderAlpha": "0",
        "legendShadow": "0",
        "valueFontColor": "#ffffff",
        "showXAxisLine": "1",
        "xAxisLineColor": "#999999",
        "divlineColor": "#999999",
        "divLineDashed": "1",
        "showAlternateHGridColor": "0",
        "subcaptionFontBold": "0",
        "subcaptionFontSize": "14",
				"showBorder": "0",
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/StackedCharts.cda",
			dataAccessId: "2",
		}
	},

	MSComb2D :{
		height          : "300",
		width           : "450",
		chartType       : "mscombidy2d",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/CombinationCharts.cda",
		dataAccessId 		: "1",
		chartProperties : {
			"caption": "Revenues and Profits",
			"subCaption": "For last year",
			"xAxisname": "Month",
			"pYAxisName": "Amount (In USD)",
			"sYAxisName": "Profit %",
			"numberPrefix": "$",
			"sNumberSuffix": "%",
			"sYAxisMaxValue": "50",
			"paletteColors": "#0075c2,#1aaf5d,#f2c500",
			"baseFontColor": "#333333",
			"baseFont": "Helvetica Neue,Arial",
			"captionFontSize": "14",
			"subcaptionFontSize": "14",
			"subcaptionFontBold": "0",
			"showBorder": "0",
			"bgColor": "#ffffff",
			"showShadow": "0",
			"canvasBgColor": "#ffffff",
			"canvasBorderAlpha": "0",
			"divlineAlpha": "100",
			"divlineColor": "#999999",
			"divlineThickness": "1",
			"divLineDashed": "1",
			"divLineDashLen": "1",
			"divLineGapLen": "1",
			"usePlotGradientColor": "0",
			"showplotborder": "0",
			"showXAxisLine": "1",
			"xAxisLineThickness": "1",
			"xAxisLineColor": "#999999",
			"showAlternateHGridColor": "0",
			"showAlternateVGridColor": "0",
			"legendBgAlpha": "0",
			"legendBorderAlpha": "0",
			"legendShadow": "0",
			"legendItemFontSize": "10",
			"legendItemFontColor": "#666666",
		},
		dataSetProperties :{
			dataSetCallback: function(data) {
				if(data.seriesname ==="Profits"){
					data.renderAs= "area";
					data.showValues = "0";
				};
				if(data.seriesname ==="Profit %"){
					data.parentYAxis = "S";
					data.renderAs= "line";
					data.showValues = "0";
				};
			},
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/CombinationCharts.cda",
			dataAccessId: "2",
		}
	},

	MSComb2DLinedy :  {
		height          : "300",
		width           : "450",
		chartType       : "msstackedcolumn2dlinedy",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/CombinationCharts.cda",
		dataAccessId 		: "5",
		cdaArray				:[
			{path: "/public/plugin-samples/fusion-charts/Fusion Charts/CombinationCharts.cda", dataAccessId: "4"},
		],
		chartProperties : {
			"caption": "Quarterly Sales vs. Profit % in Last Year",
			"subcaption": "Product-wise Break-up - Harry's SuperMart",
			"xAxisName": "Quarter",
			"pYAxisName": "Sales",
			"sYAxisName": "Profit %",
			"numberPrefix": "$",
			"numbersuffix": "M",
			"sNumberSuffix": "%",
			"sYAxisMaxValue": "25",
			"paletteColors": "#5598c3,#2785c3,#31cc77,#1aaf5d,#f45b00",
			"baseFontColor": "#333333",
			"baseFont": "Helvetica Neue,Arial",
			"captionFontSize": "14",
			"subcaptionFontSize": "14",
			"subcaptionFontBold": "0",
			"showBorder": "0",
			"bgColor": "#ffffff",
			"showShadow": "0",
			"canvasBgColor": "#ffffff",
			"canvasBorderAlpha": "0",
			"divlineAlpha": "100",
			"divlineColor": "#999999",
			"divlineThickness": "1",
			"divLineDashed": "1",
			"divLineDashLen": "1",
			"divLineGapLen": "1",
			"usePlotGradientColor": "0",
			"showplotborder": "0",
			"valueFontColor": "#ffffff",
			"placeValuesInside": "1",
			"showXAxisLine": "1",
			"xAxisLineThickness": "1",
			"xAxisLineColor": "#999999",
			"showAlternateHGridColor": "0",
			"legendBgAlpha": "0",
			"legendBorderAlpha": "0",
			"legendShadow": "0",
			"legendItemFontSize": "10",
			"legendItemFontColor": "#666666"
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/CombinationCharts.cda",
			dataAccessId: "3",
		},
		linesetProperties: {
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/CombinationCharts.cda",
			dataAccessId: "6",
			linesetCallback: function(data){
				data.showValues = "0";
			},
			linesetDataCallback: function(seriesname,data){
			},
		},
	},

	XYPlotChart: {
		height          : "300",
		width           : "450",
		chartType       : "bubble",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/XYPlotCharts.cda",
		dataAccessId 		: "1",
		chartProperties :{
				"caption": "Sales Analysis of Shoe Brands",
        "subcaption": "Last Quarter",
        "xAxisMinValue": "0",
        "xAxisMaxValue": "100",
        "yAxisMinValue": "0",
        "yAxisMaxValue": "30000",
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "showPlotBorder": "0",
        "xAxisName": "Average Price",
        "yAxisName": "Units Sold",
        "numDivlines": "2",
        "showValues": "1",
        "showTrendlineLabels": "0",
        "plotTooltext": "$name : Profit Contribution - $zvalue%",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "80",
        "quadrantLineThickness": "3",
        "quadrantXVal": "50",
        "quadrantYVal": "15000",
        "quadrantLabelTL": "Low Price / High Sale",
        "quadrantLabelTR": "High Price / High Sale",
        "quadrantLabelBL": "Low Price / Low Sale",
        "quadrantLabelBR": "High Price / Low Sale",
        "baseFontColor": "#333333",
        "baseFont": "Helvetica Neue,Arial",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "showBorder": "0",
        "bgColor": "#ffffff",
        "showShadow": "0",
        "canvasBgColor": "#ffffff",
        "canvasBorderAlpha": "0",
        "divlineAlpha": "100",
        "divlineColor": "#999999",
        "divlineThickness": "1",
        "divLineDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1",
        "use3dlighting": "0",
        "showplotborder": "0",
        "showYAxisLine": "1",
        "yAxisLineThickness": "1",
        "yAxisLineColor": "#999999",
        "showXAxisLine": "1",
        "xAxisLineThickness": "1",
        "xAxisLineColor": "#999999",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0"
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/XYPlotCharts.cda",
			dataAccessId: "2",
		},
	},

	ScrollChart: {
		height          : "300",
		width           : "450",
		chartType       : "scrollcombi2d",
		path         		: "/public/plugin-samples/fusion-charts/Fusion Charts/ScrollCharts.cda",
		dataAccessId 		: "3",
		chartProperties :{
			"caption": "Actual Revenue, Targeted Revenues & Profits",
			"subCaption": "FY 2012 - FY 2013",
			"xAxisname": "Month",
			"yAxisName": "Amount (In USD)",
			"numberPrefix": "$",
			"numVisiblePlot": "12",
			"paletteColors": "#0075c2,#1aaf5d,#f2c500",
			"baseFontColor": "#333333",
			"baseFont": "Helvetica Neue,Arial",
			"captionFontSize": "14",
			"subcaptionFontSize": "14",
			"subcaptionFontBold": "0",
			"showBorder": "0",
			"bgColor": "#ffffff",
			"showShadow": "0",
			"canvasBgColor": "#ffffff",
			"canvasBorderAlpha": "0",
			"showValues": "0",
			"divlineAlpha": "100",
			"divlineColor": "#999999",
			"divlineThickness": "1",
			"divLineDashed": "1",
			"divLineDashLen": "1",
			"divLineGapLen": "1",
			"usePlotGradientColor": "0",
			"showplotborder": "0",
			"showXAxisLine": "1",
			"xAxisLineThickness": "1",
			"xAxisLineColor": "#999999",
			"showAlternateHGridColor": "0",
			"showAlternateVGridColor": "0",
			"legendBgAlpha": "0",
			"legendBorderAlpha": "0",
			"legendShadow": "0",
			"legendItemFontSize": "10",
			"legendItemFontColor": "#666666",
			"scrollheight": "10",
			"flatScrollBars": "1",
			"scrollShowButtons": "0",
			"scrollColor": "#cccccc",
			"showHoverEffect": "1"
		},
		dataSetProperties :{
			dataSetCallback: function(data) {
				if(data.seriesname ==="Projected Revenue"){
					data.renderAs= "line";
					data.showValues = "0";
				};
				if(data.seriesname ==="Profit"){
					data.renderAs= "area";
					data.showValues = "0";
				};
			},
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/ScrollCharts.cda",
			dataAccessId: "2",
		},
	},

	AngularGaugeChart: {
		cdaPath         : "/public/plugin-samples/fusion-charts/Fusion Charts/AngularGauge.cda",
		chartType		: "AngularGauge",
		height			: "200",
		width			: "400",
		free			: "false",
		cdaDataAccessId	: "1",
		rangeValueCdaId : "2",
		colorRange		: "e44a00;f8bd19;6baa01;6baa01",
		bgColor			: "ffffff",
		bgRatio			: "100",
		bgAlpha			: "100",
		gaugeFillMix	: "{color}",
		gaugeStartAngle	: "250",
		gaugeEndAngle	: "-70",
		gaugeOuterRadius: "95",
		gaugeInnerRadius: "55%",
		gaugeBorderColor: "545A57",
		pivotRadius		: "5",
		showPivotBorder	: "0",
		pivotFillColor	: "545A57",
		pivotFillAlpha	: "100",
		majorTMNumber	: "7",
		majorTMColor	: "000000",
		minorTMColor	: "545A57",
		baseFontColor	: "000000",
		baseFontSize	: "16",
		showLimits		: "0",
		toolTipBgColor	: "545A57",
		toolTipBorderColor:"262626",
		borderColor		: "ffffff",
	},

	RealTimeLineChart: {
		cdaPath: "/public/plugin-samples/fusion-charts/Fusion Charts/RealTimeLine.cda",
		cdaDataAccessId:"1",
		free:"false",
		chartType:"RealTimeLine",
		chartTitle:"Sales Per year",
		caption:"Sales Per Year",
		subcaption:"(Refreshes every second)",
		height:"300",
		width:"450",
		xAxisName:"Time",
		yAxisName:"Sales",
		labelDisplay:"rotate",
		labelStep:"1",
		bgColor 		: "ffffff",
		borderColor		: "ffffff",
	},

	RealTimeBarChart: {
		cdaPath: "/public/plugin-samples/fusion-charts/Fusion Charts/RealTimeColumn.cda",
		cdaDataAccessId:"1",
		free:"false",
		chartType:"RealTimeColumn",
		chartTitle:"Sales Per year",
		caption:"Concurrent Users",
		subcaption:"(Refreshes every 3 seconds)",
		height:"300",
		width:"450",
		xAxisName:"Years",
		yAxisName:"Sales",
		labelDisplay:"rotate",
		labelStep:"2",
		bgColor 		: "ffffff",
		borderColor		: "ffffff",
		categoriesColor:"007878;0A9B9B;29AAAA",
		manageResize:"1",
		canvasborderColor:"DAE1E8",
 		canvasBgColor: "FFFFFF",
 		numDivLines: "6",
 		divLineColor: "DAE1E8",
 		divLineAlpha: "75",
 		alternateHGridAlpha:"30",
 		decimals:"0",
 		baseFontColor:"899FB6",
 		outCnvBaseFontColor:"444C60",
 		toolTipBorderColor:"DAE1E8",
 		toolTipBgColor:"FFFFFF",
 		showAlternateHGridColor:"1",
 		alternateHGridColor:"DAE1E8",
 		refreshInterval:"3",
 		numDisplaySets:"15",
 		showLegend:"1",
 		showLabels:"1",
 		showRealTimeValue:"1",
 		showShadow:"1",
 		showPlotBorder:"0",
 		plotBordercolor:"FFFFFF",
 		canvasLeftMargin:"50",
	},

	BubbleChart: {
		height          : "200",
		width           : "900",
		chartType       : "Bubble",
		cdaPath         : "/public/plugin-samples/fusion-charts/Fusion Charts/BubbleChart.cda",
		cdaDataAccessId : "1",
		chartTitle      : "Sales Per year",
		xAxisName       : "Years",
		yAxisName       : "Sales",
		free            : "false",
		bgColor 		: "ffffff",
		borderColor		: "ffffff",
		categoriesColor:"FF654F;F6BD0F;8BBA00;8Baa00;8BBA12;FFFFFF",
	},

	Angular: {
		path         	: "/public/plugin-samples/fusion-charts/Fusion Charts/Gauges.cda",
		chartType			: "angulargauge",
		height				: "200",
		width					: "450",
		dataAccessId	: "1",
		cdaRefreshInterval : "10",
		chartProperties: {
			bgColor					: "ffffff",
			bgRatio					: "100",
			bgAlpha					: "100",
			gaugeFillMix		: "{color}",
			gaugeStartAngle	: "250",
			gaugeEndAngle		: "-70",
			gaugeOuterRadius: "95",
			gaugeInnerRadius: "55%",
			gaugeBorderColor: "545A57",
			pivotRadius			: "5",
			showPivotBorder	: "0",
			pivotFillColor	: "545A57",
			pivotFillAlpha	: "100",
			majorTMNumber		: "7",
			majorTMColor		: "000000",
			minorTMColor		: "545A57",
			baseFontColor		: "000000",
			baseFontSize		: "16",
			showLimits			: "0",
			toolTipBgColor	: "545A57",
			toolTipBorderColor:"262626",
			borderColor			: "ffffff",
			free						: "false",
		},
		colorRangeProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/Gauges.cda",
			dataAccessId: "2",
			colorCallback: function(data){
				if(data.maxValue === 60){
					data.code = "#e44a00";
				}
				if(data.maxValue === 80){
					data.code = "#f8bd19";
				}
				if(data.maxValue === 100){
					data.code = "#6baa01";
				}
			}
			//colorRange:[{minValue: "0", maxValue: "60", code: "#e44a00"},{minValue: "60", maxValue: "80", code: "#f8bd19"},{minValue: "80", maxValue: "100", code: "#6baa01"}]
		},
	},

	LED: {
		path         	: "/public/plugin-samples/fusion-charts/Fusion Charts/Gauges.cda",
		chartType			: "hled",
		height				: "200",
		width					: "450",
		dataAccessId	: "1",
		cdaRefreshInterval : "10",
		chartProperties: {
				"subcaptionFontBold": "0",
        "lowerLimit": "0",
        "upperLimit": "100",
        "lowerLimitDisplay": "Bad",
        "upperLimitDisplay": "Good",
        "numberSuffix": "%",
        "showValue": "0",
        "showBorder": "0",
        "bgColor": "#ffffff",
        "showShadow": "0",
        "tickMarkDistance": "5"
		},
		colorRangeProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/Gauges.cda",
			dataAccessId: "2",
			colorCallback: function(data){
				if(data.maxValue === 60){
					data.code = "#e44a00";
				}
				if(data.maxValue === 80){
					data.code = "#f8bd19";
				}
				if(data.maxValue === 100){
					data.code = "#6baa01";
				}
			}
		},
	},

	RealTime: {
		path         	: "/public/plugin-samples/fusion-charts/Fusion Charts/RealTimeCharts.cda",
		chartType			: "realtimecolumn",
		height				: "300",
		width					: "450",
		dataAccessId	: "1",
		cdaRefreshInterval : "5",
		chartProperties: {
			free:"false",
			chartTitle:"Sales Per year",
			caption:"Sales Per Year",
			subcaption:"(Refreshes every five seconds)",
			xAxisName:"Time",
			yAxisName:"Sales",
			labelDisplay:"rotate",
			labelStep:"1",
			refreshinterval: "1",
			bgColor 		: "ffffff",
			borderColor		: "ffffff",
			theme :"ocean",
		},
		categoriesProperties:{
			categories:[{"category": [{"label": "Day Start"}]}]
		},
	},

	Spark :{
		path         	: "/public/plugin-samples/fusion-charts/Fusion Charts/SparkCharts.cda",
		chartType			: "sparkcolumn",
		height				: "300",
		width					: "450",
		dataAccessId	: "1",
		chartProperties: {
				"caption": "Revenue by Month",
        "subcaption": "Last year",
        "chartTopMargin": "10",
        "chartBottomMargin": "10",
        "chartRightMargin": "10",
        "numberPrefix": "$",
        "showBorder": "0",
        "canvasBorderThickness": "0",
        "bgColor": "#ffffff",
        "plotFillColor": "#0075c2",
        "highColor": "#1aaf5d",
        "lowColor": "#8e0000",
        "showHoverEffect": "1"
		},
	},

	Bullet :{
		path         	: "/public/plugin-samples/fusion-charts/Fusion Charts/BulletGraphs.cda",
		chartType			: "hbullet",
		height				: "300",
		width					: "450",
		dataAccessId	: "1",
		chartProperties: {
			"lowerLimit": "0",
      "upperLimit": "100",
      "caption": "Monthly Revenue",
      "subcaption": "Actual vs Target<br>Bakersfield Central",
      "numberPrefix": "$",
      "numberSuffix": "K",
      "plotFillColor": "#0075c2",
      "targetColor": "#8e0000",
      "showHoverEffect": "1",
      "showBorder": "0",
      "bgColor": "#ffffff",
      "showShadow": "0",
      "colorRangeFillMix": "{light+0}",
      "valuePadding": "7"
		},
		colorRangeProperties:{
			path         	: "/public/plugin-samples/fusion-charts/Fusion Charts/BulletGraphs.cda",
			dataAccessId	: "2",
			colorCallback: function(data){
				if(data.maxValue===50){
					data.code = "#e44a00";
					data.alpha = "70";
				};
				if(data.maxValue===75){
					data.code = "#f2c500";
					data.alpha = "70";
				};
				if(data.maxValue===100){
					data.code = "#1aaf5d";
					data.alpha = "70";
				};
			},
		},
	},

	Funnel :{
		path         	: "/public/plugin-samples/fusion-charts/Fusion Charts/Others.cda",
		chartType			: "funnel",
		height				: "300",
		width					: "450",
		dataAccessId	: "1",
		chartProperties: {
				"caption": "Website - Harry's SuperMart",
        "subcaption": "Visit to purchase - Conversion analysis for last year",
        "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
        "bgColor": "#ffffff",
        "decimals": "1",
        "showBorder": "0",
        "isHollow": "1",
        "labelDistance": "15",
        "is2D": "1",
        "plotTooltext": "Success : $percentOfPrevValue",
        "showPercentValues": "1"
		},
	},

	DragNode: {
		height       : "600",
		width        : "900",
		chartType    : "DragNode",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/DragNodeChart.cda",
		dataAccessId : "4",
		connectorsPath : "/public/plugin-samples/fusion-charts/Fusion Charts/DragNodeChart.cda",
    connectorsDataAccessId : "5",
		//Properties for the chart
		chartProperties: {
			palette: "2",
			xaxisminvalue: "0",
			xaxismaxvalue: "100",
			yaxisminvalue: "0",
			yaxismaxvalue: "100",
			is3d: "0",
			showformbtn: "0",
			viewmode: "0",
			// apply theme to chart
			theme: "fint",
		},
		// Properties for the dataset (nodes)
		dataSetProperties : {
			plotborderalpha : "1",
      allowdrag: "1",
      showformbtn: "0",
			//Function to apply properties to nodes individually
			dataSetCallback: function(data) {
				if(data.id == "null" || data.id == "null2" || data.id == "null3"){
					data.width= "50";
					data.height = "40";
					data.alpha = "0";
					data.allowdrag = "0";
				}else{
					if(data.id == "pc1"){
						data.width = "110";
						data.height = "90";
						data.imagenode = "1";
						data.imageurl = "http://www.fusioncharts.com/explore/Resources/desktop.png";
						data.tooltext = "Name: PC1 <br> IP: 202.11.32.123 <br> Owner: Harry Mac";
						// apply a Javascript link to node with the data as a argument
						data.link = "JavaScript:nodelink("+JSON.stringify(data)+")";
						data.color="FE3233";
						data.alpha = "0"
						data.labelalign = "top";
						data.imagealign = "middle";
						data.imagewidth = "107";
            data.imageheight = "67";
						data.allowdrag = "1"
					}else{
						// apply a webpage link to a node
						if(data.name == "Internet"){data.link = "n-http://www.fusioncharts.com/charts/drag-node-charts/";}
						data.shape= "circle";
						data.radius = "40";
					}
				}
			}
		},
		//Properties to apply in the connectors
		connectorsProperties : {
			stdthickness: "5",
			//Function to apply properties to connectres individually
			connectorCallback: function (data){
				data.arrowatstart = "0";
				data.arrowatend = "0";
				data.link = "n-http://www.fusioncharts.com/charts/drag-node-charts/";
			}
		},
		//(Optional) Define vertical trendlines
		vtrendlinesProperties:{
			path:"/public/plugin-samples/fusion-charts/Fusion Charts/DragNodeChart.cda",
			dataAccessId: "2",
			vlineCallback: function(data){
				if(data.endvalue=="30"){data.color = "FF0000"; data.displayvalue = "External Network"};
				if(data.endvalue=="60"){data.color = "00FF00"; data.displayvalue = "Middleware"};
				if(data.endvalue=="100"){data.color = "0000FF"; data.displayvalue = "Internal Network"};
				data.alpha = "5";
				data.istrendzone = "1";
			}
			// Trendlines can be implemented without cda, simple declare them as the example:
			// vtrendlines:[{
			// 	line:[
			// 		{
			// 			startvalue: "0",
			// 			endvalue: "30",
			// 			color: "FF0000",
			// 			alpha: "5",
			// 			displayvalue: "External Network",
			// 			istrendzone: "1",
			// 		},
			// 		{
			// 			startvalue: "30",
			// 			endvalue: "60",
			// 			color: "00FF00",
			// 			alpha: "5",
			// 			displayvalue: "Middleware",
			// 			istrendzone: "1"
			// 		},
			// 		{
			// 			startvalue: "60",
			// 			endvalue: "100",
			// 			color: "0000FF",
			// 			alpha: "5",
			// 			displayvalue: "Internal Network",
			// 			istrendzone: "1"
			// 		}
			// 	],
			// }],
		},
		//(Optional) Define labels
		labelsProperties: {
			path:"/public/plugin-samples/fusion-charts/Fusion Charts/DragNodeChart.cda",
			dataAccessId: "3",
			labelCallback: function(data){
				data.color = "000000";
				data.fontsize = "18";
			},
			// Labels can be implemented without cda, simple declare them as the example:
			// labels: {
	    //     label: [
			// 			{
			// 					text: "External Network",
			// 					x: "12",
			// 					y: "99",
			// 					color: "000000",
			// 					fontsize: "18",
			// 			},
			// 			{
			// 					text: "Middleware",
			// 					x: "45",
			// 					y: "99",
			// 					color: "000000",
			// 					fontsize: "18",
			// 			},
			// 			{
			// 					text: "Internal Network",
			// 					x: "75",
			// 					y: "99",
			// 					color: "000000",
			// 					fontsize: "18",
			// 			}
	    //     ]
	    // }
		}
	},

	Gantt: {
		height       : "600",
		width        : "900",
		chartType    : "Gantt",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/Others.cda",
		dataAccessId : "5",
		processesPath: "/public/plugin-samples/fusion-charts/Fusion Charts/Others.cda",
		processesDataAccessId: "3",
		datatablePath: "/public/plugin-samples/fusion-charts/Fusion Charts/Others.cda",
		datatableDataAccessId: "4",
		milestonesPath: "/public/plugin-samples/fusion-charts/Fusion Charts/Others.cda",
		milestonesDataAccessId: "6",
		connectorsPath: "/public/plugin-samples/fusion-charts/Fusion Charts/Others.cda",
		connectorsDataAccessId: "7",
		//Properties for the chart
		chartProperties: {
			"caption": "Construction management of a new store in Denver",
      "subcaption": "Planned vs Actual",
      "dateformat": "dd/mm/yyyy",
      "outputdateformat": "ddds mns yy",
      "ganttwidthpercent": "60",
      "ganttPaneDuration": "40",
      "ganttPaneDurationUnit": "d",
      "plottooltext": "$processName{br} $label starting date $start{br}$label ending date $end",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "usePlotGradientColor": "0",
      "showCanvasBorder": "0",
      "flatScrollBars": "1",
      "gridbordercolor": "#333333",
      "gridborderalpha": "20",
      "slackFillColor": "#e44a00",
      "taskBarFillMix": "light+0"
		},
		tasksProperties:{
			taskCallback: function(data){
				data.height = "32%";
				if(data.label === "Planned"){
					data.toppadding = "12%";
				}else{
					data.toppadding = "56%";
				};
			},
		},
		processesProperties:{
			"headertext": "Task",
      "fontcolor": "#000000",
      "fontsize": "11",
      "isanimated": "1",
      "bgcolor": "#6baa01",
      "headervalign": "bottom",
      "headeralign": "left",
      "headerbgcolor": "#999999",
      "headerfontcolor": "#ffffff",
      "headerfontsize": "12",
      "align": "left",
      "isbold": "1",
      "bgalpha": "25",
			processCallback: function(data){
				if(data.id==="2"){
					data.hoverBandColor = "E44A00";
					data.hoverBandAlpha = "40";
				}
			},
		},
		datatableProperties:{
			"showprocessname": "1",
      "namealign": "left",
      "fontcolor": "#000000",
      "fontsize": "10",
      "valign": "right",
      "align": "center",
      "headervalign": "bottom",
      "headeralign": "center",
      "headerbgcolor": "#999999",
      "headerfontcolor": "#ffffff",
      "headerfontsize": "12",
			datacolumnCallback:function(data){
				data.bgcolor = "#eeeeee";
				data.headertext = data.headertext.replace(/ /g,"{br}");
			},
			textCallback: function(headertext,data){
				if(headertext === "Actual Start Date"){
					if(data.label === "26/4/2014"){
						data.bgcolor = "E44A00";
						data.bgAlpha = "40";
					};
				};
			},
		},
		connectorsProperties:{
			connectorCallback: function(data){
				data.color = "008EE4";
				data.thickness = "2";
			}
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/Others.cda",
			dataAccessId: "2",
			categoriesCallback: function(data){
				data.bgcolor = "999999";
				data.align = "middle";
				data.fontcolor = "ffffff";
				data.fontsize = "12";
			},
			categoryCallback: function(group, data){},
		},
		legendProperties:{
			"item": [
					 {
							 "label": "Planned",
							 "color": "#008ee4"
					 },
					 {
							 "label": "Actual",
							 "color": "#6baa01"
					 },
					 {
							 "label": "Slack (Delay)",
							 "color": "#e44a00"
					 }
			 ],
		},
	},

	Logarithmic: {
		height       : "300",
		width        : "450",
		chartType    : "logmscolumn2d",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/LogarithmicCharts.cda",
		dataAccessId : "1",
		chartProperties : {
			"caption": "Store footfall vs Online visitors ",
			"subCaption": "Last Year",
			"captionFontSize": "14",
			"subcaptionFontSize": "14",
			"subcaptionFontBold": "0",
			"baseFontColor": "#333333",
			"baseFont": "Helvetica Neue,Arial",
			"xAxisName": "Quarter",
			"yAxisName": "No of visitors",
			"paletteColors": "#0075c2,#1aaf5d",
			"bgColor": "#ffffff",
			"showBorder": "0",
			"showCanvasBorder": "0",
			"showPlotBorder": "0",
			"showAlternateHgridColor": "0",
			"showXAxisLine": "1",
			"usePlotGradientcolor": "0",
			"valueFontColor": "#ffffff",
			"placeValuesInside": "1",
			"rotateValues": "1",
			"LegendShadow": "0",
			"legendBorderAlpha": "0",
			"base": "10",
			"axisLineAlpha": "10",
			"toolTipColor": "#ffffff",
			"toolTipBorderThickness": "0",
			"toolTipBgColor": "#000000",
			"toolTipBgAlpha": "80",
			"toolTipBorderRadius": "2",
			"toolTipPadding": "5",
			"divlineAlpha": "100",
			"divlineColor": "#999999",
			"divlineThickness": "1",
			"divLineDashed": "1",
			"divLineDashLen": "1",
			"divLineGapLen": "1"
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/LogarithmicCharts.cda",
			dataAccessId: "2",
		},
	},

	Spline: {
		height       : "300",
		width        : "450",
		chartType    : "msspline",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/SplineCharts.cda",
		dataAccessId : "1",
		chartProperties : {
			"caption": "Number of visitors last week",
      "subCaption": "Bakersfield Central vs Los Angeles Topanga",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "subcaptionFontBold": "0",
      "xAxisName": "Day",
      "yAxisName": "No. of Visitor",
      "showValues": "0",
      "paletteColors": "#0075c2,#1aaf5d",
      "bgColor": "#ffffff",
      "showBorder": "0",
      "showShadow": "0",
      "showAlternateHGridColor": "0",
      "showCanvasBorder": "0",
      "showXAxisLine": "1",
      "xAxisLineThickness": "1",
      "xAxisLineColor": "#999999",
      "canvasBgColor": "#ffffff",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "divlineAlpha": "100",
      "divlineColor": "#999999",
      "divlineThickness": "1",
      "divLineDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1"
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/SplineCharts.cda",
			dataAccessId: "2",
			categoryCallback: function(data){
				if(data.label ==="National holiday"){
					data.vline = "true";
					data.lineposition = "0";
					data.color = "6BAA01";
					data.labelHAlign = "right";
					data.labelPosition = "0";
				}
			},
		},
	},

	ErrorChart: {
		height       : "300",
		width        : "450",
		chartType    : "errorline",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/ErrorCharts.cda",
		dataAccessId : "1",
		chartProperties : {
			"caption": "Revenues and Profits",
      "subCaption": "Predicted for next year",
      "xAxisname": "Month",
      "yAxisName": "Amount (In USD)",
      "numberPrefix": "$",
      "halferrorbar": "0",
      "plotTooltext": "<div id='nameDiv' style='font-size: 14px; border-bottom: 1px dashed #999999; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block;'>$label :</div>{br}$seriesName : <b>$dataValue</b>{br}Deviation : <b>± $errorDataValue</b>",
      "paletteColors": "#0075c2,#1aaf5d,#f2c500",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "showBorder": "0",
      "bgColor": "#ffffff",
      "showValues": "0",
      "showShadow": "0",
      "canvasBgColor": "#ffffff",
      "canvasBorderAlpha": "0",
      "divlineAlpha": "100",
      "divlineColor": "#999999",
      "divlineThickness": "1",
      "divLineDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1",
      "usePlotGradientColor": "0",
      "showplotborder": "0",
      "showXAxisLine": "1",
      "xAxisLineThickness": "1",
      "xAxisLineColor": "#999999",
      "showAlternateHGridColor": "0",
      "showAlternateVGridColor": "0",
      "legendBgAlpha": "0",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "legendItemFontSize": "10",
      "legendItemFontColor": "#666666",
      "toolTipColor": "#ffffff",
      "toolTipBorderThickness": "0",
      "toolTipBgColor": "#000000",
      "toolTipBgAlpha": "80",
      "toolTipBorderRadius": "2",
      "toolTipPadding": "5"
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/ErrorCharts.cda",
			dataAccessId: "2",
		},
	},

	InverseY: {
		height       : "300",
		width        : "450",
		chartType    : "inversemsarea",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/InverseYAxisCharts.cda",
		dataAccessId : "1",
		chartProperties : {
			"caption": "Daily bounce rate",
      "subCaption": "Last week",
      "xAxisName": "Day",
      "yAxisName": "Percentage",
      "numberSuffix": "%",
      "showBorder": "0",
      "paletteColors": "#0075c2,#1aaf5d",
      "bgColor": "#ffffff",
      "usePlotGradientColor": "0",
      "plotFillAlpha": "50",
      "showCanvasBorder": "0",
      "LegendShadow": "0",
      "legendBorderAlpha": "0",
      "showXAxisLine": "1",
      "axisLineAlpha": "40",
      "divlineColor": "#999999",
      "divlineThickness": "1",
      "divLineDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1",
      "showAlternateHgridColor": "0",
      "showValues": "0",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "toolTipColor": "#ffffff",
      "toolTipBorderThickness": "0",
      "toolTipBgColor": "#000000",
      "toolTipBgAlpha": "80",
      "toolTipBorderRadius": "2",
      "toolTipPadding": "5"
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/InverseYAxisCharts.cda",
			dataAccessId: "2",
		},
	},

	DragAble: {
		height       : "300",
		width        : "450",
		chartType    : "dragcolumn2d",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/DragAbleCharts.cda",
		dataAccessId : "1",
		chartProperties : {
			"caption": "Inventory status - Bakersfield Central",
      "subCaption": "Top 5 Food items",
      "xAxisName": "Food Item",
      "yAxisName": "No. of Units",
      "paletteColors": "#0075c2,#1aaf5d",
      "bgColor": "#ffffff",
      "showAlternateHGridColor": "0",
      "showBorder": "0",
      "showCanvasBorder": "0",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "usePlotGradientColor": "0",
      "toolTipColor": "#ffffff",
      "toolTipBorderThickness": "0",
      "toolTipBgColor": "#000000",
      "toolTipBgAlpha": "80",
      "toolTipBorderRadius": "2",
      "toolTipPadding": "5",
      "legendBgAlpha": "0",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "legendItemFontSize": "10",
      "legendItemFontColor": "#666666",
      "legendCaptionFontSize": "9",
      "divlineAlpha": "100",
      "divlineColor": "#999999",
      "divlineThickness": "1",
      "divLineDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1"
		},
		dataSetProperties: {
			dataSetCallback: function(data){
				if(data.seriesname === "Available Stock"){
					data.allowDrag = "0";
				}
				if(data.seriesname === "Estimated Demand"){
					data.dashed = "1";
				}
			},
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/DragAbleCharts.cda",
			dataAccessId: "2",
		},
	},

	Radar: {
		height       : "300",
		width        : "450",
		chartType    : "radar",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/MiscellaneousPowerCharts.cda",
		dataAccessId : "1",
		chartProperties : {
			"caption": "Budget analysis",
      "subCaption": "Current month",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "numberPrefix": "$",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "subcaptionFontBold": "0",
      "paletteColors": "#008ee4,#6baa01",
      "bgColor": "#ffffff",
      "radarfillcolor": "#ffffff",
      "showBorder": "0",
      "showShadow": "0",
      "showCanvasBorder": "0",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "divLineAlpha": "10",
      "usePlotGradientColor": "0",
      "numberPreffix": "$"
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/MiscellaneousPowerCharts.cda",
			dataAccessId: "2",
		},
	},

	StepLine:{
		height       : "300",
		width        : "450",
		chartType    : "msstepline",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/MiscellaneousPowerCharts.cda",
		dataAccessId : "3",
		chartProperties : {
			"caption": "Revenue Vs Expense",
      "subCaption": "Last year",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "xaxisname": "Month",
      "yaxisname": "Amount (In USD)",
      "usePlotGradientColor": "0",
      "bgColor": "#ffffff",
      "palettecolors": "#6baa01, #d35400",
      "showBorder": "0",
      "showPlotBorder": "0",
      "showValues": "0",
      "showShadow": "0",
      "showAlternateHGridColor": "0",
      "showCanvasBorder": "0",
      "showXAxisLine": "1",
      "numberprefix": "$",
      "drawverticaljoints": "1",
      "useforwardsteps": "0",
      "xAxisLineThickness": "1",
      "xAxisLineColor": "#999999",
      "canvasBgColor": "#ffffff",
      "divlineAlpha": "100",
      "divlineColor": "#999999",
      "divlineThickness": "1",
      "divLineDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "toolTipColor": "#ffffff",
      "toolTipBorderThickness": "0",
      "toolTipBgColor": "#000000",
      "toolTipBgAlpha": "80",
      "toolTipBorderRadius": "2",
      "toolTipPadding": "5"
		},
		dataSetProperties: {
			dataSetCallback: function(data){
				data.linethickness = "3";
				data.anchorradius = "3";
			},
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/MiscellaneousPowerCharts.cda",
			dataAccessId: "4",
		},
	},

	SelectScatter:{
		height       : "300",
		width        : "450",
		chartType    : "selectscatter",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/MiscellaneousPowerCharts.cda",
		dataAccessId : "5",
		chartProperties : {
			"caption": "Products Sold vs Price points",
        "subcaption": "This Week at Harry's SuperMart",
        "yaxisname": "Quantity Sold",
        "xaxisname": "Price(In US $)",
        "xaxismaxvalue": "1000",
        "xaxisminvalue": "100",
        "yaxismaxvalue": "200",
        "xnumberprefix": "$",
        "ynumbersuffix": " units",
        "showcanvasborder": "1",
        "canvasborderthickness": "0.5",
        "canvasborderalpha": "50",
        "showXAxisLine": "0",
        "showformbtn": "1",
        "formAction": "#",
        "submitdataasxml": "1",
        "baseFontColor": "#333333",
        "baseFont": "Helvetica Neue,Arial",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "showBorder": "0",
        "bgColor": "#ffffff",
        "showValues": "0",
        "showShadow": "0",
        "canvasBgColor": "#ffffff",
        "divlineAlpha": "100",
        "divlineColor": "#999999",
        "divlineThickness": "1",
        "divLineDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1",
        "usePlotGradientColor": "0",
        "showplotborder": "0",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "legendBgAlpha": "0",
        "legendBorderAlpha": "0",
        "legendShadow": "0",
        "legendItemFontSize": "10",
        "legendItemFontColor": "#666666",
        "toolTipColor": "#ffffff",
        "toolTipBorderThickness": "0",
        "toolTipBgColor": "#000000",
        "toolTipBgAlpha": "80",
        "toolTipBorderRadius": "2",
        "toolTipPadding": "5"
		},
		dataSetProperties: {
			dataSetCallback: function(data){
				data.drawline = "0";
				data.color = "6BAA01";
				data.anchorbgcolor = "6BAA01";
				data.anchorbordercolor = "6BAA01";
			},
		},
		categoriesProperties:{
			path: "/public/plugin-samples/fusion-charts/Fusion Charts/MiscellaneousPowerCharts.cda",
			dataAccessId: "6",
			categoryCallback: function(data){
				data.showverticalline = "1";
			}
		},
	},

	Waterfall:{
		height       : "300",
		width        : "450",
		chartType    : "waterfall2d",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/MiscellaneousPowerCharts.cda",
		dataAccessId : "7",
		chartProperties : {
			"caption": "Total Profit Calculation",
      "subcaption": "Last month",
      "yAxisname": "Amount (In USD)",
      "numberprefix": "$",
      "connectordashed": "1",
      "sumlabel": "Total {br} Profit",
      "positiveColor": "#6baa01",
      "negativeColor": "#e44a00",
      "paletteColors": "#0075c2,#1aaf5d,#f2c500",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "showBorder": "0",
      "bgColor": "#ffffff",
      "showShadow": "0",
      "canvasBgColor": "#ffffff",
      "canvasBorderAlpha": "0",
      "divlineAlpha": "100",
      "divlineColor": "#999999",
      "divlineThickness": "1",
      "divLineDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1",
      "usePlotGradientColor": "0",
      "showplotborder": "0",
      "showXAxisLine": "1",
      "xAxisLineThickness": "1",
      "xAxisLineColor": "#999999",
      "showAlternateHGridColor": "0"
		},
		dataSetProperties: {
			dataSetCallback: function(data){
				if(data.label === "Total Sales"){
					data.issum = "1";
				};
				if(data.label === "Total Costs"){
					data.issum = "1";
					data.cumulative = "0";
				}
			},
		},
	},

	Kagi:{
		height       : "300",
		width        : "450",
		chartType    : "kagi",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/MiscellaneousPowerCharts.cda",
		dataAccessId : "8",
		chartProperties : {
			"caption": "Stock Price HRYS",
      "subCaption": "Last 20 days",
      "numberPrefix": "$",
      "xAxisName": "Day",
      "yAxisName": "Amount (In USD)",
      "showValues": "0",
      "drawAnchors": "0",
      "labelDisplay": "Rotate",
      "reversalPercentage": "5",
      "showBorder": "0",
      "bgColor": "#ffffff",
      "showCanvasBorder": "0",
      "showXAxisLine": "1",
      "axisLineAlpha": "40",
      "divlineColor": "#999999",
      "divlineThickness": "1",
      "divLineDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1",
      "rallycolor": "#0075c2",
      "declinecolor": "#8e0000",
      "rallythickness": "3",
      "declinethickness": "3",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "showAlternateHGridColor": "0",
      "toolTipColor": "#ffffff",
      "toolTipBorderThickness": "0",
      "toolTipBgColor": "#000000",
      "toolTipBgAlpha": "80",
      "toolTipBorderRadius": "2",
      "toolTipPadding": "5"
		},
	},

	Map:{
		height       : "500",
		width        : "900",
		chartType    : "maps/world",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/Maps.cda",
		dataAccessId : "1",
		markers			 : false,
		chartProperties : {
			"caption": "Global Population",
      "theme": "fint",
      "formatNumberScale": "0",
      "numberSuffix": "M",
      "showLabels": "1",
      "includeNameInLabels": "1",
      "useSNameInLabels": "0"
		},
		colorRangeProperties:{
			path:"/public/plugin-samples/fusion-charts/Fusion Charts/Maps.cda",
			dataAccessId:"2"
		},
	},

	MapWithMarkers:{
		height       : "500",
		width        : "900",
		chartType    : "maps/world",
		path         : "/public/plugin-samples/fusion-charts/Fusion Charts/Maps.cda",
		dataAccessId : "3",
		markers			 : true,
		connectorsDataAccessId: "4",
		chartProperties : {
			"caption": "Busiest Routes from Heathrow Airport",
      "subcaption": "2014",
      "theme": "fint",
      "markerBgColor": "#FF0000",
      "markerRadius": "10",
      "showMarkerLabels": "1",
      "connectorColor": "#0CB2B0",
      "connectorHoverColor": "#339933",
      "entityFillColor": "#CECED2",
      "entityFillHoverColor": "#E5E5E9"
		},
		markersProperties:{
			shapes: [
          {
              "id": "airport",
              "type": "image",
              "url": "http://static.fusioncharts.com/docs/assets/airplane-99047_150.png",
              "xscale": "15",
              "yscale": "15",
              "labelPadding": "15"
          }
      ],
			itemsCallback: function(data){
				data.shapeid = "airport";
			},
			connectorsCallback: function(data){
				data.tooltext = "Total Passengers: "+ data.tooltext;
			}
		},
	},
};
