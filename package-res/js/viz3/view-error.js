define([
  "require",
  "module",
  "xViz/utils/Utils",
  "xViz/utils/Chart",
], function(require,module,Utils,Chart) {
  "use strict";

  return [
    "pentaho/visual/base/view",
    "./model-error",
    function(BaseView, Model) {
      // Create the View subclass
      var ErrorView = BaseView.extend({
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
          var seriesAttribute = model.series.attributes.at(0).name;
          var errorAttribute = model.error.attributes.at(0).name;
          
          var categoryColumn = dataTable.getColumnIndexByAttribute(categoryAttribute);
          var measureColumn = dataTable.getColumnIndexByAttribute(measureAttribute);
          var seriesColumn = dataTable.getColumnIndexByAttribute(seriesAttribute);
          var errorColumn = dataTable.getColumnIndexByAttribute(errorAttribute); 

          var category = [];
          var dataSet = [];

          var categoryIndex = -1;
          var seriesIndex = -1;
          var categoryName, serieName;

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
          // build Data
          var dataVal = [];
          for (var i = 0; i < category.length; i++) {
            dataVal.push({
              label: category[i].label,
              value: 0,
              errorvalue: 0
            });
          };
          //build Series
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            serieName = dataTable.getFormattedValue(i, seriesColumn);
            seriesIndex = dataSet.findIndex(function(obj){return obj.seriesname === serieName});
            if(seriesIndex == -1){
              dataSet.push({
                "seriesname" : serieName,
                "data" : JSON.parse(JSON.stringify(dataVal))
              });
            };
          };
          // Set Data Values
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            serieName = dataTable.getFormattedValue(i, seriesColumn);
            categoryName = dataTable.getFormattedValue(i, categoryColumn);
            seriesIndex = dataSet.findIndex(function(obj){return obj.seriesname === serieName});
            categoryIndex = category.findIndex(function(obj){return obj.label === categoryName});
            dataSet[seriesIndex].data[categoryIndex].value = dataTable.getValue(i, measureColumn);
            dataSet[seriesIndex].data[categoryIndex].errorvalue = dataTable.getValue(i, errorColumn);
          };

          chartoptions.categories.push({
            "category" : category
          });
          chartoptions.dataset = dataSet;
          model.chartOptions = chartoptions;
          //Render Chart
          var chart = new Chart();
          chart.renderChart(model, renderContainer);
        }
      });

      return ErrorView;
    }
  ];
});
