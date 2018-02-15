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
            "chart": {
              xAxisName : model.category.attributes.at(0).dataAttribute.label,
              yAxisName : model.measure.attributes.at(0).dataAttribute.label,
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
            },
            categories : []
          }

          // build Categories
          for(var i = 0, R = dataTable.getNumberOfRows(); i < R; i++) {
            categoryName = dataTable.getFormattedValue(i, categoryColumn);
            if(category.findIndex(function(obj){return obj.label === categoryName})== -1){
              category.push({
                label: categoryName
              });
            };
          }
          var dataVal = [];
          for (var i = 0; i < category.length; i++) {
            dataVal.push({
              label: category[i].label,
              value: 0,
              errorvalue: 0
            });
          };
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

          var chart = new Chart();
          chart.renderChart(model, renderContainer);
        }
      });

      return ErrorView;
    }
  ];
});
