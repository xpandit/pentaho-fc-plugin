define([
	'cdf/lib/jquery',
    'amd!cdf/lib/underscore',
    'xfusion/fclib/FusionCharts',
    'xfusion/fclib/fusioncharts.theme.ocean',
    'xfusion/fclib/fusioncharts.theme.carbon',
    'xfusion/fclib/fusioncharts.theme.zune',
    'xfusion/fclib/fusioncharts.theme.fint',
    'xfusion/fclib/fusioncharts.theme.candy',
    'xfusion/fclib/fusioncharts.theme.gammel',
    'xfusion/fclib/fusioncharts.theme.umber',
    'xfusion/fclib/fusioncharts.theme.fusion',
    'xViz/properties/chart_properties'
], function ($, _) {
		'use strict';
        
        function Chart() {
		}

        Chart.prototype = {
            renderChart: function (model, dataTable, container) {
                if (model.chartObject == undefined) {
                    //Create FusionChart if it does not exist
                    model.chartObject = new FusionCharts({
                        "type": model.chartType,
                        "width": "100%",
                        "height": "100%",
                        "dataFormat": "json",
                    });
                }
                //Set Chart Type
                model.chartObject.chartType(model.chartType);
                //Customize Map 
                if(model.chartType.match(/maps\/.*/g)){
                    model.chartOptions.colorrange = chartSettingsManager.mapsColorRange(model.chartOptions.map.minValue,model.chartOptions.map.maxValue);
                }
                //Customize Chart
                if(model.theme != "none"){
                    model.chartOptions.chart.theme = model.theme;
                }else{
                    model.chartOptions.chart = chartSettingsManager.getOverallSettings();
                }
                if(model.measure != undefined){
                    var measureIndex=dataTable.getColumnIndexById(model.measure.fields.at(0).name); 
                    model.chartOptions.chart.yAxisName = dataTable.getColumnLabel(measureIndex);
                }
                if(model.category!= undefined){
                    var categoryIndex=dataTable.getColumnIndexById(model.category.fields.at(0).name); 
                    model.chartOptions.chart.xAxisName = dataTable.getColumnLabel(categoryIndex);
                }
                //Set Chart Data
                model.chartObject.setJSONData(model.chartOptions);

                //Enable Export
                model.chartObject.setChartAttribute('exportEnabled', "1");
                model.chartObject.setChartAttribute('exportAtClientSide', "1");
                //Render the Chart
                model.chartObject.render(container);
                
                return model;
			},
        }

    return Chart;
});