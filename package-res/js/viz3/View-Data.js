define([
  "require",
  "pentaho/module!_",
  "xViz/utils/Utils",
  "xViz/utils/Chart",
  "pentaho/visual/impl/View"
], function(require,module,Utils,Chart,BaseView) {
    "use strict";
      // Create the View subclass
      var DataView = BaseView.extend(module.id,{
          
        _updateAll: function() {
          //Validate FusionXT and Key
          if(!Utils.prototype.validateFusionKey(this.domContainer)){
            return
          }

          var model = this.model;
          var dataTable = model.data;
          var renderContainer = this.domContainer;

          var categoryAttribute = model.category.fields.at(0).name;
          var measureAttribute = model.measure.fields.at(0).name;

          var categoryColumn = dataTable.getColumnIndexById(categoryAttribute);
          var measureColumn = dataTable.getColumnIndexById(measureAttribute);
          
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
          chart.renderChart(model, dataTable, renderContainer);
        }
      });

      return DataView;
 });
