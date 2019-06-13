define([
  "require",
  "pentaho/module!_",
  "xViz/utils/Utils",
  "xViz/utils/Chart",
  "pentaho/visual/base/View",
  "./Model-Map",
], function(require,module,Utils,Chart,BaseView, Model) {
    "use strict";
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
          //Validate FusionXT and Key
          if(!Utils.prototype.validateFusionKey(this.domContainer)){
            return
          }
          
          var model = this.model;
          var dataTable = model.data;
          var renderContainer = this.domContainer;

          var categoryAttribute = model.id.fields.at(0).name;
          var measureAttribute = model.value.fields.at(0).name;

          var categoryColumn = dataTable.getColumnIndexById(categoryAttribute);
          var measureColumn = dataTable.getColumnIndexById(measureAttribute);
          
          var chartoptions = {};
          
          chartoptions.chart ={};

          var scenes = [];
          //Create Chart Data Structure
          // build Data
          var minValue = dataTable.getValue(0, measureColumn);
          var maxValue = dataTable.getValue(0, measureColumn);;
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            scenes.push({
              id: dataTable.getFormattedValue(i, categoryColumn),
              value: dataTable.getValue(i, measureColumn),
            });
            if(dataTable.getValue(i, measureColumn)< minValue){minValue = dataTable.getValue(i, measureColumn)};
            if(dataTable.getValue(i, measureColumn)> maxValue){maxValue = dataTable.getValue(i, measureColumn)};
          }
          
          chartoptions.data = scenes;
          chartoptions.map = {
            "minValue": minValue,
            "maxValue":maxValue
          };
          model.chartOptions = chartoptions;
          //Render Chart
          var chart = new Chart();
          chart.renderChart(model, dataTable, renderContainer);
        }
      });

      return MapView.configure({$type: module.config});
 });
