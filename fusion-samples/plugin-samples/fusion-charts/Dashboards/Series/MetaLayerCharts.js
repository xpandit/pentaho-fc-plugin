var MetaLayerCharts = {

  MsColumn2D: {
    height: "300",
    width: "450",
    chartType: "mscolumn2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "1",
    chartProperties: {
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
      divLineIsDashed: "1",
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
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    },
    trendlinesProperties: {
      trendlines: [{
        line: [{
            startvalue: "12250",
            color: "#0075c2",
            displayvalue: "Previous{br}Average",
            valueOnRight: "1",
            thickness: "1",
            showBelow: "1",
            tooltext: "Previous year quarterly target  : $13.5K"
          },
          {
            startvalue: "25950",
            color: "#1aaf5d",
            displayvalue: "Current{br}Average",
            valueOnRight: "1",
            thickness: "1",
            showBelow: "1",
            tooltext: "Current year quarterly target  : $23K"
          }
        ]
      }]
    }
  },

  MsColumn3D: {
    height: "300",
    width: "450",
    chartType: "mscolumn3d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "1",
    chartProperties: {
      caption: "Harry's SuperMart",
      subCaption: "Sales by quarter",
      xAxisName: "Quarter",
      yAxisName: "Sales (In USD)",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d,#f2c500",
      bgColor: "#ffffff",
      showBorder: "0",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      plotBorderAlpha: "10",
      legendBorderAlpha: "0",
      legendBgAlpha: "0",
      legendShadow: "0",
      showHoverEffect: "1",
      valueFontColor: "#ffffff",
      rotateValues: "1",
      placeValuesInside: "1",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      canvasBgColor: "#ffffff",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    }
  },

  MsLine: {
    height: "300",
    width: "450",
    chartType: "msline",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "3",
    chartProperties: {
      caption: "Number of visitors last week",
      subCaption: "Bakersfield Central vs Los Angeles Topanga",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      paletteColors: "#0075c2,#1aaf5d",
      bgcolor: "#ffffff",
      showBorder: "0",
      showShadow: "0",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      legendBorderAlpha: "0",
      legendShadow: "0",
      showAxisLines: "0",
      showAlternateHGridColor: "0",
      divlineThickness: "1",
      divLineDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      xAxisName: "Day",
      showValues: "0"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "4",
      categoryCallback: function(data) {
        if (data.label === "National holiday") {
          data.vline = "true";
          data.lineposition = "0";
          data.color = "6BAA01";
          data.labelHAlign = "center";
          data.labelPosition = "0";
          data.dashed = "1";
        }
      },
    },
    trendlinesProperties: {
      "trendlines": [{
        line: [{
          startvalue: "17022",
          color: "#6baa01",
          valueOnRight: "1",
          displayvalue: "Average"
        }]
      }]
    }
  },

  MsBar2D: {
    height: "300",
    width: "450",
    chartType: "msbar2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "5",
    chartProperties: {
      caption: "Harry's SuperMart",
      subCaption: "Sales by quarter",
      xAxisName: "Quarter",
      yAxisName: "Sales (In USD)",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d,#f2c500",
      bgColor: "#ffffff",
      showBorder: "0",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      plotBorderAlpha: "10",
      legendBorderAlpha: "0",
      legendBgAlpha: "0",
      legendShadow: "0",
      showHoverEffect: "1",
      valueFontColor: "#ffffff",
      rotateValues: "1",
      placeValuesInside: "1",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      canvasBgColor: "#ffffff",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "6",
    },
    trendlinesProperties: {
      "trendlines": [{
        line: [{
            startvalue: "15000",
            color: "#0075c2",
            valueOnRight: "1",
            displayvalue: "Avg. for{br}Food"
          },
          {
            startvalue: "22000",
            color: "#1aaf5d",
            valueOnRight: "1",
            displayvalue: "Avg. for{br}Non-food"
          }
        ]
      }]
    }
  },

  MsBar3D: {
    height: "300",
    width: "450",
    chartType: "msbar3d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "5",
    chartProperties: {
      caption: "Split of Sales by Product Category",
      subCaption: "In top 5 stores last month",
      yAxisname: "Sales (In USD)",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      legendBorderAlpha: "0",
      legendBgAlpha: "0",
      legendShadow: "0",
      placevaluesInside: "1",
      valueFontColor: "#ffffff",
      alignCaptionWithCanvas: "1",
      showHoverEffect: "1",
      canvasBgColor: "#ffffff",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      showAlternateHGridColor: "0",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "6",
    }
  },

  MsArea: {
    height: "300",
    width: "450",
    chartType: "msarea",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "7",
    chartProperties: {
      caption: "Sales of Liquor",
      subCaption: "Previous week vs current week",
      xAxisName: "Day",
      yAxisName: "Sales (In USD)",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      showBorder: "0",
      showCanvasBorder: "0",
      plotBorderAlpha: "10",
      usePlotGradientColor: "0",
      legendBorderAlpha: "0",
      legendShadow: "0",
      plotFillAlpha: "60",
      showXAxisLine: "1",
      axisLineAlpha: "25",
      showValues: "0",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      showAlternateHGridColor: "0",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5",
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "8",
    }
  },

  Marimekko: {
    height: "300",
    width: "450",
    chartType: "marimekko",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "9",
    chartProperties: {
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
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "10",
    }
  },

  ZoomLine: {
    height: "300",
    width: "450",
    chartType: "zoomline",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "11",
    chartProperties: {
      caption: "Unique Website Visitors",
      subcaption: "Last year",
      yaxisname: "Unique Visitors",
      xaxisname: "Date",
      yaxisminValue: "800",
      lineThickness: "1",
      anchorMinRenderDistance: "15",
      theme: "fint"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "12",
    }
  },

  StackedColumn2D: {
    height: "300",
    width: "450",
    chartType: "stackedcolumn2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "5",
    chartProperties: {
      caption: "Product-wise quarterly revenue in current year",
      subCaption: "Harry's SuperMart",
      xAxisname: "Quarter",
      yAxisName: "Revenue (In USD)",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      borderAlpha: "20",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      plotBorderAlpha: "10",
      legendBorderAlpha: "0",
      legendShadow: "0",
      valueFontColor: "#ffffff",
      showXAxisLine: "1",
      xAxisLineColor: "#999999",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      showAlternateHGridColor: "0",
      subcaptionFontBold: "0",
      subcaptionFontSize: "14",
      showHoverEffect: "1",
      showBorder: "0",
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    }
  },


  StackedColumn3D: {
    height: "300",
    width: "450",
    chartType: "stackedcolumn3d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "5",
    chartProperties: {
      caption: "Product-wise quarterly revenue in current year",
      subCaption: "Harry's SuperMart",
      xAxisname: "Quarter",
      yAxisName: "Revenue (In USD)",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      borderAlpha: "20",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      plotBorderAlpha: "10",
      legendBorderAlpha: "0",
      legendShadow: "0",
      valueFontColor: "#ffffff",
      showXAxisLine: "1",
      xAxisLineColor: "#999999",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      showAlternateHGridColor: "0",
      subcaptionFontBold: "0",
      subcaptionFontSize: "14",
      showHoverEffect: "1",
      showBorder: "0",
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    }
  },

  StackedBar2D: {
    height: "300",
    width: "450",
    chartType: "stackedbar2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "5",
    chartProperties: {
      caption: "Product-wise quarterly revenue in current year",
      subCaption: "Harry's SuperMart",
      xAxisname: "Quarter",
      yAxisName: "Revenue (In USD)",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      borderAlpha: "20",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      plotBorderAlpha: "10",
      legendBorderAlpha: "0",
      legendShadow: "0",
      valueFontColor: "#ffffff",
      showXAxisLine: "1",
      xAxisLineColor: "#999999",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      showAlternateHGridColor: "0",
      subcaptionFontBold: "0",
      subcaptionFontSize: "14",
      showHoverEffect: "1",
      showBorder: "0",
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    }
  },

  StackedBar3D: {
    height: "300",
    width: "450",
    chartType: "stackedbar3d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "5",
    chartProperties: {
      caption: "Product-wise quarterly revenue in current year",
      subCaption: "Harry's SuperMart",
      xAxisname: "Quarter",
      yAxisName: "Revenue (In USD)",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      borderAlpha: "20",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      plotBorderAlpha: "10",
      legendBorderAlpha: "0",
      legendShadow: "0",
      valueFontColor: "#ffffff",
      showXAxisLine: "1",
      xAxisLineColor: "#999999",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      showAlternateHGridColor: "0",
      subcaptionFontBold: "0",
      subcaptionFontSize: "14",
      showHoverEffect: "1",
      showBorder: "0",
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    }
  },

  StackedArea2D: {
    height: "300",
    width: "450",
    chartType: "stackedarea2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "5",
    chartProperties: {
      caption: "Harry's SuperMart",
      subCaption: "Product-wise quarterly revenue in current year",
      xAxisname: "Quarter",
      yAxisName: "Amount",
      numberPrefix: "$",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      borderAlpha: "20",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      plotBorderAlpha: "10",
      plotFillAlpha: "50",
      legendBorderAlpha: "0",
      legendShadow: "0",
      showValues: "0",
      showBorder: "0",
      showXAxisLine: "1",
      xAxisLineColor: "#999999",
      divlineColor: "#999999",
      divLineDashed: "1",
      showAlternateHGridColor: "0",
      subcaptionFontBold: "0",
      subcaptionFontSize: "14"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    }
  },

  Scatter: {
    height: "300",
    width: "450",
    chartType: "scatter",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "13",
    chartProperties: {
      caption: "Sales of Beer & Ice-cream vs Temperature",
      subCaption: "Los Angeles Topanga",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      xAxisName: "Average Day Temperature",
      yAxisName: "Sales (In USD)",
      xAxisMinValue: "23",
      xAxisMaxValue: "95",
      yNumberPrefix: "$",
      xNumberSuffix: "&deg; F",
      showBorder: "0",
      paletteColors: "#0075c2,#1aaf5d,#f2c500",
      bgcolor: "#ffffff",
      canvasBgColor: "#ffffff",
      showShadow: "0",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      legendBorderAlpha: "0",
      legendShadow: "0",
      showAxisLines: "1",
      showAlternateHGridColor: "0",
      showAlternateVGridColor: "0",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      showValues: "0",
      use3dlighting: "0",
      showYAxisLine: "1",
      yAxisLineThickness: "1",
      yAxisLineColor: "#999999"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "14",
      verticalLineDashed: "1",
      verticalLineDashLen: "1",
      verticalLineDashGap: "1",
      verticalLineThickness: "1",
      verticalLineColor: "#000000",
    },
    dataSetProperties: {
      dataSetCallback: function(data) {
        if (data.seriesname === "Ice Cream") {
          data.showregressionline = "1";
        };
        if (data.seriesname === "Beer") {
          data.showregressionline = "1";
        };
      },
    }
  },

  Bubble: {
    height: "300",
    width: "450",
    chartType: "bubble",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "15",
    chartProperties: {
      caption: "Sales Analysis of Shoe Brands",
      subcaption: "Last Quarter",
      xAxisMinValue: "0",
      xAxisMaxValue: "100",
      yAxisMinValue: "0",
      yAxisMaxValue: "30000",
      plotFillAlpha: "70",
      plotFillHoverColor: "#6baa01",
      showPlotBorder: "0",
      xAxisName: "Average Price",
      yAxisName: "Units Sold",
      numDivlines: "2",
      showValues: "1",
      showTrendlineLabels: "0",
      plotTooltext: "$name : Profit Contribution - $zvalue%",
      drawQuadrant: "1",
      quadrantLineAlpha: "80",
      quadrantLineThickness: "3",
      quadrantXVal: "50",
      quadrantYVal: "15000",
      //Quadrant Labels
      quadrantLabelTL: "Low Price / High Sale",
      quadrantLabelTR: "High Price / High Sale",
      quadrantLabelBL: "Low Price / Low Sale",
      quadrantLabelBR: "High Price / Low Sale",

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
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      use3dlighting: "0",
      showplotborder: "0",
      showYAxisLine: "1",
      yAxisLineThickness: "1",
      yAxisLineColor: "#999999",
      showXAxisLine: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      showAlternateHGridColor: "0",
      showAlternateVGridColor: "0",
      showLegend: "0"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "16"
    },
    dataSetProperties: {
      dataSetCallback: function(data) {
        data.color = "00aee4";
      },
    },
    vtrendlinesProperties: {
      vtrendlines: [{
        line: [{
          startValue: "44",
          isTrendZone: "0",
          color: "#0066cc",
          thickness: "1",
          dashed: "1",
          displayValue: "Gross Avg."
        }],
      }]
    },
    trendlinesProperties: {
      trendlines: [{
        line: [{
            startValue: "20000",
            endValue: "30000",
            isTrendZone: "1",
            color: "#aaaaaa",
            alpha: "14"
          },
          {
            startValue: "10000",
            endValue: "20000",
            isTrendZone: "1",
            color: "#aaaaaa",
            alpha: "7"
          }
        ],
      }]
    }
  },

  ScrollStackedColumn2D: {
    height: "300",
    width: "450",
    chartType: "scrollstackedcolumn2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "17",
    chartProperties: {
      caption: "Sales Comparison",
      subCaption: "(FY 2012 to FY 2013)",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      xaxisname: "Month",
      yaxisname: "Revenue",
      showvalues: "0",
      numberprefix: "$",
      legendBgAlpha: "0",
      legendBorderAlpha: "0",
      legendShadow: "0",
      showborder: "0",
      bgcolor: "#ffffff",
      showalternatehgridcolor: "0",
      showplotborder: "0",
      showcanvasborder: "0",
      legendshadow: "0",
      plotgradientcolor: "",
      showCanvasBorder: "0",
      showAxisLines: "0",
      showAlternateHGridColor: "0",
      divlineAlpha: "100",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      lineThickness: "3",
      flatScrollBars: "1",
      scrollheight: "10",
      numVisiblePlot: "12",
      showHoverEffect: "1"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "18",
    },
    dataSetProperties: {
      dataSetCallback: function(data) {
        if (data.seriesname === "Products") {
          data.color = "008ee4";
        };
        if (data.seriesname === "Services") {
          data.color = "f8bd19";
        };
      },
    }
  },

  RealTimeArea: {
    height: "300",
    width: "450",
    chartType: "realtimearea",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "19",
    cdaRefreshInterval: "5",
    chartProperties: {
      caption: "Real-time stock price monitor",
      subCaption: "Harry's SuperMart",
      xAxisName: "Time",
      yAxisName: "Stock Price",
      numberPrefix: "$",
      yaxisminvalue: "35",
      yaxismaxvalue: "36",
      numdisplaysets: "10",
      labeldisplay: "rotate",
      showValues: "0",
      showRealTimeValue: "0",
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
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      usePlotGradientColor: "0",
      showplotborder: "0",
      showXAxisLine: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      showAlternateHGridColor: "0",
      showLegend: "0"
    },
    categoriesProperties: {
      categories: [{
        "category": [{
          "label": "Day Start"
        }]
      }]
    },
  },

  RealTimeColumn: {
    height: "300",
    width: "450",
    chartType: "realtimecolumn",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "19",
    cdaRefreshInterval: "5",
    chartProperties: {
      caption: "Real-time stock price monitor",
      subCaption: "Harry's SuperMart",
      xAxisName: "Time",
      yAxisName: "Stock Price",
      numberPrefix: "$",
      yaxisminvalue: "35",
      yaxismaxvalue: "36",
      numdisplaysets: "10",
      labeldisplay: "rotate",
      showValues: "0",
      showRealTimeValue: "0",
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
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      usePlotGradientColor: "0",
      showplotborder: "0",
      showXAxisLine: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      showAlternateHGridColor: "0",
      showLegend: "0"
    },
    categoriesProperties: {
      categories: [{
        "category": [{
          "label": "Day Start"
        }]
      }]
    }
  },

  RealTimeLine: {
    height: "300",
    width: "450",
    chartType: "realtimeline",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "19",
    cdaRefreshInterval: "5",
    chartProperties: {
      caption: "Real-time stock price monitor",
      subCaption: "Harry's SuperMart",
      xAxisName: "Time",
      yAxisName: "Stock Price",
      numberPrefix: "$",
      yaxisminvalue: "35",
      yaxismaxvalue: "36",
      numdisplaysets: "10",
      labeldisplay: "rotate",
      showValues: "0",
      showRealTimeValue: "0",
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
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      usePlotGradientColor: "0",
      showplotborder: "0",
      showXAxisLine: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      showAlternateHGridColor: "0",
      showLegend: "0"
    },
    categoriesProperties: {
      categories: [{
        "category": [{
          "label": "Day Start"
        }]
      }]
    }
  },

  RealTimeStackedArea: {
    height: "300",
    width: "450",
    chartType: "realtimestackedarea",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "20",
    cdaRefreshInterval: "5",
    chartProperties: {
      caption: "Live Visitors on Site",
      subCaption: "Updated every 5 seconds",
      xAxisName: "Time",
      yAxisName: "No. of visitors",
      numberSuffix: "s",
      yaxisminvalue: "0",
      yaxismaxvalue: "60",
      numdisplaysets: "10",
      labeldisplay: "rotate",
      showValues: "0",
      showRealTimeValue: "0",
      paletteColors: "#0075c2,#1aaf5d",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      showBorder: "0",
      bgColor: "#ffffff",
      showShadow: "0",
      usePlotGradientColor: "0",
      showPlotBorder: "0",
      canvasBgColor: "#ffffff",
      canvasBorderAlpha: "0",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
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
    categoriesProperties: {
      categories: [{
        "category": [{
          "label": "Day Start"
        }]
      }]
    }
  },

  RealTimeStackedColumn: {
    height: "300",
    width: "450",
    chartType: "realtimestackedcolumn",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "20",
    cdaRefreshInterval: "5",
    chartProperties: {
      caption: "Live Visitors on Site",
      subCaption: "Updated every 5 seconds",
      xAxisName: "Time",
      yAxisName: "No. of visitors",
      numberSuffix: "s",
      yaxisminvalue: "0",
      yaxismaxvalue: "60",
      numdisplaysets: "10",
      labeldisplay: "rotate",
      showValues: "1",
      valueFontColor: "#ffffff",
      showRealTimeValue: "0",
      paletteColors: "#0075c2,#1aaf5d",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      showBorder: "0",
      bgColor: "#ffffff",
      showShadow: "0",
      usePlotGradientColor: "0",
      showPlotBorder: "0",
      canvasBgColor: "#ffffff",
      canvasBorderAlpha: "0",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
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
    categoriesProperties: {
      categories: [{
        "category": [{
          "label": "Day Start"
        }]
      }]
    }
  },

  RealTimeLineDy: {
    height: "300",
    width: "450",
    chartType: "realtimelinedy",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "20",
    cdaRefreshInterval: "5",
    chartProperties: {
      caption: "Live Visitors on Site",
      subCaption: "Updated every 5 seconds",
      xAxisName: "Time",
      yAxisName: "No. of visitors",
      numberSuffix: "s",
      yaxisminvalue: "0",
      yaxismaxvalue: "60",
      numdisplaysets: "10",
      labeldisplay: "rotate",
      showValues: "0",
      showRealTimeValue: "0",
      paletteColors: "#0075c2,#1aaf5d",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      showBorder: "0",
      bgColor: "#ffffff",
      showShadow: "0",
      usePlotGradientColor: "0",
      showPlotBorder: "0",
      canvasBgColor: "#ffffff",
      canvasBorderAlpha: "0",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
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
    categoriesProperties: {
      categories: [{
        "category": [{
          "label": "Day Start"
        }]
      }]
    }
  },

  LogMsColumn2D: {
    height: "300",
    width: "450",
    chartType: "logmscolumn2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "21",
    chartProperties: {
      caption: "Store footfall vs Online visitors ",
      subCaption: "Last Year",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      xAxisName: "Quarter",
      yAxisName: "No of visitors",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      showBorder: "0",
      showCanvasBorder: "0",
      showPlotBorder: "0",
      showAlternateHgridColor: "0",
      showXAxisLine: "1",
      usePlotGradientcolor: "0",
      valueFontColor: "#ffffff",
      placeValuesInside: "1",
      rotateValues: "1",
      LegendShadow: "0",
      legendBorderAlpha: "0",
      base: "10",
      axisLineAlpha: "10",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    }
  },

  LogMsLine: {
    height: "300",
    width: "450",
    chartType: "logmsline",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "21",
    chartProperties: {
      caption: "Store footfall vs Online visitors ",
      subCaption: "Last Year",
      xAxisName: "Quarter",
      yAxisName: "USD",
      paletteColors: "#008ee4,#6baa01,#e44a00",
      bgAlpha: "0",
      borderAlpha: "20",
      canvasBorderAlpha: "0",
      LegendShadow: "0",
      legendBorderAlpha: "0",
      showXAxisLine: "1",
      showValues: "0",
      showBorder: "0",
      showAlternateHgridColor: "0",
      base: "10",
      numberprefix: "$",
      axisLineAlpha: "10",
      divLineAlpha: "10",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "2",
    }
  },

  MsSpline: {
    height: "300",
    width: "450",
    chartType: "msspline",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "3",
    chartProperties: {
      caption: "Number of visitors last week",
      subCaption: "Bakersfield Central vs Los Angeles Topanga",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      subcaptionFontBold: "0",
      xAxisName: "Day",
      yAxisName: "No. of Visitor",
      showValues: "0",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      showBorder: "0",
      showShadow: "0",
      showAlternateHGridColor: "0",
      showCanvasBorder: "0",
      showXAxisLine: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      canvasBgColor: "#ffffff",
      legendBorderAlpha: "0",
      legendShadow: "0",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "4",
      categoryCallback: function(data) {
        if (data.label === "National holiday") {
          data.vline = "true";
          data.lineposition = "0";
          data.color = "6BAA01";
          data.labelHAlign = "right";
          data.labelPosition = "0";
        }
      },
    }
  },

  MsSplineArea: {
    height: "300",
    width: "450",
    chartType: "mssplinearea",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "3",
    chartProperties: {
      caption: "Number of Footfalls Last Week",
      subCaption: "Garden Groove harbour vs Crompton-Rancho Dom",
      xAxisName: "Day",
      yAxisName: "No. of Footfalls",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      subcaptionFontBold: "0",
      paletteColors: "#6baa01,#008ee4",
      usePlotGradientColor: "0",
      bgColor: "#ffffff",
      showBorder: "0",
      showPlotBorder: "0",
      showValues: "0",
      showShadow: "0",
      showAlternateHGridColor: "0",
      showCanvasBorder: "0",
      showXAxisLine: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      canvasBgColor: "#ffffff",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      legendBorderAlpha: "0",
      legendShadow: "0",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "4",
      categoryCallback: function(data) {
        if (data.label === "National holiday") {
          data.vline = "true";
          data.lineposition = "0";
          data.color = "6BAA01";
          data.labelHAlign = "right";
          data.labelPosition = "0";
        }
      },
    }
  },

  ErrorBar2D: {
    height: "300",
    width: "450",
    chartType: "errorbar2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "22",
    chartProperties: {
      caption: "Machinery lifespan range",
      subcaption: "Means & standard deviations",
      xAxisName: "Systems",
      yAxisName: "Life Span",
      numberSuffix: " Years",
      halfErrorBar: "0",
      paletteColors: "#0075c2,#1aaf5d,#f2c500",
      showValues: "0",
      errorBarColor: "666666",
      bgColor: "#ffffff",
      showBorder: "0",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",
      showXAxisLine: "1",
      axisLineAlpha: "25",
      legendBorderAlpha: "0",
      legendShadow: "0",
      legendBgAlpha: "0",
      showShadow: "0",
      showAlternateHgridColor: "0",
      showHoverEffect: "1"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "23"
    }
  },

  ErrorLine: {
    height: "300",
    width: "450",
    chartType: "errorline",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "24",
    chartProperties: {
      caption: "Revenues and Profits",
      subCaption: "Predicted for next year",
      xAxisname: "Month",
      yAxisName: "Amount (In USD)",
      numberPrefix: "$",
      halferrorbar: "0",
      plotTooltext: "<div id='nameDiv' style='font-size: 14px; border-bottom: 1px dashed #999999; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block;'>$label :</div>{br}$seriesName : <b>$dataValue</b>{br}Deviation : <b>± $errorDataValue</b>",
      paletteColors: "#0075c2,#1aaf5d,#f2c500",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      showBorder: "0",
      bgColor: "#ffffff",
      showValues: "0",
      showShadow: "0",
      canvasBgColor: "#ffffff",
      canvasBorderAlpha: "0",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      usePlotGradientColor: "0",
      showplotborder: "0",
      showXAxisLine: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      showAlternateHGridColor: "0",
      showAlternateVGridColor: "0",
      legendBgAlpha: "0",
      legendBorderAlpha: "0",
      legendShadow: "0",
      legendItemFontSize: "10",
      legendItemFontColor: "#666666",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "25"
    },
    dataSetProperties: {
      dataSetCallback: function(data) {
        if (data.seriesname === "Revenues") {
          data.dashed = "1";
          data.dashlen = "2";
          data.dashGap = "2";
        };
        if (data.seriesname === "Profits") {
          data.dashed = "1";
          data.dashlen = "2";
          data.dashGap = "2";
        };
      }
    }
  },

  ErrorScatter: {
    height: "300",
    width: "450",
    chartType: "errorscatter",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "26",
    chartProperties: {
      xaxisname: "Month",
      yaxisname: "Revenue (In USD)",
      caption: "Revenue forecast",
      subcaption: "For Next Year",
      halfverticalerrorbar: "0",
      showlegend: "0",
      bgColor: "#ffffff",
      showBorder: "0",
      numberPrefix: "$",
      showCanvasBorder: "0",
      showAlternateHGridColor: "0",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "27"
    },
    dataSetProperties: {
      dataSetCallback: function(data) {
        data.color = "";
        data.anchorradius = "8";
        data.anchorbgcolor = "1aaf5d";
      },
    }
  },

  InverseArea: {
    height: "300",
    width: "450",
    chartType: "inversemsarea",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "28",
    chartProperties: {
      caption: "Daily bounce rate",
      subCaption: "Last week",
      xAxisName: "Day",
      yAxisName: "Percentage",
      numberSuffix: "%",
      showBorder: "0",
      paletteColors: "#0075c2,#1aaf5d",
      bgColor: "#ffffff",
      usePlotGradientColor: "0",
      plotFillAlpha: "50",
      showCanvasBorder: "0",
      LegendShadow: "0",
      legendBorderAlpha: "0",
      showXAxisLine: "1",
      axisLineAlpha: "40",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      showAlternateHgridColor: "0",
      showValues: "0",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5",
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "8"
    }
  },

  InverseMsColumn2D: {
    height: "300",
    width: "450",
    chartType: "inversemscolumn2d",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "29",
    chartProperties: {
      caption: "Average Page Load Time (hsm.com)",
      subCaption: "Last Week",
      showBorder: "0",
      xAxisName: "Day",
      yAxisName: "Time (In Sec)",
      numberSuffix: "s",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      paletteColors: "#0075c2",
      bgColor: "#ffffff",
      canvasBgColor: "#ffffff",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      showBorder: "0",
      showPlotBorder: "0",
      showXAxisLine: "1",
      showLegend: "0",
      showShadow: "0",
      showCanvasBorder: "0",
      showAlternateHGridColor: "0",
      usePlotGradientColor: "0",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "8"
    },
    dataSetProperties: {
      dataSetCallback: function(data) {
        data.allowDrag = "0";
      }
    }
  },

  InverseMsLine: {
    height: "300",
    width: "450",
    chartType: "inversemsline",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "29",
    chartProperties: {
      caption: "Average Page Load Time (hsm.com)",
      subCaption: "Last Week",
      showBorder: "0",
      xAxisName: "Day",
      yAxisName: "Time (In Sec)",
      numberSuffix: "s",
      lineThickness: "2",
      paletteColors: "#008ee4,#6baa01",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      showBorder: "0",
      bgColor: "#ffffff",
      showShadow: "0",
      showLegend: "0",
      canvasBgColor: "#ffffff",
      canvasBorderAlpha: "0",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      showXAxisLine: "1",
      xAxisLineThickness: "1",
      xAxisLineColor: "#999999",
      showAlternateHGridColor: "0",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "8"
    },
    dataSetProperties: {
      dataSetCallback: function(data) {
        data.allowDrag = "0";
      }
    }
  },

  SelectScatter: {
    height: "300",
    width: "450",
    chartType: "selectscatter",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
    dataAccessId: "30",
    chartProperties: {
      caption: "Products Sold vs Price points",
      subcaption: "This Week at Harry's SuperMart",
      yaxisname: "Quantity Sold",
      xaxisname: "Price(In US $)",
      xaxismaxvalue: "1000",
      xaxisminvalue: "100",
      yaxismaxvalue: "200",
      xnumberprefix: "$",
      ynumbersuffix: " units",
      showcanvasborder: "1",
      canvasborderthickness: "0.5",
      canvasborderalpha: "50",
      showXAxisLine: "0",
      showformbtn: "1",
      formAction: "#",
      submitdataasxml: "1",
      baseFontColor: "#333333",
      baseFont: "Helvetica Neue,Arial",
      captionFontSize: "14",
      subcaptionFontSize: "14",
      subcaptionFontBold: "0",
      showBorder: "0",
      bgColor: "#ffffff",
      showValues: "0",
      showShadow: "0",
      canvasBgColor: "#ffffff",
      divlineAlpha: "100",
      divlineColor: "#999999",
      divlineThickness: "1",
      divLineIsDashed: "1",
      divLineDashLen: "1",
      divLineGapLen: "1",
      usePlotGradientColor: "0",
      showplotborder: "0",
      showAlternateHGridColor: "0",
      showAlternateVGridColor: "0",
      legendBgAlpha: "0",
      legendBorderAlpha: "0",
      legendShadow: "0",
      legendItemFontSize: "10",
      legendItemFontColor: "#666666",
      toolTipColor: "#ffffff",
      toolTipBorderThickness: "0",
      toolTipBgColor: "#000000",
      toolTipBgAlpha: "80",
      toolTipBorderRadius: "2",
      toolTipPadding: "5"
    },
    categoriesProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Series/series.cda",
      dataAccessId: "31",
      categoryCallback: function(data) {
        data.verticallinecolor = "666666";
        data.verticallinethickness = "1";
        data.alpha = "40";
      }
    },
    dataSetProperties: {
      dataSetCallback: function(data) {
        data.drawline = "0";
        data.color = "6baa01";
        data.anchorsides = "3";
        data.anchorradius = "4";
        data.anchorbgcolor = "6baa01";
        data.anchorbordercolor = "6baa01";
      },
    }
  },
};
