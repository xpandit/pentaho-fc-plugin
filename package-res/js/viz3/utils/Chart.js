define([
	'cdf/lib/jquery',
    'amd!cdf/lib/underscore',
    'xfusion/fclib/FusionCharts',
    'xfusion/fclib/fusioncharts.theme.ocean',
    'xfusion/fclib/fusioncharts.theme.carbon',
    'xfusion/fclib/fusioncharts.theme.zune',
    'xfusion/fclib/fusioncharts.theme.fint',
    'xViz/properties/chart_properties'
], function ($, _) {
		'use strict';
        
        function Chart() {
		}

        Chart.prototype = {
            renderChart: function (model, container) {
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
                    model.chartOptions.chart.yAxisName = model.measure.attributes.at(0).dataAttribute.label;
                }
                if(model.category!= undefined){
                    model.chartOptions.chart.xAxisName = model.category.attributes.at(0).dataAttribute.label;
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