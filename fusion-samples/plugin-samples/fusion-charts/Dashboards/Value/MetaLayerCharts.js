var MetaLayerCharts= {

      Bulb: {
            height             : "300",
            width              : "450",
            chartType          : "bulb",
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
            dataAccessId       : "1",
            cdaRefreshInterval : "5",
            chartProperties: {
                  caption                : "Temperature status",
                  upperlimit             : "60",
                  lowerlimit             : "5",
                  captionPadding         : "30",
                  showshadow             : "0",
                  showvalue              : "1",
                  useColorNameAsValue    : "1",
                  placeValuesInside      : "1",
                  valueFontSize          : "16",
                  baseFontColor          : "#333333",
                  baseFont               : "Helvetica Neue,Arial",
                  captionFontSize        : "14",
                  showborder             : "0",
                  bgcolor                : "#FFFFFF",
                  toolTipColor           : "#ffffff",
                  toolTipBorderThickness : "0",
                  toolTipBgColor         : "#000000",
                  toolTipBgAlpha         : "80",
                  toolTipBorderRadius    : "2",
                  toolTipPadding         : "5",
            },
            colorRangeProperties: {
                  path         : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
                  dataAccessId : "2",
                  colorCallback: function(data){
                        if(data.maxValue === 25){
                              data.code = "#ff0000";
                              data.label = "Problem detected!";
                        }
                        if(data.maxValue === 35){
                              data.code = "#ff9900";
                              data.label = "Alert!";
                        }
                        if(data.maxValue === 60){
                              data.code = "#00ff00";
                              data.label = "All well!";
                        }
                  }
            },   
      },

      Cylinder: {
            height             : "300",
            width              : "450",
            chartType          : "cylinder",
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
            dataAccessId       : "3",
            cdaRefreshInterval : "5",
            chartProperties: {
                  caption            : "Fuel Meter",
                  subcaption         : "Diesel level in generator Bakersfield Central",
                  subcaptionFontBold : "0",
                  lowerLimit         : "0",
                  upperLimit         : "120",
                  lowerLimitDisplay  : "Empty",
                  upperLimitDisplay  : "Full",
                  numberSuffix       : " ltrs",
                  showValue          : "1",
                  showhovereffect    : "1",
                  bgCOlor            : "#ffffff",
                  borderAlpha        : "0",
                  cylFillColor       : "#008ee4"
            }
      },

      HLed: {
            height             : "200",
            width              : "450",
            chartType          : "hled",
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
            dataAccessId       : "4",
            cdaRefreshInterval : "5",
            chartProperties: {
                  caption            : "Customer satisfaction score",
                  subcaption         : "Current week - Bakersfield Central",
                  subcaptionFontBold : "0",
                  lowerLimit         : "0",
                  upperLimit         : "100",
                  lowerLimitDisplay  : "Bad",
                  upperLimitDisplay  : "Good",
                  numberSuffix       : "%",
                  showValue          : "0",
                  showBorder         : "0",
                  bgColor            : "#ffffff",
                  showShadow         : "0",
                  tickMarkDistance   : "5"
            },
            colorRangeProperties: {
                        path         : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
                        dataAccessId : "5",
                  colorCallback: function(data){
                        if(data.maxValue === 45){
                              data.code = "#8e0000";
                        }
                        if(data.maxValue === 75){
                              data.code = "#f2c500";
                        }
                        if(data.maxValue === 100){
                              data.code = "#1aaf5d";
                        }
                  }
            },   
      },


      VLed: {
            height             : "300",
            width              : "200",
            chartType          : "vled",
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
            dataAccessId       : "4",
            cdaRefreshInterval : "5",
            chartProperties: {
                  caption                : "Customer score",
                  subcaptionFontBold     : "0",
                  lowerLimit             : "0",
                  upperLimit             : "100",
                  lowerLimitDisplay      : "Bad",
                  upperLimitDisplay      : "Good",
                  numberSuffix           : "%",
                  showValue              : "0",
                  showBorder             : "0",
                  showShadow             : "0",
                  tickMarkDistance       : "5",
                  alignCaptionWithCanvas : "1",
                  captionAlignment       : "center",
                  bgcolor                : "#ffffff"
            },
            colorRangeProperties: {
                  path         : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
                  dataAccessId : "5",
                  colorCallback: function(data){
                        if(data.maxValue === 45){
                              data.code = "#8e0000";
                        }
                        if(data.maxValue === 75){
                              data.code = "#f2c500";
                        }
                        if(data.maxValue === 100){
                              data.code = "#1aaf5d";
                        }
                  }
            },   
      },

      Thermometer: {
            height             : "350",
            width              : "240",
            chartType          : "thermometer",
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
            dataAccessId       : "6",
            cdaRefreshInterval : "5",
            chartProperties: {
                  caption              : "Temperature Monitor",
                  subcaption           : " Central cold store",
                  lowerLimit           : "-10",
                  upperLimit           : "25",
                  decimals             : "1",
                  numberSuffix         : "°C",
                  showhovereffect      : "1",
                  thmFillColor         : "#008ee4",
                  showGaugeBorder      : "1",
                  gaugeBorderColor     : "#008ee4",
                  gaugeBorderThickness : "2",
                  gaugeBorderAlpha     : "30",
                  thmOriginX           : "100",
                  chartBottomMargin    : "20",
                  valueFontColor       : "#000000",
                  theme                : "fint"
            }
      },

      HBullet: {
            height             : "350",
            width              : "650",
            chartType          : "hbullet",
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
            dataAccessId       : "7",
            cdaRefreshInterval : "5",
            chartProperties: {
                  lowerLimit        : "0",
                  upperLimit        : "100",
                  caption           : "Monthly Revenue",
                  subcaption        : "Actual vs Target<br>Bakersfield Central",
                  numberPrefix      : "$",
                  numberSuffix      : "K",
                  plotFillColor     : "#0075c2",
                  targetColor       : "#8e0000",
                  showHoverEffect   : "1",
                  showBorder        : "0",
                  bgColor           : "#ffffff",
                  showShadow        : "0",
                  colorRangeFillMix : "{light+0}",
                  valuePadding      : "7"
            },
            colorRangeProperties:{
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
                  dataAccessId      : "8",
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

      VBullet: {
            height             : "350",
            width              : "450",
            chartType          : "vbullet",
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
            dataAccessId       : "7",
            cdaRefreshInterval : "5",
            chartProperties: {
                  lowerLimit        : "0",
                  upperLimit        : "100",
                  numberPrefix      : "$",
                  numberSuffix      : "K",
                  plotFillColor     : "#0075c2",
                  targetColor       : "#8e0000",
                  showHoverEffect   : "1",
                  showBorder        : "0",
                  bgColor           : "#ffffff",
                  showShadow        : "0",
                  colorRangeFillMix : "{light}",
                  chartBottomMargin : "20"
            },
            colorRangeProperties:{
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/Value/value.cda",
                  dataAccessId      : "8",
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
};
