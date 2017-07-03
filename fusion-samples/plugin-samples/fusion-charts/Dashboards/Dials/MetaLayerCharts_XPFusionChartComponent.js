var MetaLayerCharts= {

      AngularGauge: {
            path               : "/public/plugin-samples/fusion-charts/Dashboards/Dials/dials.cda",
            chartType          : "angulargauge",
            height             : "200",
            width              : "450",
            dataAccessId       : "1",
            cdaRefreshInterval : "10",
            chartProperties: {
                  bgColor            : "ffffff",
                  bgRatio            : "100",
                  bgAlpha            : "100",
                  gaugeFillMix       : "{color}",
                  gaugeStartAngle    : "250",
                  gaugeEndAngle      : "-70",
                  gaugeOuterRadius   : "95",
                  gaugeInnerRadius   : "55%",
                  gaugeBorderColor   : "545A57",
                  pivotRadius        : "5",
                  showPivotBorder    : "0",
                  pivotFillColor     : "545A57",
                  pivotFillAlpha     : "100",
                  majorTMNumber      : "7",
                  majorTMColor       : "000000",
                  minorTMColor       : "545A57",
                  baseFontColor      : "000000",
                  baseFontSize       : "16",
                  showLimits         : "0",
                  toolTipBgColor     : "545A57",
                  toolTipBorderColor : "262626",
                  borderColor        : "ffffff",
                  free               : "false",
            },
            colorRangeProperties: {
                  path         : "/public/plugin-samples/fusion-charts/Dashboards/Dials/dials.cda",
                  dataAccessId : "2",
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

};
