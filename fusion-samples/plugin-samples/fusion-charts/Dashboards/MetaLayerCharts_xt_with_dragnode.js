var MetaLayerCharts_xt_with_dragnode = {
	LineChart: {
		height          : "200",
		width           : "900",
		chartType       : "Line",
		cdaPath         : "/public/plugin-samples/fusion-charts/Fusion Charts/LineChart.cda",
		cdaDataAccessId : "2",
		chartTitle      : "Sales Per year",
		xAxisName       : "Years",
		yAxisName       : "Sales",
		free            : "false",
		seriesColor: "007878;0A9B9B;29AAAA",
		bgColor 		: "ffffff",
		borderColor		: "ffffff",
	},

	PieChart2D: {
		height          : "200",
		width           : "500",
		chartType       : "Pie2D",
		cdaPath         : "/public/plugin-samples/fusion-charts/Fusion Charts/PieChart2D.cda",
		cdaDataAccessId : "2",
		chartTitle      : "Sales Per year",
		seriesColor: "007878;0A9B9B;29AAAA",
		xAxisName       : "Years",
		yAxisName       : "Sales",
		free            : "false",
		bgColor 		: "ffffff",
		borderColor		: "ffffff",
		pieRadius		: "70",
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
			//theme: "custom",
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
		trendlinesProperties:{
			path:"/public/plugin-samples/fusion-charts/Fusion Charts/DragNodeChart.cda",
			dataAccessId: "2",
			vertical:"1",
			lineCallback: function(data){
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
};
