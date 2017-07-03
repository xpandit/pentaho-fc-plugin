/*
* sub class of the Chart class for the Series charts
*
*/
define([
	'cdf/lib/jquery',
	'xfusion/charts/Chart',
	'xfusion/charts/ChartUtils',
	'amd!cdf/lib/underscore'
], function ($, Chart, ChartUtils, _) {
		'use strict';

		function Series(name, width, height, chartType, htmlObject) {

			Chart.call(this, name);
			Chart.call(this, name, width, height, chartType, htmlObject);
			this._requiredProperties = new Array();

			this._data = {
				"chart": null,
				"dataset": null,
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
		Series.prototype = Object.create(Chart.prototype);

		Series.prototype = {

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

			setBuildChartSeries: function (chartDefinition, values) {
				var cd = chartDefinition;

				// build dataset
				var queryDataset = ChartUtils.prototype.buildGroupedData(values, 'seriesname', 'data');

				if (_.has(cd, 'dataSetProperties')) {
					if (_.has(cd.dataSetProperties, 'dataSetCallback')) {
						queryDataset = ChartUtils.prototype.applyCallBack(queryDataset, cd.dataSetProperties.dataSetCallback);
					};
					if (_.has(cd.dataSetProperties, 'dataCallback')) {
						queryDataset = ChartUtils.prototype.applyGroupedCallBack(queryDataset, cd.dataSetProperties.dataCallback, 'seriesname', 'data');
					};
				}

				// Verify required properties
				var hasProperties = ChartUtils.prototype.hasRequiredProperties(queryDataset, this._requiredProperties, 'data');
				if(!hasProperties[0]){
					$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Data is "+hasProperties[1]+"</div>");
					return;
				};
				
				// create the chart data
				this._data = {
					"chart": cd.chartProperties,
					"dataset": queryDataset
				};

				return this;
			},

			setAdditionalOptions: function (cd) {
				return (Chart.prototype.setAdditionalOptions.call(this, cd));
			},
		}
		return Series;
	});
