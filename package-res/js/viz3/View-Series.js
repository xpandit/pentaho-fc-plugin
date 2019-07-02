define([
  "require",
  "pentaho/module!_",
  "xViz/utils/Utils",
  "xViz/utils/Chart",
  "pentaho/visual/impl/View"
], function(require,module,Utils,Chart,BaseView) {
    "use strict";
      // Create the View subclass
      var BarView = BaseView.extend(module.id,{
             
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
          var seriesAttribute = model.series.fields.at(0).name;
          
          var categoryColumn = dataTable.getColumnIndexById(categoryAttribute);
          var measureColumn = dataTable.getColumnIndexById(measureAttribute);
          var seriesColumn = dataTable.getColumnIndexById(seriesAttribute);   

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
              value: 0
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
          };

          chartoptions.categories.push({
            "category" : category
          });
          chartoptions.dataset = dataSet;
          model.chartOptions = chartoptions;
          //Render Chart
          var chart = new Chart();
          chart.renderChart(model, dataTable, renderContainer);
        }
      });

      return BarView;
});
