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
      // Create the View subclass
      var DataView = BaseView.extend({
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
          //Validate FusionXT and Key
          if(!Utils.prototype.validateFusionKey(this.domContainer)){
            return
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
          
          var scenes = [];
          //Create Chart Data Structure
          // build Data
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            scenes.push({
              label: dataTable.getFormattedValue(i, categoryColumn),
              value: dataTable.getValue(i, measureColumn),
            });
          }
          
          chartoptions.data = scenes;
          model.chartOptions = chartoptions;
          //Render Chart
          var chart = new Chart();
          chart.renderChart(model, renderContainer);
        }
      });

      return DataView;
    }
  ];
});
