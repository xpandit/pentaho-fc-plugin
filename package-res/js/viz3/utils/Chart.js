define([
	'cdf/lib/jquery',
    'amd!cdf/lib/underscore',
    'xfusion/fclib/FusionCharts',
    'xfusion/fclib/fusioncharts.theme.ocean',
    'xfusion/fclib/fusioncharts.theme.carbon',
    'xfusion/fclib/fusioncharts.theme.zune',
    'xfusion/fclib/fusioncharts.theme.fint',
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
                        //"renderAt": container,
                    });
                }
                //Set Chart Type
                model.chartObject.chartType(model.chartType);
                //Set Chart Data
                model.chartObject.setJSONData(model.chartOptions);
                //Set Chart Theme
                if(model.theme != "none"){
                    model.chartObject.setChartAttribute('theme', model.theme);
                }
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