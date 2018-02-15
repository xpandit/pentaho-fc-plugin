define([
  "require",
  "module",
  "xViz/utils/Utils",
  "xViz/utils/Chart",
], function(require,module,Utils,Chart) {
  "use strict";

  return [
    "pentaho/visual/base/view",
    "./model-map",
    function(BaseView, Model) {
      // Create the View subclass
      var MapView = BaseView.extend({
        $type: {
          id: module.id,
          props: [
            // Specialize the inherited model property to the model type
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

          var categoryAttribute = model.id.attributes.at(0).name;
          var measureAttribute = model.value.attributes.at(0).name;

          var categoryColumn = dataTable.getColumnIndexByAttribute(categoryAttribute);
          var measureColumn = dataTable.getColumnIndexByAttribute(measureAttribute);
          
          var chartoptions = {};
          
          chartoptions.chart ={};

          var scenes = [];
          
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            scenes.push({
              id: dataTable.getFormattedValue(i, categoryColumn),
              value: dataTable.getValue(i, measureColumn),
            });
          }
          
          chartoptions.data = scenes;
          model.chartOptions = chartoptions;

          var chart = new Chart();
          chart.renderChart(model, renderContainer);
        }
      });

      return MapView;
    }
  ];
});
