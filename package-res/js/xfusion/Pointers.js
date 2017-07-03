/*
* sub class of the Chart class for the Pointers charts
*
*/
define([
	'cdf/lib/jquery',
	'xfusion/charts/Chart',
	'xfusion/charts/ChartUtils',
	'amd!cdf/lib/underscore'
], function ($, Chart, ChartUtils, _) {
		'use strict';

		function Pointers(name, width, height, chartType, htmlObject) {

			Chart.call(this, name);
			Chart.call(this, name, width, height, chartType, htmlObject);
			this._requiredProperties = ['value'];

			this._data = {
				"chart": null,
				"pointers": null,
			};

			this._fusionOptions = {
				"type": null,
				"renderAt": null,
				"width": null,
				"height": null,
				"dataFormat": null
			};
		}

		// extend Chart class
		Pointers.prototype = Object.create(Chart.prototype);

		Pointers.prototype = {

			getRequiredProperties: function () {
				return this._requiredProperties;
			},

			getData: function () {
				return this._data;
			},

			getFusionOptions: function () {
				return this._fusionOptions = {
					"type": Chart.prototype.getChartType.call(this),
					"renderAt": Chart.prototype.getHtmlObject.call(this),
					"width": Chart.prototype.getWidth.call(this),
					"height": Chart.prototype.getHeight.call(this),
					"dataFormat": Chart.prototype.getDateFormat.call(this)
				};
			},

			setRequiredProperties: function (requiredProperties) {
				this._requiredProperties = requiredProperties;
				return this;
			},

			renderChart: function (object, options, data) {
				return (Chart.prototype.renderChart.call(this, object, options, data));
			},

			setBuildChartPointers: function (chartDefinition, values) {
				var cd = chartDefinition;

				var queryDataset = ChartUtils.prototype.buildData(values);

				if(_.has(cd, 'dataSetProperties')){
					 if(_.has(cd.dataSetProperties, 'dataSetCallback')){
					 	queryDataset = ChartUtils.prototype.applyCallBack(queryDataset, cd.dataSetProperties.dataSetCallback);
					 };
				 };

				var hasProperties = ChartUtils.prototype.hasRequiredProperties(queryDataset, this._requiredProperties);
				if(!hasProperties[0]){
					$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Pointer is "+hasProperties[1]+"</div>");
					return;
				};
				
				// create the chart data
				this._data = {
					"chart": cd.chartProperties,
					"pointers":{"pointer":queryDataset}
				};

				return this;
			},

			setAdditionalOptions: function (cd) {
				return (Chart.prototype.setAdditionalOptions.call(this, cd));
			},

		}
		return Pointers;
	});