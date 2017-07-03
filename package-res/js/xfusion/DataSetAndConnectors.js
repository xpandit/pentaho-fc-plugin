/*
* sub class of the Chart class for the DataSetAndConnectors charts
*
*/
define([
	'cdf/lib/jquery',
	'xfusion/charts/Chart',
	'xfusion/charts/ChartUtils',
	'amd!cdf/lib/underscore'
], function ($, Chart, ChartUtils, _) {
		'use strict';

		function DataSetAndConnectors(name, width, height, chartType, htmlObject) {

			Chart.call(this, name);
			Chart.call(this, name, width, height, chartType, htmlObject);
			this._requiredProperties = ['x','y','id'];
			this._requiredConnectorsProperties = ['from','to'];

			this._data = {
				"chart": null,
				"dataset": null,
				"connectors": null,
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
		DataSetAndConnectors.prototype = Object.create(Chart.prototype);

		DataSetAndConnectors.prototype = {

			getRequiredProperties: function () {
				return this._requiredProperties;
			},

			getRequiredConnectorsProperties: function () {
				return this._requiredConnectorsProperties;
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

			setRequiredConnectorsProperties: function (requiredConnectorsProperties) {
				this._requiredConnectorsProperties = requiredConnectorsProperties;
				return this;
			},

			renderChart: function (object, options, data) {
				return (Chart.prototype.renderChart.call(this, object, options, data));
			},


			setBuildChartDataSetAndConnectors: function (chartDefinition, values) {
				var cd = chartDefinition;

				//error missing connectorsDataAccessId
				if (!_.has(cd,'connectorsDataAccessId')){
					$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Property!</strong> Connectors Data Access ID</div>");
					return;
				}
				//error missing connectors properties
				if(!_.has(cd, 'connectorsProperties')){
					$("#"+this._htmlObject).html("<div class=\"alert alert-danger\"><strong>Error!</strong>Missing connectorsProperties</div>");
					return;
				}

				var queryDataset = ChartUtils.prototype.buildData(values);

				//build the parameters for the connectors
				if(_.has(cd,'connectorsPath')){
					var resultset = ChartUtils.prototype.doCDAQuery(cd.connectorsPath, cd.connectorsDataAccessId, this._parameters);
				}else{
					var resultset = ChartUtils.prototype.doCDAQuery(cd.path, cd.connectorsDataAccessId, this._parameters);
				}
				var queryConnectors = ChartUtils.prototype.buildData(resultset);

				//verify if dataSetProperties exists
				if(!_.has(cd,'dataSetProperties')){
					cd.dataSetProperties = {};
				}
				//apply node callback function
				if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = ChartUtils.prototype.applyCallBack(queryDataset, cd.dataSetProperties.dataSetCallback);};

				//verify if dataSetProperties exists
				if(!_.has(cd,'connectorsProperties')){
					cd.connectorsProperties = {};
				}
				//apply connectors callback function
				if(_.has(cd.connectorsProperties, 'connectorCallback')){queryConnectors = ChartUtils.prototype.applyCallBack(queryConnectors, cd.connectorsProperties.connectorCallback);};

				//verify if dataset has required properties
				var hasProperties = ChartUtils.prototype.hasRequiredProperties(queryDataset, this._requiredProperties);

				if(!hasProperties[0]){
					$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong>Nodes are "+hasProperties[1]+"</div>");
					return;
				}

				//verify if connectors have required parameters
				var hasProperties = ChartUtils.prototype.hasRequiredProperties(queryConnectors, this._requiredConnectorsProperties);
				if(!hasProperties[0]){
					$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Connectors are "+hasProperties[1]+"</div>");
					return;
				}
		 
				// add nodes data to dataset
				cd.dataSetProperties.data = queryDataset;
				// add connectors data to connectors properties
				cd.connectorsProperties.connector = queryConnectors;
				// create the chart data
				
				// create the chart data
				this._data = {
					"chart": cd.chartProperties,
					"dataset": [cd.dataSetProperties],
					"connectors":[cd.connectorsProperties]
				};

				return this;
			},

			setAdditionalOptions: function (cd) {
				return (Chart.prototype.setAdditionalOptions.call(this, cd));
			},

		}
		return DataSetAndConnectors;
	});