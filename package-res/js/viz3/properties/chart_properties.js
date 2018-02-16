var chartSettingsManager = {
    /**
     * Overall look and feel setting that can be overridden bellow;
     */
    getOverallSettings: function() {
      var options = {
        bgColor: "#ffffff",
        showBorder: "0",
        use3DLighting: "0",
        showShadow: "0",
        enableSmartLabels: "0",
        startingAngle: "0",
        toolTipColor: "#ffffff",
        toolTipBorderThickness: "0",
        toolTipBgColor: "#000000",
        toolTipBgAlpha: "80",
        toolTipBorderRadius: "2",
        toolTipPadding: "5",
        showHoverEffect: "1",
        showLegend: "1",
        legendBgColor: "#ffffff",
        legendBorderAlpha: "0",
        legendShadow: "0",
        legendItemFontSize: "10",
        legendItemFontColor: "#666666",
        useDataPlotColorForLabels: "1"
      }
      return options;
    },
    
    mapsColorRange: function(minValue, maxValue) {
      var options =  {
        minvalue: minValue,
        code: "#FF4411",
        gradient: "1",
        color: [
          {
            maxvalue: maxValue,
            code: "#6baa01"
          }
        ]
      }
      return options;
    }
};