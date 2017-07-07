
define([
	'cdf/lib/jquery',
	'amd!cdf/lib/underscore'
], function ($, _) {
	'use strict';

	function ChartUtils() {

	}

	ChartUtils.prototype = {

		getCdeChartProperties: function () {
			return this._CdeChartProperties = {
				'properties': {
					"chartProperties": {
						"scriptProperties": "chartScriptProperties",
						"changeProperties": null,
					},
					"dataSetProperties": {
						"scriptProperties": "dataSetScriptProperties",
						"changeProperties": [['datasetColor', 'color']],
					},
					"connectorsProperties": {
						"scriptProperties": "connectorsScriptProperties",
						"changeProperties": [['connectorColor', 'color']],
					},
					"trendlinesProperties": {
						"scriptProperties": "trendlinesScriptProperties",
						"changeProperties": null,
					},
					"vtrendlinesProperties": {
						"scriptProperties": "vtrendlinesScriptProperties",
						"changeProperties": null,
					},
					"labelsProperties": {
						"scriptProperties": "labelsScriptProperties",
						"changeProperties": null,
					},
					"categoriesProperties": {
						"scriptProperties": "categoriesScriptProperties",
						"changeProperties": [['categoriesPath', 'path'], ['categoriesDataAccessId', 'dataAccessId']],
					},
					"linesetProperties": {
						"scriptProperties": "linesetScriptProperties",
						"changeProperties": [['linesetPath', 'path'], ['linesetDataAccessId', 'dataAccessId']],
					},
					"colorRangeProperties": {
						"scriptProperties": "colorRangeScriptProperties",
						"changeProperties": [['colorRangePath', 'path'], ['colorRangeDataAccessId', 'dataAccessId']],
					},
					"trendPointProperties": {
						"scriptProperties": "trendPointScriptProperties",
						"changeProperties": [['trendPointPath', 'path'], ['trendPointDataAccessId', 'dataAccessId']],
					},
				},
			};
		},

		getCdeGanttProperties: function () {
			return this._CdeGanttProperties = {
				'properties': {
					"tasksProperties": {
						"scriptProperties": "tasksProperties",
						"changeProperties": null,
					},
					"processesProperties": {
						"scriptProperties": "processesScriptProperties",
						"changeProperties": null,
					},
					"datatableProperties": {
						"scriptProperties": "datatableScriptProperties",
						"changeProperties": null,
					},
					"milestonesProperties": {
						"scriptProperties": "milestonesScriptProperties",
						"changeProperties": null,
					},
					"legendProperties": {
						"scriptProperties": "legendScriptProperties",
						"changeProperties": null,
					},
				},
			};
		},

		getCdeMapProperties: function () {
			return this._CdeMapProperties = {
				'properties': {
					"markersProperties": {
						"scriptProperties": "markersScriptProperties",
						"changeProperties": null,
					},
					"entityDefProperties": {
						"scriptProperties": "entityDefScriptProperties",
						"changeProperties": null,
					},
				},
			};
		},

		//////  Begin callbacks
		applyCallBack: function (dataset, _function) {
			dataset = dataset.map(function (i) {
				_function(i);
				return i
			});
			return dataset;
		},

		applyGroupedCallBack: function (dataset, _function, propertyName, subGroupName) {
			dataset = dataset.map(function (i) {
				i[subGroupName] = i[subGroupName].map(function (j) {
					_function(i[propertyName], j);
					return j;
				});
				return i
			});
			return dataset;
		},
		///////  END Callbacks


		////// METHOD FOR THE REALTIME CDA QUERIES
		doCDAQuery: function (cdaPath, cdaDataAcessId, parameters) {
			var prefix = 'param';
			var queryData = {};
			var path = window.location.pathname.split('/');
			if (typeof parameters !== 'undefined') {
				for (var i = 0; i < _.size(parameters); i++) {
					queryData[prefix.concat(parameters[i][0])] = parameters[i][1];
				};
			};
			var responseText = $.ajax({ type: 'GET', dataType: 'json', url: window.location.origin + "/" + path[1] + "/" + "plugin/cda/api/doQuery?dataAccessId=" + cdaDataAcessId + "&path=" + cdaPath, data: queryData, async: false }).responseText;
			return JSON.parse(responseText);
		},

		/////// CHART PROPERTIES METHODS  TODO REVIEW ALL CODE IN THIS SECTION
		buildChartCategories: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;

			if (_.has(cd.categoriesProperties, 'dataAccessId') && _.has(cd.categoriesProperties, 'path')) {
				var resultset = this.doCDAQuery(cd.categoriesProperties.path, cd.categoriesProperties.dataAccessId, myself.parameters);
				//Evaluate chart type (Gantt or other)

				//TODO Move this code to the gantt sub class
				if (cd.chartType.toLowerCase() === "gantt") {
					resultset = this.buildGroupedData(resultset, 'categoryName', 'category');
					if (_.has(cd.categoriesProperties, 'categoriesCallback')) { resultset = this.applyCallBack(resultset, cd.categoriesProperties.categoriesCallback); };
					if (_.has(cd.categoriesProperties, 'categoryCallback')) { resultset = this.applyGroupedCallBack(resultset, cd.categoriesProperties.categoryCallback, 'categoryName', 'category'); };
					return resultset;
				} else {
					resultset = this.buildData(resultset);
					//apply trendlines callback function
					if (_.has(cd.categoriesProperties, 'categoryCallback')) { resultset = this.applyCallBack(resultset, cd.categoriesProperties.categoryCallback); };
					cd.categoriesProperties.category = resultset;
					return [cd.categoriesProperties];
				}
			} else {
				if (_.has(cd.categoriesProperties, 'categories')) {
					return cd.categoriesProperties.categories;
				};
			};
		},

		buildChartTrendlines: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;
			if (_.has(cd.trendlinesProperties, 'dataAccessId') && _.has(cd.trendlinesProperties, 'path')) {
				var responseText = this.doCDAQuery(cd.trendlinesProperties.path, cd.trendlinesProperties.dataAccessId, myself.parameters);
				var resultset = this.buildData(responseText);
				//apply trendlines callback function
				if (_.has(cd.trendlinesProperties, 'lineCallback')) {
					resultset = this.applyCallBack(resultset, cd.trendlinesProperties.lineCallback);
				};
				// draw horizontal trendlines
				return [{ line: resultset }];
			} else {
				if (_.has(cd.trendlinesProperties, 'trendlines')) {
					return cd.trendlinesProperties.trendlines;
				};
			};
		},

		buildChartVerticalTrendlines: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;
			if (_.has(cd.vtrendlinesProperties, 'dataAccessId') && _.has(cd.vtrendlinesProperties, 'path')) {
				var responseText = this.doCDAQuery(cd.vtrendlinesProperties.path, cd.vtrendlinesProperties.dataAccessId, myself.parameters);
				var resultset = this.buildData(responseText);
				//apply trendlines callback function
				if (_.has(cd.vtrendlinesProperties, 'vlineCallback')) {
					resultset = this.applyCallBack(resultset, cd.vtrendlinesProperties.vlineCallback);
				};
				// draw vertical trendlines
				return [{ line: resultset }];
			} else {
				if (_.has(cd.vtrendlinesProperties, 'vtrendlines')) {
					return cd.vtrendlinesProperties.vtrendlines;
				};
			};
		},

		buildChartLabels: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;
			if (_.has(cd.labelsProperties, 'dataAccessId') && _.has(cd.labelsProperties, 'path')) {
				var responseText = this.doCDAQuery(cd.labelsProperties.path, cd.labelsProperties.dataAccessId, myself.parameters);
				var resultset = this.buildData(responseText);
				//apply trendlines callback function
				if (_.has(cd.labelsProperties, 'labelCallback')) {
					resultset = this.applyCallBack(resultset, cd.labelsProperties.labelCallback);
				};
				return { label: resultset };
			} else {
				if (_.has(cd.labelsProperties, 'labels')) {
					return cd.labelsProperties.labels;
				};
			};
		},

		buildChartTrendPoints: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;

			if (_.has(cd.trendPointProperties, 'dataAccessId') && _.has(cd.trendPointProperties, 'path')) {
				var responseText = this.doCDAQuery(cd.trendPointProperties.path, cd.trendPointProperties.dataAccessId, myself.parameters);
				var resultset = this.buildData(responseText);
				//apply trendlines callback function
				if (_.has(cd.trendPointProperties, 'pointCallback')) {
					resultset = this.applyCallBack(resultset, cd.trendPointProperties.pointCallback);
				};
				cd.trendPointProperties.point = resultset;
				return [cd.trendPointProperties];
			} else {
				if (_.has(cd.trendPointProperties, 'trendPoint')) {
					return cd.trendPointProperties.trendPoint;
				};
			};
		},

		buildChartLineset: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;

			if (_.has(cd.linesetProperties, 'dataAccessId') && _.has(cd.linesetProperties, 'path')) {
				var responseText = this.doCDAQuery(cd.linesetProperties.path, cd.linesetProperties.dataAccessId, myself.parameters);
				var resultset = this.buildGroupedData(responseText, 'seriesname', 'data');
				//apply Call Backs
				if (_.has(cd.linesetProperties, 'linesetCallback')) { resultset = this.applyCallBack(resultset, cd.linesetProperties.linesetCallback); };
				if (_.has(cd.linesetProperties, 'linesetDataCallback')) { resultset = this.applyGroupedCallBack(resultset, cd.linesetProperties.linesetDataCallback, 'seriesname', 'data'); };

				return resultset;
			}
		},

		buildChartColorRange: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;

			if (_.has(cd.colorRangeProperties, 'dataAccessId') && _.has(cd.colorRangeProperties, 'path')) {
				var responseText = this.doCDAQuery(cd.colorRangeProperties.path, cd.colorRangeProperties.dataAccessId, myself.parameters);
				var resultset = this.buildData(responseText);
				if (_.has(cd.colorRangeProperties, 'colorCallback')) { resultset = this.applyCallBack(resultset, cd.colorRangeProperties.colorCallback); };
				return { color: resultset };
			} else {
				if (_.has(cd.colorRangeProperties, 'colorRange')) {
					return { color: cd.colorRangeProperties.colorRange };
				};
			}
		},

		buildChartLegend: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;
			if (_.has(cd.legendProperties, 'dataAccessId') && _.has(cd.legendProperties, 'path')) {
				var responseText = this.doCDAQuery(cd.legendProperties.path, cd.legendProperties.dataAccessId, myself.parameters);
				var resultset = this.buildData(responseText);
				cd.legendProperties.item = resultset;
			}
			return cd.legendProperties;
		},

		buildChartAnnotations: function (chartDefinition) {
			var myself = this;
			var cd = chartDefinition;

			if (_.has(cd.annotationsProperties, 'dataAccessId') && _.has(cd.annotationsProperties, 'path')) {
				var responseText = this.doCDAQuery(cd.annotationsProperties.path, cd.annotationsProperties.dataAccessId, myself.parameters);
				var resultset = this.buildGroupedData(responseText, 'id', 'items');

				if (_.has(cd.annotationsProperties, 'groupsCallback')) { resultset = this.applyCallBack(resultset, cd.annotationsProperties.groupsCallback); };
				if (_.has(cd.annotationsProperties, 'itemsCallback')) { resultset = this.applyGroupedCallBack(resultset, cd.annotationsProperties.itemsCallback, 'id', 'items'); };

				cd.annotationsProperties.groups = resultset;
			}
			return cd.annotationsProperties;
		},


		/////// END OF THE CHART PROPERTIES METHODS

		/////// FOR REALTIME CHARTS
		buildRealTimeData: function (queryData) {
			var cols = [];
			for (var i = 0; i < queryData.metadata.length; i++) {
				cols.push([queryData.metadata[i].colName, ""]);
			}
			for (var i = 0; i < queryData.resultset.length; i++) {
				var row = queryData.resultset[i];
				for (var j = 0; j < row.length; j++) {
					if (cols[j][0].match("label")) {
						if (cols[j][1].length === 0) {
							cols[j][1] = cols[j][1].concat(row[j] + "|");
						}
					} else {
						cols[j][1] = cols[j][1].concat(row[j] + "|");
					}
				}
			}
			var qData = "";
			for (var i = 0; i < cols.length; i++) {
				qData = qData + "&" + cols[i][0] + "=" + cols[i][1].substring(0, cols[i][1].length - 1);;
			}
			return qData;
		},

		//// FOR DATA CHARTS
		buildData: function (queryData) {
			var cdacolumns = [];
			for (var i = 0; i < queryData.metadata.length; i++) {
				cdacolumns.push(queryData.metadata[i].colName);
			}
			return queryData.resultset.map(function (dt) {
				var data = {};
				for (var i = 0; i < cdacolumns.length; i++) {
					data[cdacolumns[i]] = dt[i];
				}
				return data;
			});
		},


		///// FOR SERIES CHARTS
		buildGroupedData: function (queryData, groupby, subgroup) {
			var qData = [];
			var cdacolumns = [];
			var seriescolumn = 0;
			for (var i = 0; i < queryData.metadata.length; i++) {
				if (queryData.metadata[i].colName === groupby) { seriescolumn = i; }
				cdacolumns.push(queryData.metadata[i].colName);
			}

			for (var i = 0; i < queryData.resultset.length; i++) {
				var data = {};
				var row = queryData.resultset[i];
				for (var j = 0; j < row.length; j++) {
					if (j != seriescolumn) { data[cdacolumns[j]] = row[j] }
				}
				var serie_row = this.lookup_seriesname(row[seriescolumn], qData, groupby);
				if (serie_row === qData.length) {
					var hash = {};
					hash[groupby] = row[seriescolumn];
					hash[subgroup] = [data];
					qData.push(hash);
				} else {
					qData[serie_row][subgroup].push(data);
				}
			}
			return qData;
		},


		///// FOR SERIESCOLUMN CHARTS
		buildGroupedColumnData: function (queryData, groupName, subGroupName, propertyName) {
			var qData = [];
			var cdacolumns = [];
			for (var i = 0; i < queryData.metadata.length; i++) {
				var hash = {};
				hash[groupName] = queryData.metadata[i].colName;
				hash[subGroupName] = [];
				qData.push(hash);
			}

			for (var i = 0; i < queryData.resultset.length; i++) {
				var row = queryData.resultset[i];
				for (var j = 0; j < row.length; j++) {
					var hash = {};
					hash[propertyName] = row[j];
					qData[j][subGroupName].push(hash);
				}
			}
			return qData;
		},


		///// AUXILIAR METHODS
		lookup_seriesname: function (name, array, seriesname) {
			for (var i = 0, len = array.length; i < len; i++) {
				if (array[i][seriesname] === name)
					return i;
			};
			return array.length;
		},

		hasRequiredProperties: function (queryDataset, properties, subProperty) {
			if (subProperty != undefined) {
				var arr = [];
				for (var i = 0; i < queryDataset.length; i++) {
					arr = arr.concat(queryDataset[i][subProperty]);
				}
				queryDataset = arr;
			}
			for (var i = 0; i < queryDataset.length; i++) {
				for (var j = 0; j < properties.length; j++) {
					if (!queryDataset[i].hasOwnProperty(properties[j])) {
						return [false, "missing property '" + properties[j] + "'"]
					};
				};
			};
			return [true, ""];
		},

		/*
* This function fixes the CDE properties that should be inside de chartDefinition but are outside of it.
* Parameters: Chart, Chart Definition, Properties Name,(Optional) JavaScript Properties Name and properties that need the name changed
* Returns: Chart Definition
*/
		chartDefinitionCDEproperties: function (chart, properties) {
			if (!_.isEmpty(properties)) {
				console.log("Parse object");
				for (var key in properties.properties) {

					if (_.has(chart, key)) {
						if (_.has(chart[key], properties.properties[key].scriptProperties)) {
							//chart.chartDefinition[properties.properties[key].scriptProperties] = {};
							//_.extend(chart.chartDefinition[properties.properties[key].scriptProperties], chart[key][properties.properties[key].scriptProperties]);
							//delete chart[key][properties.properties[key].scriptProperties]
							_.extend(chart[key], chart[key][properties.properties[key].scriptProperties]);
							delete chart[key][properties.properties[key].scriptProperties]
						}
						chart.chartDefinition[key] = {};
						_.extend(chart.chartDefinition[key], chart[key]);
						if (properties.properties[key].changeProperties != null) {
							$.each(properties.properties[key].changeProperties, function(i, el){
			 				 if(_.has(chart.chartDefinition[key],el[0])){
			 					 chart.chartDefinition[key][el[1]] = chart.chartDefinition[key][el[0]]
								 delete chart.chartDefinition[key][el[0]]
			 				 }
			 			 });

						}
						delete chart[key];
					}
				}
			}
		},

		calculateRelativePath : function(cdaPath,location){
 		 //if has relative path in CDA calculates the absolute path
 			var dashboardPathArray=location.split("/");
 			dashboardPathArray.pop();
 			var cdaPathArray=decodeURI(cdaPath).split("%2F")[0].split("/");
 			var i=0;
 			if(cdaPathArray[0]=="..")
 			{
 					for (;i<cdaPathArray.length;++i)
 					{
 							if(cdaPathArray[0]=="..")
 							{
 									dashboardPathArray.pop();
 									cdaPathArray.shift();
 							}
 					}
 					cdaPath=dashboardPathArray.concat(cdaPathArray).join("/");
 			}
 			return cdaPath;
 	 }
	}

	return ChartUtils;
});
