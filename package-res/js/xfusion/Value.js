/*
* sub class of the Chart class for the Value charts
*
*/
define([
	'cdf/lib/jquery',
	'xfusion/charts/Chart',
	'xfusion/charts/ChartUtils',
	'amd!cdf/lib/underscore'
], function ($, Chart, ChartUtils, _) {
		'use strict';

		function Value(name, width, height, chartType, htmlObject) {

			Chart.call(this, name);
			Chart.call(this, name, width, height, chartType, htmlObject);
			this._requiredProperties = ['value'];

			this._data = {
				"chart": null
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
		Value.prototype = Object.create(Chart.prototype);

		Value.prototype = {

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

			realtimeChart: function (object, cd) {
				setInterval(function () {
					var responseText = ChartUtils.prototype.doCDAQuery(cd.path, cd.dataAccessId, object.parameters);
					var dataset = ChartUtils.prototype.buildRealTimeData(responseText);
					object.chartObject.feedData(dataset);
				}, cd.cdaRefreshInterval * 1000);
			},

			setBuildChartValue: function (chartDefinition, values) {
				var cd = chartDefinition;

				var queryDataset = ChartUtils.prototype.buildData(values);

				// create the chart data
				this._data = {
					"chart": cd.chartProperties,
				};
				var hasProperties = ChartUtils.prototype.hasRequiredProperties(queryDataset, this._requiredProperties);
				if(!hasProperties[0]){
					$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Dial is "+hasProperties[1]+"</div>");
					return;
				};

				//add to chart data properties like value and target
				for(var key in queryDataset[0]){
					this._data[key] = queryDataset[0][key];
				};

				return this;
			},

			setAdditionalOptions: function (cd) {
				return (Chart.prototype.setAdditionalOptions.call(this, cd));
			},

		}
		return Value;
	});