var MetaLayerCharts= {

      HLinearGauge: {
            height             : "300",
            width              : "950",
            chartType          : "hlineargauge",
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Pointers/pointers.cda",
            dataAccessId       : "1",
            cdaRefreshInterval : "10",
            chartProperties: {
                  caption            : "Server CPU Utilization",
                  subcaption         : "food.hsm.com",
                  captionFontColor   : "#000000",
                  subcaptionFontBold : "0",
                  bgColor            : "#ffffff",
                  showBorder         : "0",
                  lowerLimit         : "0",
                  upperLimit         : "100",
                  numberSuffix       : "%",
                  valueAbovePointer  : "0",
                  showShadow         : "0",
                  gaugeFillMix       : "{light}",
                  valueBgColor       : "#ffffff",
                  valueBgAlpha       : "60",
                  valueFontColor     : "#000000",
                  pointerBgColor     : "#ffffff",
                  pointerBgAlpha     : "50",
                  baseFontColor      : "#ffffff"
            },
            colorRangeProperties: {
                  path         : "/public/plugin-samples/fusion-charts/Dashboards/Pointers/pointers.cda",
                  dataAccessId : "2",
                  colorCallback: function(data){
                        if(data.maxValue === 35){
                              data.code = "#1aaf5d";
                              data.label = "Low";
                        }
                        if(data.maxValue === 70){
                              data.code = "#f2c500";
                              data.label = "Moderate";
                        }
                        if(data.maxValue === 100){
                              data.code = "#c02d00";
                              data.label = "High";
                        }
                  }
            },
      }
};
