var MetaLayerCharts= {

	MsCombi2D : {
		height          : "300",
		width           : "450",
		chartType       : "mscombi2d",
		path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
		dataAccessId    : "1",
      		chartProperties: {
      		caption				: "Harry's SuperMart",
                  subCaption				: "Sales analysis of last year",
                  xAxisname				: "Month",
                  yAxisName				: "Amount (In USD)",
                  numberPrefix			: "$",
                  showBorder				: "0",
                  showValues				: "0",
                  paletteColors			: "#0075c2,#1aaf5d,#f2c500",
                  bgColor				: "#ffffff",
                  showCanvasBorder		      : "0",
                  canvasBgColor			: "#ffffff",
                  captionFontSize			: "14",
                  subcaptionFontSize		: "14",
                  subcaptionFontBold		: "0",
                  divlineColor			: "#999999",
                  divLineIsDashed			: "1",
                  divLineDashLen			: "1",
                  divLineGapLen			: "1",
                  showAlternateHGridColor	      : "0",
                  usePlotGradientColor	      : "0",
                  toolTipColor			: "#ffffff",
                  toolTipBorderThickness	      : "0",
                  toolTipBgColor			: "#000000",
                  toolTipBgAlpha			: "80",
                  toolTipBorderRadius		: "2",
                  toolTipPadding			: "5",
                  legendBgColor			: "#ffffff",
                  legendBorderAlpha		      : '0',
                  legendShadow			: '0',
                  legendItemFontSize		: '10',
                  legendItemFontColor		: '#666666'
      	},
		dataSetProperties: {
			dataSetCallback: function(data) {
				if(data.seriesname === "Actual Revenue")
					data.showValues = "1";
				if(data.seriesname === "Projected Revenue")
					data.renderAs = "line";
				if(data.seriesname === "Profit")
					data.renderAs = "area";
			},
		},
		categoriesProperties: {
			path 			: "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
			dataAccessId 	: "2",
		}
	},

	MsCombi3D : {
		height          : "300",
		width           : "450",
		chartType       : "mscombi3d",
		path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
		dataAccessId    : "1",
		chartProperties: {
		caption				: "Harry's SuperMart",
            subCaption				: "Sales analysis of last year",
            xAxisname				: "Month",
            yAxisName				: "Amount (In USD)",
            numberPrefix			: "$",
            showBorder				: "0",
            showValues				: "0",
            paletteColors			: "#0075c2,#1aaf5d,#f2c500",
            bgColor				: "#ffffff",
            showCanvasBorder		      : "0",
            canvasBgColor			: "#ffffff",
            captionFontSize			: "14",
            subcaptionFontSize		: "14",
            subcaptionFontBold		: "0",
            divlineColor			: "#999999",
            divLineIsDashed			: "1",
            divLineDashLen			: "1",
            divLineGapLen			: "1",
            showAlternateHGridColor	      : "0",
            usePlotGradientColor	      : "0",
            toolTipColor			: "#ffffff",
            toolTipBorderThickness	      : "0",
            toolTipBgColor			: "#000000",
            toolTipBgAlpha			: "80",
            toolTipBorderRadius		: "2",
            toolTipPadding			: "5",
            legendBgColor			: "#ffffff",
            legendBorderAlpha		      : '0',
            legendShadow			: '0',
            legendItemFontSize		: '10',
            legendItemFontColor		: '#666666'
		},
		dataSetProperties: {
			dataSetCallback: function(data) {
				if(data.seriesname === "Actual Revenue")
					data.showValues = "1";
				if(data.seriesname ==="Projected Revenue")
					data.renderAs = "line";
				if(data.seriesname === "Profit")
					data.renderAs = "area";
			},
		},
		categoriesProperties: {
			path 			: "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
			dataAccessId 	: "2",
		}
	},

      MsColumnLine3D : {
            height          : "300",
            width           : "450",
            chartType       : "mscolumnline3d",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "4",
            chartProperties: {
                  showvalues              : "0",
                  caption                 : "Cost Analysis",
                  numberprefix            : "$",
                  xaxisname               : "Quarters",
                  yaxisname               : "Cost",
                  showBorder              : "0",
                  paletteColors           : "#0075c2,#1aaf5d,#f2c500",
                  bgColor                 : "#ffffff",
                  canvasBgColor           : "#ffffff",
                  captionFontSize         : "14",
                  subcaptionFontSize      : "14",
                  subcaptionFontBold      : "0",
                  divlineColor            : "#999999",
                  divLineIsDashed         : "1",
                  divLineDashLen          : "1",
                  divLineGapLen           : "1",
                  toolTipColor            : "#ffffff",
                  toolTipBorderThickness  : "0",
                  toolTipBgColor          : "#000000",
                  toolTipBgAlpha          : "80",
                  toolTipBorderRadius     : "2",
                  toolTipPadding          : "5",
                  legendBgColor           : "#ffffff",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  legendItemFontSize      : "10",
                  legendItemFontColor     : "#666666"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Budgeted cost")
                              data.renderAs = "line";
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "3",
            },
      },

      StackedColumn2DLine : {
            height          : "300",
            width           : "450",
            chartType       : "stackedcolumn2dline",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "5",
            chartProperties: {
                  caption                 : "Product-wise quarterly revenue Vs profit in last year",
                  subCaption              : "Harry's SuperMart",
                  xAxisname               : "Quarters",
                  yAxisName               : "Revenue (In USD)",
                  numberPrefix            : "$",
                  paletteColors           : "#0075c2,#1aaf5d,#f2c500",
                  bgColor                 : "#ffffff",
                  borderAlpha             : "20",
                  showCanvasBorder        : "0",
                  usePlotGradientColor    : "0",
                  plotBorderAlpha         : "10",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  legendBgAlpha           : "0",
                  valueFontColor          : "#ffffff",
                  showXAxisLine           : "1",
                  xAxisLineColor          : "#999999",
                  divlineColor            : "#999999",
                  divLineDashed           : "1",
                  showAlternateHGridColor : "0",
                  subcaptionFontBold      : "0",
                  subcaptionFontSize      : "14",
                  showHoverEffect         : "1",
                  showBorder              : "0"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Profit"){
                              data.renderAs = "line";
                              data.showValues = "0";
                        }else data.showvalues = "1";
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "3",
            },
      },

      StackedColumn3DLine : {
            height          : "300",
            width           : "450",
            chartType       : "stackedcolumn3dline",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "5",
            chartProperties: {
                  showvalues              : "1",
                  caption                 : "Cost Analysis",
                  subcaption              : "Last Year",
                  numberprefix            : "$",
                  xaxisname               : "Quarter",
                  yaxisname               : "Cost",
                  paletteColors           : "#0075c2,#1aaf5d,#f2c500",
                  bgColor                 : "#ffffff",
                  borderAlpha             : "20",               
                  showCanvasBorder        : "0",
                  usePlotGradientColor    : "0",
                  plotBorderAlpha         : "10",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  legendBgAlpha           : "0",
                  valueFontColor          : "#ffffff",               
                  showXAxisLine           : "1",
                  xAxisLineColor          : "#999999",
                  divlineColor            : "#999999",               
                  divLineIsDashed         : "1",
                  showAlternateHGridColor : "0",
                  subcaptionFontBold      : "0",
                  subcaptionFontSize      : "14",
                  showHoverEffect         : "1"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Profit"){
                              data.renderAs = "line";
                              data.showValues = "0";
                        }else data.showvalues = "1";
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "3",
            },
      },

      MsCombiDy2D : {
            height          : "300",
            width           : "450",
            chartType       : "mscombidy2d",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "6",
            chartProperties: {
                  caption                 : "Revenues and Profits",
                  subCaption              : "For last year",
                  xAxisname               : "Month",
                  pYAxisName              : "Amount (In USD)",
                  sYAxisName              : "Profit %",
                  numberPrefix            : "$",
                  sNumberSuffix           : "%",
                  sYAxisMaxValue          : "50",
                  paletteColors           : "#0075c2,#1aaf5d,#f2c500",
                  baseFontColor           : "#333333",
                  baseFont                : "Helvetica Neue,Arial",
                  captionFontSize         : "14",
                  subcaptionFontSize      : "14",
                  subcaptionFontBold      : "0",
                  showBorder              : "0",
                  bgColor                 : "#ffffff",
                  showShadow              : "0",
                  canvasBgColor           : "#ffffff",
                  canvasBorderAlpha       : "0",
                  divlineAlpha            : "100",
                  divlineColor            : "#999999",
                  divlineThickness        : "1",
                  divLineIsDashed         : "1",
                  divLineDashLen          : "1",
                  divLineGapLen           : "1",
                  usePlotGradientColor    : "0",
                  showplotborder          : "0",
                  showXAxisLine           : "1",
                  xAxisLineThickness      : "1",
                  xAxisLineColor          : "#999999",
                  showAlternateHGridColor : "0",
                  showAlternateVGridColor : "0",
                  legendBgAlpha           : "0",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  legendItemFontSize      : "10",
                  legendItemFontColor     : "#666666"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Profits"){
                              data.renderAs = "area";
                              data.showValues = "0";
                        }if(data.seriesname === "Profit %"){
                              data.parentYAxis = "S";
                              data.renderAs = "line";
                              data.showValues = "0";
                        }if(data.seriesname === "Revenues") 
                              data.showValues = "1";
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "2",
            },
      },

      MsColumn3DLineDy : {
            height          : "300",
            width           : "450",
            chartType       : "mscolumn3dlinedy",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "7",
            chartProperties: {
                  caption                 : "Product-wise Quarterly Revenue vs. Profit %",
                  subCaption              : "Harry's SuperMart - Last Year",
                  xAxisname               : "Quarter",
                  pYAxisName              : "Sales",
                  sYAxisName              : "Profit %",
                  numberPrefix            : "$",
                  sNumberSuffix           : "%",
                  sYAxisMaxValue          : "25",
                  paletteColors           : "#0075c2,#1aaf5d,#f2c500",
                  bgColor                 : "#ffffff",
                  showBorder              : "0",
                  showCanvasBorder        : "0",
                  usePlotGradientColor    : "0",
                  plotBorderAlpha         : "10",
                  legendBorderAlpha       : "0",
                  legendBgAlpha           : "0",
                  legendShadow            : "0",
                  showHoverEffect         : "1",
                  valueFontColor          : "#ffffff",
                  rotateValues            : "1",
                  placeValuesInside       : "1",
                  divlineColor            : "#999999",
                  divLineDashed           : "1",
                  divLineDashLen          : "1",
                  divLineGapLen           : "1",
                  canvasBgColor           : "#ffffff",
                  captionFontSize         : "14",
                  subcaptionFontSize      : "14",
                  subcaptionFontBold      : "0"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Profit %"){
                              data.renderAs = "line";
                              data.parentYAxis = "S";
                              data.showValues = "0";
                        }else data.showValues = "1";
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "3",
            },
      },

      StackedColumn3DLineDy : {
            height          : "300",
            width           : "450",
            chartType       : "stackedcolumn3dlinedy",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "7",
            chartProperties: {
                  caption                 : "Product-wise Quarterly Revenue vs. Profit %",
                  subCaption              : "Harry's SuperMart - Last Year",
                  xAxisname               : "Quarter",
                  pYAxisName              : "Sales",
                  sYAxisName              : "Profit %",
                  numberPrefix            : "$",
                  sNumberSuffix           : "%",
                  sYAxisMaxValue          : "25",
                  paletteColors           : "#0075c2,#1aaf5d,#f2c500",
                  bgColor                 : "#ffffff",
                  borderAlpha             : "20",               
                  showCanvasBorder        : "0",
                  usePlotGradientColor    : "0",
                  plotBorderAlpha         : "10",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  legendBgAlpha           : "0",
                  valueFontColor          : "#ffffff",               
                  showXAxisLine           : "1",
                  xAxisLineColor          : "#999999",
                  divlineColor            : "#999999",               
                  divLineIsDashed         : "1",
                  showAlternateHGridColor : "0",
                  subcaptionFontBold      : "0",
                  subcaptionFontSize      : "14",
                  showHoverEffect         : "1"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Profit %"){
                              data.renderAs = "line";
                              data.parentYAxis = "S";
                              data.showValues = "0";
                        }else data.showValues = "1";
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "3",
            },
      },

      ScrollCombi2D : {
            height          : "300",
            width           : "450",
            chartType       : "scrollcombi2d",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "9",
            chartProperties: {
                  caption                 : "Actual Revenue, Targeted Revenues & Profits",
                  subCaption              : "FY 2012 - FY 2013",
                  xAxisname               : "Month",
                  yAxisName               : "Amount (In USD)",
                  numberPrefix            : "$",
                  numVisiblePlot          : "12",
                  paletteColors           : "#0075c2,#1aaf5d,#f2c500",
                  baseFontColor           : "#333333",
                  baseFont                : "Helvetica Neue,Arial",
                  captionFontSize         : "14",
                  subcaptionFontSize      : "14",
                  subcaptionFontBold      : "0",
                  showBorder              : "0",
                  bgColor                 : "#ffffff",
                  showShadow              : "0",
                  canvasBgColor           : "#ffffff",
                  canvasBorderAlpha       : "0",
                  showValues              : "0",
                  divlineAlpha            : "100",
                  divlineColor            : "#999999",
                  divlineThickness        : "1",
                  divLineIsDashed         : "1",
                  divLineDashLen          : "1",
                  divLineGapLen           : "1",
                  usePlotGradientColor    : "0",
                  showplotborder          : "0",
                  showXAxisLine           : "1",
                  xAxisLineThickness      : "1",
                  xAxisLineColor          : "#999999",
                  showAlternateHGridColor : "0",
                  showAlternateVGridColor : "0",
                  legendBgAlpha           : "0",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  legendItemFontSize      : "10",
                  legendItemFontColor     : "#666666",
                  scrollheight            : "10",
                  flatScrollBars          : "1",
                  scrollShowButtons       : "0",
                  scrollColor             : "#cccccc",
                  showHoverEffect         : "1",
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Projected Revenue"){
                              data.renderAs = "line";
                              data.showValues = "0";
                        }if(data.seriesname === "Profit"){
                              data.renderAs = "area";
                              data.showValues = "0";
                        }
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "8",
            },
      },

      ScrollCombiDy2D : {
            height          : "300",
            width           : "450",
            chartType       : "scrollcombidy2d",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "10",
            chartProperties: {
                  caption                 : "Revenues and Profits",
                  subCaption              : "(FY 2012 to FY 2013)",
                  captionFontSize         : "14",
                  subcaptionFontSize      : "14",
                  subcaptionFontBold      : "0",
                  xAxisname               : "Month",
                  pYAxisName              : "Amount (In USD)",
                  sYAxisName              : "Profit %",
                  numberPrefix            : "$",
                  sNumberSuffix           : "%",
                  sYAxisMaxValue          : "50",
                  paletteColors           : "#0075c2,#1aaf5d,#f2c500",
                  showAlternateHGridColor : "0",
                  showPlotBorder          : "0",
                  usePlotGradientColor    : "0",
                  baseFontColor           : "#333333",
                  baseFont                : "Helvetica Neue,Arial",
                  showBorder              : "0",
                  bgColor                 : "#ffffff",
                  showShadow              : "0",
                  canvasBgColor           : "#ffffff",
                  showCanvasBorder        : "0",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  showValues              : "1",
                  divlineAlpha            : "100",
                  divlineColor            : "#999999",
                  divlineThickness        : "1",
                  divLineIsDashed         : "1",
                  divLineDashLen          : "1",
                  divLineGapLen           : "1",
                  numVisiblePlot          : "12",
                  flatScrollBars          : "1",
                  scrollheight            : "10"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Profits"){
                              data.renderAs = "area";
                              data.showValues = "0";
                        }if(data.seriesname === "Profit %"){
                              data.renderAs = "line";
                              data.showValues = "0";
                              data.parentYAxis = "S";
                        }
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "8",
            },
      },

      DragColumn2D : {
            height          : "300",
            width           : "450",
            chartType       : "dragcolumn2d",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "11",
            chartProperties: {
                  caption                 : "Inventory status - Bakersfield Central",
                  subCaption              : "Top 5 Food items",
                  xAxisName               : "Food Item",
                  yAxisName               : "No. of Units",
                  paletteColors           : "#0075c2,#1aaf5d",
                  bgColor                 : "#ffffff",
                  showAlternateHGridColor : "0",
                  showBorder              : "0",
                  showCanvasBorder        : "0",
                  baseFontColor           : "#333333",
                  baseFont                : "Helvetica Neue,Arial",
                  captionFontSize         : "14",
                  subcaptionFontSize      : "14",
                  subcaptionFontBold      : "0",
                  usePlotGradientColor    : "0",
                  toolTipColor            : "#ffffff",
                  toolTipBorderThickness  : "0",
                  toolTipBgColor          : "#000000",
                  toolTipBgAlpha          : "80",
                  toolTipBorderRadius     : "2",
                  toolTipPadding          : "5",
                  legendBgAlpha           : "0",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  legendItemFontSize      : "10",
                  legendItemFontColor     : "#666666",
                  legendCaptionFontSize   : "9",
                  divlineAlpha            : "100",
                  divlineColor            : "#999999",
                  divlineThickness        : "1",
                  divLineIsDashed         : "1",
                  divLineDashLen          : "1",
                  divLineGapLen           : "1",
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Available Stock")
                              data.allowDrag = "0";
                        if(data.seriesname === "Estimated Demand")
                              data.dashed = "1";
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "12",
            },
      },

      DragLine : {
            height          : "300",
            width           : "450",
            chartType       : "dragline",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "13",
            chartProperties: {
                  caption                 : "Quarterly Sales Projections",
                  subCaption              : "iPhone vs Samsung Galaxy",
                  xAxisName               : "Quarter",
                  yAxisName               : "No. of Units",
                  paletteColors           : "#0075c2,#1aaf5d",
                  showalternatehgridcolor : "0",
                  bgAlpha                 : "0",
                  borderAlpha             : "20",
                  usePlotGradientColor    : "0",
                  canvasBorderAlpha       : "0",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  showXAxisLine           : "1",
                  axisLineAlpha           : "25",
                  divLineAlpha            : "25",
                  showBorder              : "0"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Apple"){
                              data.valuePosition = "ABOVE";
                              data.allowDrag = "0";
                              for(i = 0; i < data.data.length; i++){
                                    if(data.data[i].value ===  1500)
                                          data.data[i].dashed = "1";
                                    if(data.data[i].value ===  1300){
                                          data.data[i].dashed = "1";
                                          data.data[i].allowDrag = "1";
                                    }if(data.data[i].value ===  900){
                                          data.data[i].allowDrag = "1";
                                          data.data[i].tooltext = "Predicted sales $value units";
                                    }
                              }
                        }if(data.seriesname === "Samsung"){
                              data.allowDrag = "0";
                              for(i = 0; i < data.data.length; i++){
                                    if(data.data[i].value ===  850)
                                          data.data[i].dashed = "1";
                                    if(data.data[i].value ===  1000){
                                          data.data[i].dashed = "1";
                                          data.data[i].allowDrag = "1";
                                    }if(data.data[i].value ===  1200){
                                          data.data[i].allowDrag = "1";
                                          data.data[i].tooltext = "Predicted sales $value units";
                                    }
                              }
                        }
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "14",
            },
      },

      DragArea : {
            height          : "300",
            width           : "450",
            chartType       : "dragarea",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "13",
            chartProperties: {
                  caption                 : "Quarterly Sales Projections",
                  subCaption              : "iPhone vs Samsung Galaxy",
                  xAxisName               : "Quarter",
                  yAxisName               : "No. of Units",
                  paletteColors           : "#0075c2,#1aaf5d",
                  showalternatehgridcolor : "0",
                  bgAlpha                 : "0",
                  borderAlpha             : "20",
                  usePlotGradientColor    : "0",
                  canvasBorderAlpha       : "0",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  showXAxisLine           : "1",
                  axisLineAlpha           : "25",
                  divLineAlpha            : "25",
                  showBorder              : "0"
            },
            dataSetProperties: {
                  dataSetCallback: function(data) {
                        if(data.seriesname === "Apple"){
                              data.valuePosition = "ABOVE";
                              data.allowDrag = "0";
                              for(i = 0; i < data.data.length; i++){
                                    if(data.data[i].value ===  1500)
                                          data.data[i].dashed = "1";
                                    if(data.data[i].value ===  1300){
                                          data.data[i].dashed = "1";
                                          data.data[i].allowDrag = "1";
                                    }if(data.data[i].value ===  900){
                                          data.data[i].allowDrag = "1";
                                          data.data[i].tooltext = "Predicted sales $value units";
                                    }
                              }
                        }if(data.seriesname === "Samsung"){
                              data.allowDrag = "0";
                              for(i = 0; i < data.data.length; i++){
                                    if(data.data[i].value ===  850)
                                          data.data[i].dashed = "1";
                                    if(data.data[i].value ===  1000){
                                          data.data[i].dashed = "1";
                                          data.data[i].allowDrag = "1";
                                    }if(data.data[i].value ===  1200){
                                          data.data[i].allowDrag = "1";
                                          data.data[i].tooltext = "Predicted sales $value units";
                                    }
                              }
                        }
                  },
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "14",
            },
      },

      Radar : {
            height          : "300",
            width           : "450",
            chartType       : "radar",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "15",
            chartProperties: {
                  caption              : "Budget analysis",
                  subCaption           : "Current month",
                  captionFontSize      : "14",
                  subcaptionFontSize   : "14",
                  numberPrefix         : "$",
                  baseFontColor        : "#333333",
                  baseFont             : "Helvetica Neue,Arial",
                  subcaptionFontBold   : "0",
                  paletteColors        : "#008ee4,#6baa01",
                  bgColor              : "#ffffff",
                  radarfillcolor       : "#ffffff",
                  showBorder           : "0",
                  showShadow           : "0",
                  showCanvasBorder     : "0",
                  legendBorderAlpha    : "0",
                  legendShadow         : "0",
                  divLineAlpha         : "10",
                  usePlotGradientColor : "0",
                  numberPreffix        : "$",
                  legendBorderAlpha    : "0",
                  legendShadow         : "0"
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "16",
            },
      },

      MsStepLine : {
            height          : "300",
            width           : "450",
            chartType       : "msstepLine",
            path            : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
            dataAccessId    : "17",
            chartProperties: {
                  caption                 : "Revenue Vs Expense",
                  subCaption              : "Last year",
                  captionFontSize         : "14",
                  subcaptionFontSize      : "14",
                  subcaptionFontBold      : "0",
                  baseFontColor           : "#333333",
                  baseFont                : "Helvetica Neue,Arial",
                  xaxisname               : "Month",
                  yaxisname               : "Amount (In USD)",
                  usePlotGradientColor    : "0",
                  bgColor                 : "#ffffff",
                  palettecolors           : "#6baa01, #d35400",
                  showBorder              : "0",
                  showPlotBorder          : "0",
                  showValues              : "0",
                  showShadow              : "0",
                  showAlternateHGridColor : "0",
                  showCanvasBorder        : "0",
                  showXAxisLine           : "1",
                  numberprefix            : "$",
                  drawverticaljoints      : "1",
                  useforwardsteps         : "0",
                  xAxisLineThickness      : "1",
                  xAxisLineColor          : "#999999",
                  canvasBgColor           : "#ffffff",
                  divlineAlpha            : "100",
                  divlineColor            : "#999999",
                  divlineThickness        : "1",
                  divLineIsDashed         : "1",
                  divLineDashLen          : "1",
                  divLineGapLen           : "1",
                  legendBorderAlpha       : "0",
                  legendShadow            : "0",
                  toolTipColor            : "#ffffff",
                  toolTipBorderThickness  : "0",
                  toolTipBgColor          : "#000000",
                  toolTipBgAlpha          : "80",
                  toolTipBorderRadius     : "2",
                  toolTipPadding          : "5"
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/SeriesColumn/seriesColumn.cda",
                  dataAccessId      : "2",
            },
            dataSetProperties: {
                  dataSetCallback: function(data){
                        if(data.seriesname === "Revenue"){
                              data.linethickness = "3";
                              data.anchorradius = "3";
                        }if(data.seriesname === "Expense"){
                              data.linethickness = "3";
                              data.anchorradius = "3";
                        }
                  }
            }
      },

};
