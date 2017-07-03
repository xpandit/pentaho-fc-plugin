/*
* sub class of the Chart class for the DataSet charts
*
*/
define([
	'cdf/lib/jquery',
	'xfusion/charts/Chart',
	'xfusion/charts/ChartUtils',
	'amd!cdf/lib/underscore'
], function ($, Chart, ChartUtils, _) {
		'use strict';

		function DataSet(name, width, height, chartType, htmlObject) {
			Chart.call(this, name);
			Chart.call(this, name, width, height, chartType, htmlObject);
			this._requiredProperties = ['value'];

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

		DataSet.prototype = Object.create(Chart.prototype);

		DataSet.prototype = {

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

			setBuildChartDataSet: function (chartDefinition, values) {

				var cd = chartDefinition;

				var queryDataset = ChartUtils.prototype.buildData(values);
				//verify datasetproperties
				if (!_.has(cd, 'dataSetProperties')) {
					cd.dataSetProperties = {};
				}
				//apply callback
				if (_.has(cd.dataSetProperties, 'dataSetCallback')) { queryDataset = ChartUtils.prototype.applyCallBack(queryDataset, cd.dataSetProperties.dataSetCallback); };
				//verify required Properties
				var hasProperties = ChartUtils.prototype.hasRequiredProperties(queryDataset, this._requiredProperties);
				if(!hasProperties[0]){
					$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Data is "+hasProperties[1]+"</div>");
					return;
				};

				cd.dataSetProperties.data = queryDataset;
				// create the chart data
				this._data = {
					"chart": cd.chartProperties,
					"dataset": [cd.dataSetProperties],
				};

				return this;
			},

			setAdditionalOptions: function (cd) {
				return (Chart.prototype.setAdditionalOptions.call(this, cd));
			},

		}

		return DataSet;

	});