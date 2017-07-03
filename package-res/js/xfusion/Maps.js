/*
* sub class of the Chart class for the Maps charts
*
*/
define([
	'cdf/lib/jquery',
	'xfusion/charts/Chart',
	'xfusion/charts/ChartUtils',
	'amd!cdf/lib/underscore'
	], function ($, Chart, ChartUtils, _) {
		'use strict';

		function Maps(name, width, height, chartType, htmlObject) {

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
		Maps.prototype = Object.create(Chart.prototype);

		Maps.prototype = {

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

			// override set values from the super class
			/*setWidth: function (width) {
				return (Chart.prototype.setWidth.call(this, typeof width === 'undefined' ? Chart.prototype.getWidth.call(this) : width));
			},*/


			setBuildChartMaps: function (chartDefinition, values) {
				var cd = chartDefinition;

				// verify existence of Markers Property
				if (!_.has(cd, 'markers')){
					// display missing options error
					$("#"+this._htmlObject).html("<div class=\"alert alert-info\">Missing Markers Properties (markers)</div>");
					return;
				}

				// build data
				var queryDataset = ChartUtils.prototype.buildData(values);

				// create map data object
				this._data = {"chart": cd.chartProperties};

				if(cd.markers){
					this._data.markers = this.setBuildMapMarkers(cd,queryDataset);
				}else{
					this._data.data = this.setBuildMapDataSet(cd, queryDataset);
					if(typeof this._data.data === "undefined"){return;};
				}
				// map entity definition
				this._data.entityDef = this.setBuildMapEntityDef(cd);

				return this;
			},

			setAdditionalOptions: function (cd) {
				return (Chart.prototype.setAdditionalOptions.call(this, cd));
			},

			setBuildMapEntityDef : function(chartDefinition){
				var cd = chartDefinition;

				// check if needs new entities
				if(_.has(cd,"entityDefDataAccessId")){
					if(!_.has(cd,'entityDefProperties')){
						cd.entityDefProperties = {};
					}
					// query for connectors
					queryDataset = ChartUtils.prototype.doCDAQuery(cd.path, cd.entityDefDataAccessId, this._parameters);
					queryDataset = ChartUtils.prototype.buildData(queryDataset);
					//apply connectors callback
					if(_.has(cd.entityDefProperties, 'entityDefCallback')){
						queryDataset = ChartUtils.prototype.applyCallBack(queryDataset, cd.entityDefProperties.entityDefCallback);
					};
					// add items to markers
					return queryDataset;
				}else{
						//apply shapes
						if(_.has(cd,'entityDefProperties')){
							if(_.has(cd.entityDefProperties,"entityDef")){
								return cd.entityDef;
							}
						}
					}
				},


			setBuildMapMarkers : function(chartDefinition,values){
				var cd = chartDefinition;
				var queryDataset = values;

			 	//create markers object
			 	var markers = {};
				// markersProperties default value
				if(!_.has(cd,"markersProperties")){
					cd.markersProperties = {};
				}
				//apply items CallBack
				if(_.has(cd.markersProperties, 'itemsCallback')){queryDataset = ChartUtils.prototype.applyCallBack(queryDataset, cd.markersProperties.itemsCallback);};
				// add items to markers
				markers.items = queryDataset;

				// check if needs connectors
				if(_.has(cd,"connectorsDataAccessId")){
					// query for connectors
					queryDataset = ChartUtils.prototype.doCDAQuery(cd.path,cd.connectorsDataAccessId, this._parameters);
					queryDataset = ChartUtils.prototype.buildData(queryDataset);
					//apply connectors callback
					if(_.has(cd.markersProperties, 'connectorsCallback')){queryDataset = ChartUtils.prototype.applyCallBack(queryDataset, cd.markersProperties.connectorsCallback);};
					// add items to markers
					markers.connectors = queryDataset;
				}else{
					//apply connectors
					if(_.has(cd.markersProperties,"connectors")){
						markers.connectors = cd.markersProperties.connectors;
					}
				}
				// check if needs shapes
				if(_.has(cd,"shapesDataAccessId")){
					// query for connectors
					queryDataset = ChartUtils.prototype.doCDAQuery(cd.path,cd.shapesDataAccessId, this._parameters);
					queryDataset = ChartUtils.prototype.buildData(queryDataset);
					//apply connectors callback
					if(_.has(cd.markersProperties, 'shapesCallback')){queryDataset = ChartUtils.prototype.applyCallBack(queryDataset,cd.markersProperties.shapesCallback);};
					// add items to markers
					markers.shapes = queryDataset;
				}else{
					//apply shapes
					if(_.has(cd.markersProperties,"shapes")){
						markers.shapes = cd.markersProperties.shapes;
					}
				}
				return markers;
			},

			setBuildMapDataSet : function(chartDefinition,values){
				
				var cd = chartDefinition;
				var queryDataset = values;
				// apply callback
				if(_.has(cd,'dataSetProperties')){
					if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = ChartUtils.prototype.applyCallBack(queryDataset, cd.dataSetProperties.dataSetCallback);};
				}
				//verify properties
				var hasProperties = ChartUtils.prototype.hasRequiredProperties(queryDataset,['id','value']);
				if(!hasProperties[0]){
					 $("#"+this._htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong>"+ "Data is "+hasProperties[1]+"</div>");
					 return;
				};
				// create the chart data
				return queryDataset;
			},

		}
		return Maps;
	});