/*
* Main class for the object Chart
*
*/
define([
	'cdf/lib/jquery',
	'xfusion/charts/ChartUtils',
	'amd!cdf/lib/underscore'
], function ($, ChartUtils, _) {
		'use strict';
		function Chart(name) {

			this._name = name;
			this._width = '500';
			this._height = '300';
			this._chartType = null;
			this._htmlObject = null;
			this._dateFormat = 'json';
		}

		function Chart(name, width, height, chartType, htmlObject) {

			this._name = name;
			this._width = width || '500';
			this._height = height || '300';
			this._chartType = chartType || null;
			this._htmlObject = htmlObject || null;
			this._dateFormat = 'json';

		}

		Chart.prototype = {

			renderChart: function (object, options, data) {
				if (object.chartObject == undefined) {
					window.require(['xfusion/fclib/FusionCharts'], function (FusionCharts) {
						object.chartObject = new window.FusionCharts(options);
						if (typeof data.chart.theme !== 'undefined') {
							switch (data.chart.theme.toLowerCase()) {
								case 'ocean':
									window.require(['xfusion/fclib/fusioncharts.theme.ocean'], function () {
										object.chartObject.setChartAttribute('theme', 'ocean');
										object.chartObject.setJSONData(data);
										object.chartObject.render();
									});
									return object;
									break;
								case 'carbon':
									window.require(['xfusion/fclib/fusioncharts.theme.carbon'], function () {
										object.chartObject.setChartAttribute('theme', 'carbon');
										object.chartObject.setJSONData(data);
										object.chartObject.render();
									});
									return object;
									break;
								case 'zune':
									window.require(['xfusion/fclib/fusioncharts.theme.zune'], function () {
										object.chartObject.setChartAttribute('theme', 'zune');
										object.chartObject.setJSONData(data);
										object.chartObject.render();
									});
									return object;
									break;
								case 'fint':
									window.require(['xfusion/fclib/fusioncharts.theme.fint'], function () {
										object.chartObject.setChartAttribute('theme', 'fint');
										object.chartObject.setJSONData(data);
										object.chartObject.render();
									});
									return object;
									break;
								case 'xfusiontheme':
									window.require(['xfusion/XPTheme'], function () {
										object.chartObject.setChartAttribute('theme', 'XFusionTheme');
										object.chartObject.setJSONData(data);
										object.chartObject.render();
									});
									return object;
									break;
								default:
									object.chartObject.setJSONData(data);
									object.chartObject.render();
									break;
							}
						}
						object.chartObject.setJSONData(data);
						object.chartObject.render();
					});
					//return object;
				} else {
					object.chartObject.setJSONData(data);
				}
			},

			setAdditionalOptions: function (cd) {
				for (var index = 0; index < _.keys(cd).length; index++) {
					switch (_.keys(cd)[index].toString().toLowerCase()) {
						case 'trendlinesproperties':
							this._data.trendlines = ChartUtils.prototype.buildChartTrendlines(cd);
							break;
						case 'vtrendlinesproperties':
							this._data.vtrendlines = ChartUtils.prototype.buildChartVerticalTrendlines(cd);
							break;
						case 'labelsproperties':
							this._data.labels = ChartUtils.prototype.buildChartLabels(cd);
							break;
						case 'categoriesproperties':
							this._data.categories = ChartUtils.prototype.buildChartCategories(cd);
							break;
						case 'trendPointproperties':
							this._data.trendpoints = ChartUtils.prototype.buildChartTrendPoints(cd);
							break;
						case 'linesetproperties':
							this._data.lineset = ChartUtils.prototype.buildChartLineset(cd);
							break;
						case 'colorrangeproperties':
							this._data.colorrange = ChartUtils.prototype.buildChartColorRange(cd);
							break;
						case 'legendproperties':
							this._data.legend = ChartUtils.prototype.buildChartLegend(cd);
							break;
						case 'annotationsproperties':
							this._data.annotations = ChartUtils.prototype.buildChartAnnotations(cd);
							break;

						default:
							break;
					}
				}
			},

			getName: function () {
				return (this._name);
			},

			getWidth: function () {
				return (this._width);
			},

			getHeight: function () {
				return (this._height);
			},

			getChartType: function () {
				return (this._chartType);
			},

			getHtmlObject: function () {
				return (this._htmlObject);
			},

			getDateFormat: function () {
				return (this._dateFormat);
			},

			setName: function (name) {
				this._name = name;
				return this;
			},

			setWidth: function (width) {
				this._width = width;
				return this;
			},

			setHeight: function (height) {
				this._height = height;
				return this;
			},

			setChartType: function (chartType) {
				this._chartType = chartType;
				return this;
			},

			setHtmlObject: function (htmlObject) {
				this._htmlObject = htmlObject;
				return this;
			},

			setDateFormat: function (dateFormat) {
				this._dateFormat = dateFormat;
				return this;
			},

		}
		return Chart;
	});
