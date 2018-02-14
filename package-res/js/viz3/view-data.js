define([
  "require",
  "module",
  "xViz/utils/Utils",
  "xViz/utils/Chart",
], function(require,module,Utils,Chart) {
  "use strict";

  return [
    "pentaho/visual/base/view",
    "./model-data",
    function(BaseView, Model) {
      // Create the Bar View subclass
      var DataView = BaseView.extend({
        $type: {
          id: module.id,
          props: [
            // Specialize the inherited model property to the Bar model type
            {
              name: "model",
              valueType: Model
            }
          ]
        },
      
        _updateAll: function() {
          if(!sessionStorage.getItem("validFusionKey") || !sessionStorage.getItem("validFusionXT")){
            if(!Utils.prototype.validateFusionKey(this.domContainer)){
              return
            }
          }

          var model = this.model;
          var dataTable = model.data;
          var renderContainer = this.domContainer;

          var categoryAttribute = model.category.attributes.at(0).name;
          var measureAttribute = model.measure.attributes.at(0).name;

          var categoryColumn = dataTable.getColumnIndexByAttribute(categoryAttribute);
          var measureColumn = dataTable.getColumnIndexByAttribute(measureAttribute);
          
          var chartoptions = {};

          chartoptions.chart = {};
          
          if(model.theme === "none"){
            chartoptions.chart =
            {
              "bgColor": "#ffffff",
              "showBorder": "0",
              "use3DLighting": "0",
              "showShadow": "0",
              "enableSmartLabels": "0",
              "startingAngle": "0",
              "showPercentValues": "1",
              "showPercentInTooltip": "0",
              "decimals": "1",
              "captionFontSize": "14",
              "subcaptionFontSize": "14",
              "subcaptionFontBold": "0",
              "toolTipColor": "#ffffff",
              "toolTipBorderThickness": "0",
              "toolTipBgColor": "#000000",
              "toolTipBgAlpha": "80",
              "toolTipBorderRadius": "2",
              "toolTipPadding": "5",
              "showHoverEffect": "1",
              "showLegend": "1",
              "legendBgColor": "#ffffff",
              "legendBorderAlpha": "0",
              "legendShadow": "0",
              "legendItemFontSize": "10",
              "legendItemFontColor": "#666666",
              "useDataPlotColorForLabels": "1"
            }
          };

          var scenes = [];
          
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            scenes.push({
              label: dataTable.getFormattedValue(i, categoryColumn),
              value: dataTable.getValue(i, measureColumn),
            });
          }
          
          chartoptions.data = scenes;
          model.chartOptions = chartoptions;

          var chart = new Chart();
          chart.renderChart(model, renderContainer);
        }
      });

      return DataView;
    }
  ];
});
