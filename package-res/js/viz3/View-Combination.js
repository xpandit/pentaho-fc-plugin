define([
  "require",
  "pentaho/module!_",
  "xViz/utils/Utils",
  "xViz/utils/Chart",
  "pentaho/visual/base/View",
  "./Model-Combination"
], function(require,module,Utils,Chart,BaseView, Model) {
    "use strict";
      // Create the View subclass
      var CombinationView = BaseView.extend({
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
          
          var categoryAttribute = model.category.fields.at(0).name;
          var categoryColumn = dataTable.getColumnIndexById(categoryAttribute);
          var measuresArraycount = model.measures.fields.count;
          var measuresAttributes = [];
          var measuresColumns = [];

          for(var i = 0; i < measuresArraycount; i++) {
            var measureIndex=dataTable.getColumnIndexById(model.measures.fields.at(i).name);           
            measuresAttributes[i] = {
              attribute: model.measures.fields.at(i).name,
              name: dataTable.getColumnLabel(measureIndex),
              column: dataTable.getColumnIndexById(model.measures.fields.at(i).name)
            }
          }
                    
          var category = [];
          var dataSet = [];

          var categoryIndex = -1;
          var seriesIndex = -1;
          var categoryName;

          var chartoptions = {
            "chart": {},
            categories : []
          }
          //Create Chart Data Structure
          // build Categories
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            categoryName = dataTable.getFormattedValue(i, categoryColumn);
            if(category.findIndex(function(obj){return obj.label === categoryName})== -1){
              category.push({
                label: categoryName
              });
            };
          }
          // build data
          var dataVal = [];
          for (var i = 0; i < category.length; i++) {
            dataVal.push({
              label: category[i].label,
              value: 0
            });
          };
          //build Series
          for(var i = 0, R = measuresAttributes.length; i < R; i++) {
            var serieName = measuresAttributes[i].name;
            dataSet.push({
              "seriesname" : serieName,
              "data" : JSON.parse(JSON.stringify(dataVal))
            });
          };
          // build data values
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            for (var j = 0, S = measuresAttributes.length; j < S; j++) {
              categoryName = dataTable.getFormattedValue(i, categoryColumn);
              seriesIndex = dataSet.findIndex(function(obj){return obj.seriesname === measuresAttributes[j].name});
              categoryIndex = dataSet[seriesIndex].data.findIndex(function(obj){return obj.label === categoryName});
              dataSet[seriesIndex].data[categoryIndex].value = dataTable.getValue(i, measuresAttributes[j].column);
              if(seriesIndex == model["render line"]){
                dataSet[seriesIndex].renderAs = "line";
              }
              if(seriesIndex == model["render area"]){
                dataSet[seriesIndex].renderAs = "area";
              }
              if(seriesIndex == model["secondary y-axis"]){
                dataSet[seriesIndex].parentYAxis = "S";
              }
            }
          };

          chartoptions.categories.push({
            "category" : category
          });
          chartoptions.dataset = dataSet;
          model.chartOptions = chartoptions;
          //create chart and render
          var chart = new Chart();
          chart.renderChart(model, dataTable, renderContainer);
        }
      });

      return CombinationView.configure({$type: module.config});
});
