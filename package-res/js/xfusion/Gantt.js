/*
* sub class of the Chart class for the Gantt charts
*
*/
define([
	'cdf/lib/jquery',
	'xfusion/charts/Chart',
	'xfusion/charts/ChartUtils',
	'amd!cdf/lib/underscore'
], function ($, Chart, ChartUtils, _) {
		'use strict';

		function Gantt(name, width, height, chartType, htmlObject) {

			Chart.call(this, name);
			Chart.call(this, name, width, height, chartType, htmlObject);
			this._requiredProperties = ['processid','id','start','end'];
			this._requiredProcessesProperties = ['id','label'];
			this._requiredDataTableProperties = ['label'];
			this._requiredMilestonesProperties = ['taskid','date'];
			this._requiredConnectorsProperties = ['fromtaskid','totaskid']; 

			this._data = {
				"chart": null,
				"processes": null,
				"datatable": null,
				"tasks": null,
				"milestones": null,
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
		Gantt.prototype = Object.create(Chart.prototype);

		Gantt.prototype = {

			getRequiredProperties: function () {
				return this._requiredProperties;
			},

			getRequiredProcessesProperties: function () {
				return this._requiredProcessesProperties;
			},

			getRequiredDataTableProperties: function () {
				return this._requiredDataTableProperties;
			},

			getRequiredMilestonesProperties: function () {
				return this._requiredMilestonesProperties;
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

			setRequiredProcessesProperties: function (requiredProcessesProperties) {
				this._requiredProcessesProperties = requiredProcessesProperties;
				return this;
			},

			setRequiredDataTableProperties: function (requiredDataTableProperties) {
				this._requiredDataTableProperties = requiredDataTableProperties;
				return this;
			},

			setRequiredMilestonesProperties: function (requiredMilestonesProperties) {
				this._requiredMilestonesProperties = requiredMilestonesProperties;
				return this;
			},

			setRequiredConnectorsProperties: function (requiredConnectorsProperties) {
				this._requiredConnectorsProperties = requiredConnectorsProperties;
				return this;
			},

			renderChart: function (object, options, data) {
				return (Chart.prototype.renderChart.call(this, object, options, data));
			}, 

			setBuildChartGantt: function (chartDefinition, values) {
				var cd = chartDefinition;

				// verify Properties
				if(!_.has(cd,'processesProperties')){cd.processesProperties = {}};
				if(!_.has(cd,'datatableProperties')){cd.datatableProperties = {}};
				if(!_.has(cd,'tasksProperties')){cd.tasksProperties = {}};
				if(!_.has(cd,'milestonesProperties')){cd.milestonesProperties = {}};
				if(!_.has(cd,'connectorsProperties')){cd.connectorsProperties = {}};

				var tasksData = ChartUtils.prototype.buildData(values);

				// apply Callback
				if(_.has(cd.tasksProperties,'taskCallback')){tasksData = ChartUtils.prototype.applyCallBack(tasksData, cd.tasksProperties.taskCallback);};
				//Verify Required Properties
				var hasProperties = ChartUtils.prototype.hasRequiredProperties(tasksData, this._requiredProperties);
				if(!hasProperties[0]){
					 $("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Tasks are "+hasProperties[1]+"</div>");
					 return;
				};
				//apply Properties
				cd.tasksProperties.task = tasksData;

				//Processes
				if(_.has(cd,'processesPath') && _.has(cd,'processesDataAccessId')){
					// get Chart data
					var responseText = ChartUtils.prototype.doCDAQuery(cd.processesPath, cd.processesDataAccessId, this._parameters);
					var processesData = ChartUtils.prototype.buildData(responseText);
					//apply Callback
					if(_.has(cd.processesProperties,'processCallback')){processesData = ChartUtils.prototype.applyCallBack(processesData, cd.processesProperties.processCallback);};
					//verify requiredProperties
					var hasProperties = ChartUtils.prototype.hasRequiredProperties(processesData, this._requiredProcessesProperties);
					if(!hasProperties[0]){
						$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Processes are "+hasProperties[1]+"</div>");
						return;
					};
					//apply Properties
					cd.processesProperties.process = processesData;
				}


				//Datatable
				if(_.has(cd,'datatablePath') && _.has(cd,'datatableDataAccessId')){
					// get Chart data
					var responseText = ChartUtils.prototype.doCDAQuery(cd.datatablePath, cd.datatableDataAccessId, this._parameters);
					var datatableData = ChartUtils.prototype.buildGroupedColumnData(responseText,'headertext','text','label');
					//apply Callback
					if(_.has(cd.datatableProperties,'textCallback')){datatableData = ChartUtils.prototype.applyGroupedCallBack(datatableData, cd.datatableProperties.textCallback,'headertext','text');};
					if(_.has(cd.datatableProperties,'datacolumnCallback')){datatableData = ChartUtils.prototype.applyCallBack(datatableData, cd.datatableProperties.datacolumnCallback);};
					//verify requiredProperties
					var hasProperties = ChartUtils.prototype.hasRequiredProperties(datatableData, this._requiredDataTableProperties,'text');
					if(!hasProperties[0]){
						$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> DataTable is "+hasProperties[1]+"</div>");
						return;
					};
					//apply Properties
					cd.datatableProperties.datacolumn = datatableData;
				}

				//Milestones
				if(_.has(cd,'milestonesPath') && _.has(cd,'milestonesDataAccessId')){
					// get Chart data
					var responseText = ChartUtils.prototype.doCDAQuery(cd.milestonesPath, cd.milestonesDataAccessId, this._parameters);
					var milestonesData = ChartUtils.prototype.buildData(responseText);
					//apply Callback
					if(_.has(cd.milestonesProperties,'milestoneCallback')){milestonesData = ChartUtils.prototype.applyCallBack(milestonesData, cd.milestonesProperties.milestoneCallback);};
					//verify requiredProperties
					var hasProperties = ChartUtils.prototype.hasRequiredProperties(milestonesData, this._requiredMilestonesProperties);
					if(!hasProperties[0]){
						$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Milestones are "+hasProperties[1]+"</div>");
						return;
					};
					//apply Properties
					cd.milestonesProperties.milestone = milestonesData;
				}

				//Connectors
				if(_.has(cd,'connectorsPath') && _.has(cd,'connectorsDataAccessId')){
					// get Chart data
					var responseText = ChartUtils.prototype.doCDAQuery(cd.connectorsPath, cd.connectorsDataAccessId, this._parameters);
					var connectorsData = ChartUtils.prototype.buildData(responseText);
					 //apply Callback
					if(_.has(cd.connectorsProperties,'connectorCallback')){connectorsData = ChartUtils.prototype.applyCallBack(connectorsData, cd.connectorsProperties.connectorCallback);};
					//verify requiredProperties
					var hasProperties = ChartUtils.prototype.hasRequiredProperties(connectorsData, this._requiredConnectorsProperties);
					if(!hasProperties[0]){
						$("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Connectors are "+hasProperties[1]+"</div>");
						return;
					};
					//apply Properties
					cd.connectorsProperties.connector = connectorsData;
				}				
			
				// create the chart data
				this._data = {
					"chart": cd.chartProperties,
					"processes":cd.processesProperties,
					"datatable":cd.datatableProperties,
					"tasks":cd.tasksProperties,
					"milestones":cd.milestonesProperties,
					"connectors":[cd.connectorsProperties],
				};

				return this;
			},

			setAdditionalOptions: function (cd) {
				return (Chart.prototype.setAdditionalOptions.call(this, cd));
			},

		}
		return Gantt;
	});