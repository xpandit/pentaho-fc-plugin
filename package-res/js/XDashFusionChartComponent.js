/**
 *
 * This CDF component renders the chart client-side assincronously
 *
 */

var XPFusionChartComponent = UnmanagedComponent.extend({
	 update: function() {
		var render = _.bind(this.render, this);
		this.chartDefinition.path=this.calculateRelativePath(this.chartDefinition.path,Dashboards.context.path);
		this.triggerQuery(this.chartDefinition, render);
	 },

	 render: function(values) {
		  var myself = this;
		 var cd = myself.chartDefinition;
		 if(!sessionStorage.getItem("validFusionKey") || !sessionStorage.getItem("validFusionXT")){

			 //validate fusion plugin key
			 var urlApi = webAppPath + '/plugin/fusion_plugin/api/verifyKey';
			 var fusionkey = $.ajax({type: 'GET', url: urlApi, async: false, error: function(xhr, textStatus, error){alert("Error while validating your key. Make sure your key is valid")}}).responseText;
			 // error validating key
			 if(fusionkey.match("<html >")){
				 $("#"+myself.htmlObject).html(fusionkey);
				 return;
			 }
			 // error key expired
			 fusionkey = fusionkey.split("-", 2);
			 if(fusionkey[0].match("Error")){
	         	fusionkey[0] = fusionkey[0].replace("Error:"," ");
	         	$("#"+myself.htmlObject).html("<div class=\"alert alert-danger\"><strong>Error!</strong>"+fusionkey[0]+"</div>");
	         	return;
	     }else{
				 sessionStorage.validFusionKey=true;
			 }
			 // Error fusion XT not installed
			 if (fusionkey[1].match("true")) {
			    $("#"+myself.htmlObject).html("<div class=\"alert alert-danger\">You need to install FusionCharts XT to render the chart</div>");
				return;
			}else{
				sessionStorage.validFusionXT=true;
			}
		 }
		 if (!_.has(cd, 'chartType')){
			 // display missing options error
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\">Missing Chart Type (chartType)</div>");
			 return;
		 }
		 if (!_.has(myself, 'htmlObject')){
			 // display missing options error
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\">Missing HTML Object ID (htmlObject)</div>");
			 return;
		 }

		 //apply default value to width if not defined
		 if(!_.has(cd, 'width')){
			 cd.width = 500;
		 }
		 //apply default value to height if not defined
		 if(!_.has(cd, 'height')){
			 cd.height = 300;
		 }

		 //Fix CDE properties
		 cd = chartDefinitionCDEproperties(myself,cd,'chartProperties','chartScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'dataSetProperties','dataSetScriptProperties',[['datasetColor','color']]);
		 cd = chartDefinitionCDEproperties(myself,cd,'connectorsProperties','connectorsScriptProperties',[['connectorColor','color']]);
		 cd = chartDefinitionCDEproperties(myself,cd,'trendlinesProperties','trendlinesScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'vtrendlinesProperties','vtrendlinesScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'labelsProperties','labelsScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'categoriesProperties','categoriesScriptProperties',[['categoriesPath','path'],['categoriesDataAccessId','dataAccessId']]);
		 cd = chartDefinitionCDEproperties(myself,cd,'linesetProperties','linesetScriptProperties',[['linesetPath','path'],['linesetDataAccessId','dataAccessId']]);
		 cd = chartDefinitionCDEproperties(myself,cd,'colorRangeProperties','colorRangeScriptProperties',[['colorRangePath','path'],['colorRangeDataAccessId','dataAccessId']]);
		 cd = chartDefinitionCDEproperties(myself,cd,'trendPointProperties','trendPointScriptProperties',[['trendPointPath','path'],['trendPointDataAccessId','dataAccessId']]);

		 //CDE Gantt Properties
		 cd = chartDefinitionCDEproperties(myself,cd,'tasksProperties','tasksScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'processesProperties','processesScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'datatableProperties','datatableScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'milestonesProperties','milestonesScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'legendProperties','legendScriptProperties');
		 //CDE Maps Properties
		 cd = chartDefinitionCDEproperties(myself,cd,'markersProperties','markersScriptProperties');
		 cd = chartDefinitionCDEproperties(myself,cd,'entityDefProperties','entityDefScriptProperties');

		 //allow chartDefinition functions
		 $.map(cd,function(v,k){return typeof cd[k]=="function"?cd[k]=cd[k]():cd[k]=v});

		 // Creating chart basic options
		 var fusionOptions = {
			 "type"				: cd.chartType,
			 "renderAt"		: myself.htmlObject,
			 "width"			: cd.width,
			 "height"			: cd.height,
			 "dataFormat"	: "json"
		 };

		 // verify if chartProperties exists
		 if(!_.has(cd,'chartProperties')){
			 cd.chartProperties = {};
		 }

		 //allow chartProperties functions
		 $.map(cd.chartProperties,function(v,k){return typeof cd.chartProperties[k]=="function"?cd.chartProperties[k]=cd.chartProperties[k]():cd.chartProperties[k]=v});

		 //choose between map or chart
		 if(fusionOptions.type.toLowerCase().match(/maps\/.*/g)){
			 var data = myself.buildMap(cd,values);
		 }else {
			 if (typeof XPCharts === 'undefined') {
				 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing XPCharts</strong> Import the XPCharts.js file</div>");
				 return;
			 }
			 // switch chart type
			 var XDashChartType = XPCharts[fusionOptions.type.toLowerCase()];
			 switch (XDashChartType) {
				 case "dataSetAndConnectors":
				 	var data = myself.buildChartDataSetAndConnectors(cd,values);
			 		break;
					// Cases where the the chart uses a data object
				 case "data":
				 	var data = myself.buildChartData(cd,values);
					break;
					// Cases where the chart as the data separated by series
				 case "series":
				 	var data = myself.buildChartSeries(cd,values);
					break;
					//Charts where the chart has multiple datasets separated by series
				 case "multipleDataSets":
				 	var data = myself.buildChartMultipleDataSets(cd,values);
					break;
					//Charts builded with the series name as the column name
				case "seriesColumn":
					var data = myself.buildChartSeriesColumn(cd,values);
					break;
					//Charts with a data object inside of the dataset object
				case "dataSet":
					var data = myself.buildChartDataSet(cd,values);
					break;
					//Charts with dials instead of dataset
				case "dials":
					var data = myself.buildChartDials(cd,values);
					break;
					//Charts without dataset that use value and target for data
				case "value":
					var data = myself.buildChartValue(cd,values);
					break;
					//Charts with pointers instead of dataset
				case "pointers":
					var data = myself.buildChartPointers(cd,values);
					break;
				case "gantt":
					var data = myself.buildChartWithTasks(cd,values);
					break;
			 	default:
					$("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Chart Not Supported!</strong> This chart is not supported by the component</div>");
					return;
			 }
		 }
		 // exit if can't create chart
		 if(typeof data ==='undefined'){return;};

		 // add trend lines to chart
		 if(_.has(cd, 'trendlinesProperties')){
			 data.trendlines = myself.buildChartTrendlines(cd);
		 };

		 // add trend lines to chart
		 if(_.has(cd, 'vtrendlinesProperties')){
			 data.vtrendlines = myself.buildChartVerticalTrendlines(cd);
		 };

		 // add labels to chart
		 if(_.has(cd, 'labelsProperties')){
			 data.labels = myself.buildChartLabels(cd);
		 };

		 // add categories to chart
		 if(_.has(cd, 'categoriesProperties')){
			 data.categories = myself.buildChartCategories(cd);
		 };

		 // add trendPoints to chart
		 if(_.has(cd, 'trendPointProperties')){
			 data.trendpoints = myself.buildChartTrendPoints(cd);
		 };

		 // add lineset to chart
		 if(_.has(cd, 'linesetProperties')){
			 data.lineset = myself.buildChartLineset(cd);
		 };

		 // add color Range to chart
		 if(_.has(cd, 'colorRangeProperties')){
			 data.colorrange = myself.buildChartColorRange(cd);
		 };

		 // add legend to chart
		 if(_.has(cd, 'legendProperties')){
			 data.legend = myself.buildChartLegend(cd);
		 };

		 // add annotations to chart
		 if(_.has(cd, 'annotationsProperties')){
			 data.annotations = myself.buildChartAnnotations(cd);
		 };

		 // create Fusion chart and render
		 if(myself.chartObject == undefined) {
			 myself.chartObject = new FusionCharts(fusionOptions);
			 myself.chartObject.setJSONData(data);
			 myself.chartObject.render();
		 } else {
			 myself.chartObject.setJSONData(data);
		 }

		 //Apply refresh to realtime chart
		 if(_.has(cd,'cdaRefreshInterval')){
			 setInterval(function(){
				 	var responseText = doCDAQuery(cd.path,cd.dataAccessId,myself.parameters);
					var dataset = buildRealTimeData(responseText);
					myself.chartObject.feedData(dataset);
			 }, cd.cdaRefreshInterval*1000);
		 };
	 },

	 buildChartDataSetAndConnectors: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;
		 //error missing connectorsDataAccessId
		 if (!_.has(cd,'connectorsDataAccessId')){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Property!</strong> Connectors Data Access ID</div>");
			 return;
		 }
		 //error missing connectors properties
		 if(!_.has(cd, 'connectorsProperties')){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-danger\"><strong>Error!</strong>Missing connectorsProperties</div>");
			 return;
		 }

		 // build the parameters for the dataSet
		 var queryDataset = buildData(values);

		 //build the parameters for the connectors
		 if(_.has(cd,'connectorsPath')){
			 var resultset = doCDAQuery(cd.connectorsPath,cd.connectorsDataAccessId,myself.parameters);
		 }else{
			 var resultset = doCDAQuery(cd.path,cd.connectorsDataAccessId,myself.parameters);
		 }
		 var queryConnectors = buildData(resultset);

		 //verify if dataSetProperties exists
		 if(!_.has(cd,'dataSetProperties')){
			 cd.dataSetProperties = {};
		 }
		 //apply node callback function
		 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};

		 //verify if dataSetProperties exists
		 if(!_.has(cd,'connectorsProperties')){
			 cd.connectorsProperties = {};
		 }
		 //apply connectors callback function
		 if(_.has(cd.connectorsProperties, 'connectorCallback')){queryConnectors = applyCallBack(queryConnectors,cd.connectorsProperties.connectorCallback);};

		 //verify if dataset has required properties
		 var hasProperties = hasRequiredProperties(queryDataset,XPChartsDataSetAndConnectors.requiredProperties);

		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong>Nodes are "+hasProperties[1]+"</div>");
			 return;
		 }

		 //verify if connectors have required parameters
		 hasProperties = hasRequiredProperties(queryConnectors,XPChartsDataSetAndConnectors.requiredConnectorsProperties);
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Connectors are "+hasProperties[1]+"</div>");
			 return;
		 }

		 // add nodes data to dataset
		 cd.dataSetProperties.data = queryDataset;
		 // add connectors data to connectors properties
		 cd.connectorsProperties.connector = queryConnectors;
		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
			 "dataset": [cd.dataSetProperties],
			 "connectors":[cd.connectorsProperties]
		 };
		 return data;
	 },

	 buildChartData: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // build data
		 var queryDataset = buildData(values);
		 // apply callback
		 if(_.has(cd,'dataSetProperties')){
			 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
		 }
		 //verify properties
		 var hasProperties = hasRequiredProperties(queryDataset,XPChartsData.requiredProperties);
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong>Data is "+hasProperties[1]+"</div>");
			 return;
		 };
		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
			 "data": queryDataset
		 };
		 return data;
	 },

	 buildChartSeries: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // build dataset
		 var queryDataset = buildGroupedData(values,'seriesname','data');
		 //apply callback
		 if(_.has(cd,'dataSetProperties')){
				 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
				 if(_.has(cd.dataSetProperties, 'dataCallback')){queryDataset = applyGroupedCallBack(queryDataset,cd.dataSetProperties.dataCallback,'seriesname','data');};
		 }

		 // Verify required properties
		 var hasProperties = hasRequiredProperties(queryDataset,XPChartsSeries.requiredProperties,'data');
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Data is "+hasProperties[1]+"</div>");
			 return;
		 };
		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
			 "dataset": queryDataset
		 };

		 return data;
	 },

	 buildChartMultipleDataSets: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // chart requires a array of objects (datasets)
		 var dataset = [];
		 // build the first dataset
		 var queryDataset = buildGroupedData(values,'seriesname','data');
		 //apply callback
		 if(_.has(cd,'dataSetProperties')){
				 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
				 if(_.has(cd.dataSetProperties, 'dataCallback')){queryDataset = applyGroupedCallBack(queryDataset,cd.dataSetProperties.dataCallback,'seriesname','data');};
		 }
		 // Verify required properties
		 var hasProperties = hasRequiredProperties(queryDataset,XPChartsMultipleDataSets.requiredProperties,'data');
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Data is "+hasProperties[1]+"</div>");
			 return;
		 };
		 dataset.push({dataset:queryDataset});

		 //build the other datasets
		 for (var i = 0; i < cd.cdaArray.length; i++) {
			 var resultset = doCDAQuery(cd.cdaArray[i].path,cd.cdaArray[i].dataAccessId,myself.parameters);
			 queryDataset = buildGroupedData(resultset,'seriesname','data');
			 //apply callback
			 if(_.has(cd,'dataSetProperties')){
					 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
					 if(_.has(cd.dataSetProperties, 'dataCallback')){queryDataset = applyGroupedCallBack(queryDataset,cd.dataSetProperties.dataCallback,'seriesname','data');};
			 }
			 // Verify required properties
			 var hasProperties = hasRequiredProperties(queryDataset,XPChartsMultipleDataSets.requiredProperties, 'data');
			 if(!hasProperties[0]){
				 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Data is "+hasProperties[1]+"</div>");
				 return;
			 };
			 dataset.push({dataset:queryDataset});
		 }
		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
			 "dataset": dataset
		 };

		 return data;
	 },

	 buildChartSeriesColumn: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // build data
		 var queryDataset = buildGroupedColumnData(values,'seriesname','data','value');
		 //apply callback
		 if(_.has(cd,'dataSetProperties')){
				 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
				 if(_.has(cd.dataSetProperties, 'dataCallback')){queryDataset = applyGroupedCallBack(queryDataset,cd.dataSetProperties.dataCallback,'seriesname','data');};
		 }

		 // Verify required properties
		 var hasProperties = hasRequiredProperties(queryDataset,XPChartsSeriesColumn.requiredProperties, 'data');
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Data is "+hasProperties[1]+"</div>");
			 return;
		 };
		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
			 "dataset": queryDataset
		 };
		 return data;
	 },

	 buildChartDataSet: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // build data
		 var queryDataset = buildData(values);
		 //verify datasetproperties
		 if(!_.has(cd,'dataSetProperties')){
			 cd.dataSetProperties = {};
		 }
		 //apply callback
		 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
		 //verify required Properties
		 hasProperties = hasRequiredProperties(queryDataset,XPChartsDataSet.requiredProperties);
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Data is "+hasProperties[1]+"</div>");
			 return;
		 };
		 //Add data to dataset
		 cd.dataSetProperties.data = queryDataset;
		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
			 "dataset": [cd.dataSetProperties],
		 };

		 return data;
	 },

	 buildChartDials: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // build data
		 var queryDataset = buildData(values);
		 //apply callback
		 if(_.has(cd, 'dataSetProperties')){
			 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
		 };
		 hasProperties = hasRequiredProperties(queryDataset,XPChartsDials.requiredProperties);
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Dial is "+hasProperties[1]+"</div>");
			 return;
		 };
		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
			 "dials":{"dial":queryDataset}
		 };

		 return data;
	 },

	 buildChartValue: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // build data
		 var queryDataset = buildData(values);
		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
		 };
		 hasProperties = hasRequiredProperties(queryDataset,XPChartsValue.requiredProperties);
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Dial is "+hasProperties[1]+"</div>");
			 return;
		 };
		 //add to chart data properties like value and target
		 for(var key in queryDataset[0]){
			 data[key] = queryDataset[0][key];
		 };

		 return data;
	 },

	 buildChartPointers: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // build data
		 var queryDataset = buildData(values);
		 //apply callback
		 if(_.has(cd, 'dataSetProperties')){
			 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
		 };
		 // create the chart data
		 hasProperties = hasRequiredProperties(queryDataset,XPChartsPointers.requiredProperties);
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Pointer is "+hasProperties[1]+"</div>");
			 return;
		 };
		 var data = {
			 "chart": cd.chartProperties,
			 "pointers":{"pointer":queryDataset}
		 };

		 return data;
	 },

	 buildChartWithTasks: function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // verify Properties
		 if(!_.has(cd,'processesProperties')){cd.processesProperties = {}};
		 if(!_.has(cd,'datatableProperties')){cd.datatableProperties = {}};
		 if(!_.has(cd,'tasksProperties')){cd.tasksProperties = {}};
		 if(!_.has(cd,'milestonesProperties')){cd.milestonesProperties = {}};
		 if(!_.has(cd,'connectorsProperties')){cd.connectorsProperties = {}};

		 //Tasks
		 //get Chart Data
		 var tasksData = buildData(values);
		 // apply Callback
		 if(_.has(cd.tasksProperties,'taskCallback')){tasksData = applyCallBack(tasksData,cd.tasksProperties.taskCallback);};
		 //Verify Required Properties
		 hasProperties = hasRequiredProperties(tasksData,XPChartsGantt.requiredTasksProperties);
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong> Tasks are "+hasProperties[1]+"</div>");
			 return;
		 };
		 //apply Properties
		 cd.tasksProperties.task = tasksData;

		 //Processes
		 if(_.has(cd,'processesPath') && _.has(cd,'processesDataAccessId')){
			 // get Chart data
			 var responseText = doCDAQuery(cd.processesPath,cd.processesDataAccessId,myself.parameters);
			 var processesData = buildData(responseText);
			 //apply Callback
			 if(_.has(cd.processesProperties,'processCallback')){processesData = applyCallBack(processesData,cd.processesProperties.processCallback);};
			 //verify requiredProperties
			 var hasProperties = hasRequiredProperties(processesData,XPChartsGantt.requiredProcessesProperties);
			 if(!hasProperties[0]){
				 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Processes are "+hasProperties[1]+"</div>");
				 return;
			 };
			 //apply Properties
			 cd.processesProperties.process = processesData;
		 }

		 //Datatable
		 if(_.has(cd,'datatablePath') && _.has(cd,'datatableDataAccessId')){
			 // get Chart data
			 var responseText = doCDAQuery(cd.datatablePath,cd.datatableDataAccessId,myself.parameters);
			 var datatableData = buildGroupedColumnData(responseText,'headertext','text','label');
			 //apply Callback
			 if(_.has(cd.datatableProperties,'textCallback')){datatableData = applyGroupedCallBack(datatableData,cd.datatableProperties.textCallback,'headertext','text');};
			 if(_.has(cd.datatableProperties,'datacolumnCallback')){datatableData = applyCallBack(datatableData,cd.datatableProperties.datacolumnCallback);};
			 //verify requiredProperties
			 hasProperties = hasRequiredProperties(datatableData,XPChartsGantt.requiredDataTableProperties,'text');
			 if(!hasProperties[0]){
				 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> DataTable is "+hasProperties[1]+"</div>");
				 return;
			 };
			 //apply Properties
			 cd.datatableProperties.datacolumn = datatableData;
		 }

		 //Milestones
		 if(_.has(cd,'milestonesPath') && _.has(cd,'milestonesDataAccessId')){
			 // get Chart data
			 var responseText = doCDAQuery(cd.milestonesPath,cd.milestonesDataAccessId,myself.parameters);
			 var milestonesData = buildData(responseText);
			 //apply Callback
			 if(_.has(cd.milestonesProperties,'milestoneCallback')){milestonesData = applyCallBack(milestonesData,cd.milestonesProperties.milestoneCallback);};
			 //verify requiredProperties
			 hasProperties = hasRequiredProperties(milestonesData,XPChartsGantt.requiredMilestonesProperties);
			 if(!hasProperties[0]){
				 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Milestones are "+hasProperties[1]+"</div>");
				 return;
			 };
			 //apply Properties
			 cd.milestonesProperties.milestone = milestonesData;
		 }

		 //Connectors
		 if(_.has(cd,'connectorsPath') && _.has(cd,'connectorsDataAccessId')){
			 // get Chart data
			 var responseText = doCDAQuery(cd.connectorsPath,cd.connectorsDataAccessId,myself.parameters);
			 var connectorsData = buildData(responseText);
			 //apply Callback
			 if(_.has(cd.connectorsProperties,'connectorCallback')){connectorsData = applyCallBack(connectorsData,cd.connectorsProperties.connectorCallback);};
			 //verify requiredProperties
			 hasProperties = hasRequiredProperties(connectorsData,XPChartsGantt.requiredConnectorsProperties);
			 if(!hasProperties[0]){
				 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties! </strong> Connectors are "+hasProperties[1]+"</div>");
				 return;
			 };
			 //apply Properties
			 cd.connectorsProperties.connector = connectorsData;
		 }

		 // create the chart data
		 var data = {
			 "chart": cd.chartProperties,
			 "processes":cd.processesProperties,
			 "datatable":cd.datatableProperties,
			 "tasks":cd.tasksProperties,
			 "milestones":cd.milestonesProperties,
			 "connectors":[cd.connectorsProperties],
		 };
		 return data;
	 },

	 buildChartTrendlines: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;
		 if(_.has(cd.trendlinesProperties, 'dataAccessId') && _.has(cd.trendlinesProperties, 'path')){
			 var responseText = doCDAQuery(cd.trendlinesProperties.path,cd.trendlinesProperties.dataAccessId,myself.parameters);
			 var resultset = buildData(responseText);
			 //apply trendlines callback function
			 if(_.has(cd.trendlinesProperties, 'lineCallback')){
				 resultset = applyCallBack(resultset, cd.trendlinesProperties.lineCallback);
			 };
			 // draw horizontal trendlines
			 return [{line: resultset}];
		 }else{
			 if(_.has(cd.trendlinesProperties, 'trendlines')){
				  return cd.trendlinesProperties.trendlines;
			 };
		 };
	 },

	 buildChartVerticalTrendlines: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;
		 if(_.has(cd.vtrendlinesProperties, 'dataAccessId') && _.has(cd.vtrendlinesProperties, 'path')){
			 var responseText = doCDAQuery(cd.vtrendlinesProperties.path,cd.vtrendlinesProperties.dataAccessId,myself.parameters);
			 var resultset = buildData(responseText);
			 //apply trendlines callback function
			 if(_.has(cd.vtrendlinesProperties, 'vlineCallback')){
				 resultset = applyCallBack(resultset, cd.vtrendlinesProperties.vlineCallback);
			 };
			 // draw vertical trendlines
			 return [{line: resultset}];
		 }else{
			 if(_.has(cd.vtrendlinesProperties, 'vtrendlines')){
				 return cd.vtrendlinesProperties.vtrendlines;
			 };
		 };
	 },

	 buildChartLabels: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;
		 if(_.has(cd.labelsProperties, 'dataAccessId') && _.has(cd.labelsProperties, 'path')){
			 var responseText = doCDAQuery(cd.labelsProperties.path,cd.labelsProperties.dataAccessId,myself.parameters);
			 var resultset = buildData(responseText);
			 //apply trendlines callback function
			 if(_.has(cd.labelsProperties, 'labelCallback')){
				 resultset = applyCallBack(resultset, cd.labelsProperties.labelCallback);
			 };
			 return {label: resultset};
		 }else{
			 if(_.has(cd.labelsProperties, 'labels')){
				 return cd.labelsProperties.labels;
			 };
		 };
	 },

	 buildChartCategories: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;

		 if(_.has(cd.categoriesProperties, 'dataAccessId') && _.has(cd.categoriesProperties, 'path')){
			 var resultset = doCDAQuery(cd.categoriesProperties.path,cd.categoriesProperties.dataAccessId,myself.parameters);
			 //Evaluate chart type (Gantt or other)
			 if(cd.chartType.toLowerCase()==="gantt"){
				 resultset = buildGroupedData(resultset,'categoryName','category');
				 if(_.has(cd.categoriesProperties, 'categoriesCallback')){resultset = applyCallBack(resultset, cd.categoriesProperties.categoriesCallback);};
				 if(_.has(cd.categoriesProperties, 'categoryCallback')){resultset = applyGroupedCallBack(resultset, cd.categoriesProperties.categoryCallback,'categoryName','category');};
				 return resultset;
			 }else{
					resultset = buildData(resultset);
					//apply trendlines callback function
					if(_.has(cd.categoriesProperties, 'categoryCallback')){resultset = applyCallBack(resultset, cd.categoriesProperties.categoryCallback);};
					cd.categoriesProperties.category = resultset;
					return [cd.categoriesProperties];
			 }
		 }else{
			 if(_.has(cd.categoriesProperties, 'categories')){
				 return cd.categoriesProperties.categories;
			 };
		 };
	 },

	 buildChartTrendPoints: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;

		 if(_.has(cd.trendPointProperties, 'dataAccessId') && _.has(cd.trendPointProperties, 'path')){
			 var responseText = doCDAQuery(cd.trendPointProperties.path,cd.trendPointProperties.dataAccessId,myself.parameters);
			 var resultset = buildData(responseText);
			 //apply trendlines callback function
			 if(_.has(cd.trendPointProperties, 'pointCallback')){
				 resultset = applyCallBack(resultset, cd.trendPointProperties.pointCallback);
			 };
			 cd.trendPointProperties.point = resultset;
			 return [cd.trendPointProperties];
		 }else{
			 if(_.has(cd.trendPointProperties, 'trendPoint')){
				 return cd.trendPointProperties.trendPoint;
			 };
		 };
	 },

	 buildChartLineset: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;

		 if(_.has(cd.linesetProperties, 'dataAccessId') && _.has(cd.linesetProperties, 'path')){
			 var responseText = doCDAQuery(cd.linesetProperties.path,cd.linesetProperties.dataAccessId,myself.parameters);
			 var resultset = buildGroupedData(responseText,'seriesname','data');
			 //apply Call Backs
			 if(_.has(cd.linesetProperties, 'linesetCallback')){resultset = applyCallBack(resultset,cd.linesetProperties.linesetCallback);};
			 if(_.has(cd.linesetProperties, 'linesetDataCallback')){resultset = applyGroupedCallBack(resultset,cd.linesetProperties.linesetDataCallback,'seriesname','data');};

			 return resultset;
		 }
	 },

	 buildChartColorRange: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;

		 if(_.has(cd.colorRangeProperties, 'dataAccessId') && _.has(cd.colorRangeProperties, 'path')){
			 var responseText = doCDAQuery(cd.colorRangeProperties.path,cd.colorRangeProperties.dataAccessId,myself.parameters);
			 var resultset = buildData(responseText);
			 if(_.has(cd.colorRangeProperties, 'colorCallback')){resultset = applyCallBack(resultset,cd.colorRangeProperties.colorCallback);};
			 return {color: resultset};
		 }else{
			 if(_.has(cd.colorRangeProperties, 'colorRange')){
				 return {color: cd.colorRangeProperties.colorRange};
			 };
		 }
	 },

	 buildChartLegend: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;
		 if(_.has(cd.legendProperties, 'dataAccessId') && _.has(cd.legendProperties, 'path')){
			 var responseText = doCDAQuery(cd.legendProperties.path,cd.legendProperties.dataAccessId,myself.parameters);
			 var resultset = buildData(responseText);
			 cd.legendProperties.item = resultset;
		 }
		 return cd.legendProperties;
	 },

	 buildChartAnnotations: function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;

		 if(_.has(cd.annotationsProperties, 'dataAccessId') && _.has(cd.annotationsProperties, 'path')){
			 var responseText = doCDAQuery(cd.annotationsProperties.path,cd.annotationsProperties.dataAccessId,myself.parameters);
			 var resultset = buildGroupedData(responseText,'id','items');

			 if(_.has(cd.annotationsProperties, 'groupsCallback')){resultset = applyCallBack(resultset, cd.annotationsProperties.groupsCallback);};
			 if(_.has(cd.annotationsProperties, 'itemsCallback')){resultset = applyGroupedCallBack(resultset,cd.annotationsProperties.itemsCallback,'id','items');};

			 cd.annotationsProperties.groups = resultset;
		 }
			 return cd.annotationsProperties;
	 },

	 buildMap : function(chartDefinition, values){
		 var myself = this;
		 var cd = chartDefinition;

		 // verify existence of Markers Property
		 if (!_.has(cd, 'markers')){
			 // display missing options error
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\">Missing Markers Properties (markers)</div>");
			 return;
		 }

		 // build data
		 var queryDataset = buildData(values);

		 // create map data object
		 var data = {"chart": cd.chartProperties};

		 if(cd.markers){
			 data.markers = myself.buildMapMarkers(cd,queryDataset);
		 }else{
			 data.data = myself.buildMapDataSet(cd, queryDataset);
			 if(typeof data.data === "undefined"){return;};
		 }
		 // map entity definition
		 data.entityDef = myself.buildMapEntityDef(cd);

		 return data;
	 },

	 buildMapMarkers : function(chartDefinition,values){
		 var myself = this;
		 var cd = chartDefinition;
		 var queryDataset = values;

		 //create markers object
		 var markers = {};
		 // markersProperties default value
		 if(!_.has(cd,"markersProperties")){
			 cd.markersProperties = {};
		 }
		 //apply items CallBack
		 if(_.has(cd.markersProperties, 'itemsCallback')){queryDataset = applyCallBack(queryDataset,cd.markersProperties.itemsCallback);};
		 // add items to markers
		 markers.items = queryDataset;

		 // check if needs connectors
		 if(_.has(cd,"connectorsDataAccessId")){
			 // query for connectors
			 queryDataset = doCDAQuery(cd.path,cd.connectorsDataAccessId,myself.parameters);
			 queryDataset = buildData(queryDataset);
			 //apply connectors callback
			 if(_.has(cd.markersProperties, 'connectorsCallback')){queryDataset = applyCallBack(queryDataset,cd.markersProperties.connectorsCallback);};
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
			 queryDataset = doCDAQuery(cd.path,cd.shapesDataAccessId,myself.parameters);
			 queryDataset = buildData(queryDataset);
			 //apply connectors callback
			 if(_.has(cd.markersProperties, 'shapesCallback')){queryDataset = applyCallBack(queryDataset,cd.markersProperties.shapesCallback);};
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

	 buildMapDataSet : function(chartDefinition,values){
		 var myself = this;
		 var cd = chartDefinition;
		 var queryDataset = values;
		 // apply callback
		 if(_.has(cd,'dataSetProperties')){
			 if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};
		 }
		 //verify properties
		 var hasProperties = hasRequiredProperties(queryDataset,['id','value']);
		 if(!hasProperties[0]){
			 $("#"+myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Missing Properties!</strong>"+ "Data is "+hasProperties[1]+"</div>");
			 return;
		 };
		 // create the chart data
		 return queryDataset;
	 },

	 buildMapEntityDef : function(chartDefinition){
		 var myself = this;
		 var cd = chartDefinition;

		 // check if needs new entities
		 if(_.has(cd,"entityDefDataAccessId")){
			 if(!_.has(cd,'entityDefProperties')){
				 cd.entityDefProperties = {};
			 }
			 // query for connectors
			 queryDataset = doCDAQuery(cd.path,cd.entityDefDataAccessId,myself.parameters);
			 queryDataset = buildData(queryDataset);
			 //apply connectors callback
			 if(_.has(cd.entityDefProperties, 'entityDefCallback')){queryDataset = applyCallBack(queryDataset,cd.entityDefProperties.entityDefCallback);};
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
	 calculateRelativePath : function(cdaPath,location)
	 {
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
 });

/**
 *
 * This CDF component renders Fusion Charts Graph
 *
 */

var xLoadFunct= function(){
	window.XDashFusionChartComponent = BaseComponent.extend({
		type: "XDashFusionChartComponent",
		update: function(){

			var options = this.getOptions();

			//send the webAppPath to the plugin
			//need in realtimecharts
			options.webAppPath=webAppPath;

			var urlApi = webAppPath + '/plugin/fusion_plugin/api/renderChart';
			var urlResources = webAppPath + '/content/xfusion';
			var myself = this;

			// get the xml chart
			var resultXml = $.ajax({type: 'GET', url: urlApi, data: options, async: false}).responseText;

			// if not graph or chart,  show error
			if((resultXml.toLowerCase().indexOf("<graph") == -1) &&
					(resultXml.toLowerCase().indexOf("<chart") == -1))
			{
				if (resultXml.toLowerCase().indexOf("error:") >= 0)
				{
					var res = resultXml.replace("Error:","");

					$("#"+myself.htmlObject).html(
							"<div class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em;\">"+
							"<p style=\"margin: 0 0 .3em;\">"+
							"<span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: .3em;\"></span>"+
							"<strong>Error:</strong>"+
							res+
							"</p></div>");
				}
				else
					$("#"+myself.htmlObject).html(resultXml);
			}
			// graph + warnings
			else
			{
				var hasWarning = false;
				if (resultXml.toLowerCase().indexOf("warning") >= 0)
				{
					resultXml = resultXml.replace("Warning:","");
					var index = resultXml.indexOf("<");
					var warning = resultXml.substring(0,index);
					hasWarning = true;

					resultXml = resultXml.substring(index,resultXml.lenght);
				}

				myself.xmlResultData = resultXml;

				// get chart type from xml
				options.chartType = $(resultXml).attr("chartType");

				// get HTML5 from xml
				options.isHTML5 = eval($(resultXml).attr("isHTML5"));

				//test if is for free version
				var isFree=eval($(resultXml).attr("free"));
				options.chartType=(isFree==false?options.chartType:"FCF_"+options.chartType);

				// calculate width and height of fusion chart
				var widgetNum = this.htmlObject.substring(this.htmlObject.length - 1);
				var widgetPanel = document.getElementById("content-area-Panel_" + widgetNum);

				if(widgetPanel != undefined) { //we are in an EE dashboard
					var rect = getRectangle(widgetPanel);
					options.width = rect.width - 25;
					options.height = rect.height - 20;
				}

				//if is the first time or if is the flag reload on reloadOnRefresh on the chart will be full loaded
				if(myself.chartObject == undefined || options.reloadOnRefresh ||isFree) {
					this.clear();

					//is to render in HTML5?
					if(options.isHTML5==undefined)
						options.isHTML5=false;
					var chartTypeFull=(options.isHTML5&&!isFree)?options.chartType:urlResources+"/swf/"+options.chartType+".swf";

					//create chart Object
					myself.chartObject = new FusionCharts( chartTypeFull, myself.htmlObject+"-generated", options.width, options.height, "0","1" );

					myself.chartObject.setXMLData(resultXml);

					//set extra configuration for HTML5 charts
					if (!!myself.chartObject._overrideJSChartConfiguration&&options.overrideJSChartConfiguration!=undefined) {
						myself.chartObject.chartObject._overrideJSChartConfiguration(options.overrideJSChartConfiguration);
					}

					// add the chart
					myself.chartObject.render(myself.htmlObject);
					$("#"+options.htmlObject).find("embed").attr("wmode","transparent");

					// set the back button
					if(myself.backButton) {
						var div=$('<div class="ui-state-default ui-corner-all" title="" style="position: absolute;"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span></div>');
						div.css("left",Number(myself.chartDefinition.width));
						$("#"+myself.htmlObject).prepend(div);
						div.click(myself.backButtonCallBack);
					}

					// add div with warning
					if(hasWarning){
					$("#"+myself.htmlObject).append(
							"<div class=\"ui-state-highlight ui-corner-all\" style=\"padding: 0 .7em;\">"+
							"<p style=\"margin: 0 0 .3em;\">"+
							"<span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: 3em;\"></span>"+
							"<strong>Warning:</strong>"+
							warning+
							"</p></div>");
					}

					//on Dashboard EE??
					try{
						if(PentahoDashboardController!=undefined)
							myself.chartObject=undefined;
					}
					catch(e)
					{
						myself.chartObject=undefined;
					}

				} else {
					// just a quick update
					myself.chartObject.setXMLData(resultXml);
				}
			}
		},

		getOptions: function(){

			var options = {};

			if(typeof this.action !== 'undefined'){
				options.solution = this.solution;
				options.path = this.path;
				options.name = this.action;
			} else if(typeof this.xFusionPath !== "undefined"){
				options.xFusionPath = this.xFusionPath;
			}

			// process parameters and build the cdaParameters string
			if(typeof this.parameters !== "undefined") {
				options["cdaParameters"] = "";
				var isFirst = true;

				$.map(this.parameters,function(k){
					options[k[0]] = k.length==3?k[2]: Dashboards.getParameterValue(k[1]);

					//update the cdaParameters string
					isFirst? isFirst=false: options["cdaParameters"] += ";";
					options["cdaParameters"] += k[0];
				});
			}

			// get all chart properties definition
			var cd = this.chartDefinition;
			for(key in cd){
				var value = typeof cd[key]=='function'?cd[key](): cd[key];
				//tranform the boolean values into FCharts  boolean style 1/0
				if(typeof(value)=="boolean")
				{
					options[key] = value?'1':'0';
				}
				else
					if(typeof(value)=="string")
					{
						//encode values
						options[key] = encodeURIComponent(value);
					}
					else //tranform all the arrays with the exception of rangeValues element
						if(value instanceof Array&&key!="rangeValues")
						{
							if(value.length>0)
								options[key] =  value.toString().replace(/,/gi,';');
						}
						else
						{
							options[key] = value;
						}
			}

			// TODO colocar aqui logica para permitir alterar entre os varios
			// tipos de operacoes
			// sem ter que saber parametros (edit, command)
			options["command"] == undefined? options["command"] = "open": false;
			options["pathMode"] == undefined? options["pathMode"] = "legacy": false;

			// default options
			options["chartXML"] = true;
			options["dashboard-mode"] = true;

			options.cdaPath=XPFusionChartComponent.prototype.calculateRelativePath(options.cdaPath,Dashboards.context.path);

			//transform the array of range values into a JSON object
			var cols='{"cols":[{"id":"[MEASURE:0]","label":"Start","type":"number"}';
			var rows='"rows":[{"c":[{"f":"0","v":0}';
			if(options.rangeValues!=undefined)
			{
				if( options.rangeValues instanceof Array)
				{

					for (var i=0;i<options.rangeValues.length;++i)
					{
						cols+=',{"id":"[MEASURE:'+i+']","label":"Range'+i+'","type":"number"}';
						rows+=',{"f":"'+options.rangeValues[i]+'","v":'+options.rangeValues[i]+'}';
					}
					cols+='],';
					rows+=']}]}';

					options.range=cols+rows;
				}

			}


			return options;
		},

		getGUID : function(){
			if(this.GUID == null){
				this.GUID = WidgetHelper.generateGUID();
			}
			return this.GUID;
		}
	});

	/**
	 *
	 * This CDF component renders Fusion Charts Widget in Pentaho Dashboard E E
	 *
	 */

	XDashFusionChartComponent.newInstance = function(prptref, localizedFileName) {

		var widget = new XDashFusionChartComponent();
		widget.executeAtStart= true;
		widget.localizedName = localizedFileName;
		widget.GUID = WidgetHelper.generateGUID();
		widget.parameters = [];
		widget.outputParameters = [];


		//check platform version
		if(XDashFusionChartComponent.pentahoVersion==undefined)
		{
			var url = webAppPath + '/plugin/fusion_plugin/api/checkVersions';
			var myself=this;
			// get the xml chart
			var result=$.ajax({url: url, async: false, type: 'GET'}).responseText;
			eval(result);
		}
		// correct the Index for pentaho version greater than 3.10
		var indexCorrection=1;
		if(XDashFusionChartComponent.pentahoVersion.MajorVersion>3||XDashFusionChartComponent.pentahoVersion.MajorVersion==3&&XDashFusionChartComponent.pentahoVersion.MinorVersion>10)
		{
			indexCorrection=0;
		}

		var selectedWidgetIndex = pentahoDashboardController.getSelectedWidget() + indexCorrection; // add one to convert to 1-based
		widget.name = 'widget' + selectedWidgetIndex;
		widget.htmlObject = 'content-area-Panel_' + selectedWidgetIndex;
		var vals = XActionHelper.parseXaction(prptref);
		widget.staticParameters=true;
		widget.xactionPath = prptref;
		widget.solution = vals[0];
		widget.path = vals[1];
		widget.action = vals[2];
		currentWidget = widget;
		var details = XActionHelper.genXaction(widget.solution, widget.path, widget.action);
		PropertiesPanelHelper.initPropertiesPanel(details);
	}

//	now load the fusion js file

	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", webAppPath+'/content/xfusion/JSClass/FusionCharts.js');
	if (typeof fileref!="undefined") document.getElementsByTagName("head")[0].appendChild(fileref);

	if(typeof(PentahoDashboardController) != "undefined")
	{
		PentahoDashboardController.registerComponentForFileType("xfusion", XDashFusionChartComponent);
	}
};

//try the delay way to be used inside pentaho dashboards EE
//if not inside PDEE run the function

if(typeof(delayedFunctions)!= "undefined")
{
	delayedFunctions.push(xLoadFunct);
}
else
{
	xLoadFunct();
}

/*
* This function fixes the CDE properties that should be inside de chartDefinition but are outside of it.
* Parameters: Chart, Chart Definition, Properties Name,(Optional) JavaScript Properties Name and properties that need the name changed
* Returns: Chart Definition
*/
 function chartDefinitionCDEproperties(chart, chartDefinition, properties, scriptproperties, changeproperties){
	 if(_.has(chart,properties)){
		 if(typeof scriptproperties === 'object'){changeproperties = scriptproperties; scriptproperties = undefined;}
		 if (typeof scriptproperties != 'undefined'){
			 if(_.has(chart[properties],scriptproperties)){
  			 $.extend(chart[properties],chart[properties][scriptproperties]);
  			 delete chart[properties][scriptproperties];
  		 }
		 }
		 //apparently CDE does not care for the output name we give him so some properties need to be fixed
		 if (typeof changeproperties != 'undefined'){
			 $.each(changeproperties, function(i, el){
				 if(_.has(chart[properties],el[0])){
					 chart[properties][el[1]] = chart[properties][el[0]]
				 }
			 });
		 }
		 chartDefinition[properties] = chart[properties];
	 }
	 return chartDefinition;
 };

 /*
 * Apply Functions to Data Set
 * Parameter: data, function
 * Output: New Data Set
 */
 function applyCallBack(dataset, _function){
	 dataset = dataset.map(function(i){
		 _function(i);
		 return i
	 });
	 return dataset;
 };

 /*
 * Apply Functions to Data Set grouped by property
 * Parameter: data, function, propertyname
 * Output: New Data Set
 */
 function applyGroupedCallBack(dataset, _function, propertyName, subGroupName){
	dataset = dataset.map(function(i){
		i[subGroupName] = i[subGroupName].map(function(j){
			_function(i[propertyName],j);
			return j;
		});
		return i
	});
	return dataset;
 };

 /*
 * Do CDA query with or without parameters
 */
 function doCDAQuery(cdaPath, cdaDataAcessId, parameters){
 	var prefix = 'param';
 	var queryData={};
 	if(typeof parameters != undefined){
 		for (var i = 0; i < _.size(parameters); i++) {
 			queryData[prefix.concat(parameters[i][0])]=parameters[i][1];
 		};
 	};
 	var responseText = $.ajax({type: 'GET', dataType: 'json',url: webAppPath + "/plugin/cda/api/doQuery?dataAccessId="+cdaDataAcessId+"&path="+cdaPath, data: queryData, async: false}).responseText;
	return JSON.parse(responseText);
 };

 /*
 * Build the data for the chart
 */
 function buildData(queryData){
 	var cdacolumns = [];
 	for (var i = 0; i < queryData.metadata.length; i++) {
 		cdacolumns.push(queryData.metadata[i].colName);
 	}
 	return queryData.resultset.map(function(dt) {
 		var data ={};
 		for (var i = 0; i < cdacolumns.length; i++) {
 			data[cdacolumns[i]]=dt[i];
 		}
 		return data;
 	});
 };

 /*
 * Build the data grouped by a property with the other values in the subgroup
 */
 function buildGroupedData(queryData, groupby, subgroup){
 	var qData = [];
 	var cdacolumns = [];
 	var seriescolumn = 0;
 	for (var i = 0; i < queryData.metadata.length; i++) {
 		if(queryData.metadata[i].colName===groupby){seriescolumn = i;}
 		cdacolumns.push(queryData.metadata[i].colName);
 	}

 	for (var i = 0; i < queryData.resultset.length; i++) {
 		var data = {};
 		var row = queryData.resultset[i];
 		for (var j = 0; j < row.length; j++) {
 			if(j!=seriescolumn){data[cdacolumns[j]]=row[j]}
 		}
 		var serie_row = lookup_seriesname(row[seriescolumn],qData, groupby);
 		if(serie_row===qData.length){
			var hash = {};
			hash[groupby] = row[seriescolumn];
			hash[subgroup] = [data];
 			qData.push(hash);
 		}else{
 			qData[serie_row][subgroup].push(data);
 		}
 	}
 	return qData;
 };

 /*
 * Build the data for the chart grouped by columns name
 */
 function buildGroupedColumnData(queryData,groupName,subGroupName,propertyName){
 	var qData = [];
 	var cdacolumns = [];
 	for (var i = 0; i < queryData.metadata.length; i++) {
		hash = {};
		hash[groupName] = queryData.metadata[i].colName;
		hash[subGroupName] = [];
		qData.push(hash);
 	}

 	for (var i = 0; i < queryData.resultset.length; i++) {
 		var row = queryData.resultset[i];
		for (var j = 0; j < row.length; j++) {
			hash = {};
			hash[propertyName] = row[j];
			qData[j][subGroupName].push(hash);
		}
 	}
 	return qData;
 };

 /*
 * Build the data to feed Realtime Charts
 */
 function buildRealTimeData(queryData){
 	var cols = [];
 	for (var i = 0; i < queryData.metadata.length; i++) {
		cols.push([queryData.metadata[i].colName,""]);
 	}
 	for (var i = 0; i < queryData.resultset.length; i++) {
 		var row = queryData.resultset[i];
		for (var j = 0; j < row.length; j++) {
			if(cols[j][0].match("label")){
				if(cols[j][1].length === 0){
					cols[j][1] = cols[j][1].concat(row[j] + "|");
				}
			}else{
				cols[j][1] = cols[j][1].concat(row[j] + "|");
			}
		}
 	}
	var qData ="";
	for (var i = 0; i < cols.length; i++) {
		qData = qData + "&"+cols[i][0]+"="+cols[i][1].substring(0, cols[i][1].length - 1);;
	}
 	return qData;
 };


 function lookup_seriesname( name , array, seriesname) {
 	for(var i = 0, len = array.length; i < len; i++) {
 			if( array[ i ][seriesname] === name )
 					return i;
 	};
 	return array.length;
};

/*
* Verify the parameters
*/
function hasRequiredProperties(queryDataset,properties,subProperty){
	if(subProperty != undefined){
		var arr = [];
		for (var i = 0; i < queryDataset.length; i++) {
			arr = arr.concat(queryDataset[i][subProperty]);
		}
		queryDataset = arr;
	}
	for (var i = 0; i < queryDataset.length; i++) {
		for (var j = 0; j < properties.length; j++) {
			if(!queryDataset[i].hasOwnProperty(properties[j])){
				return [false,"missing property '"+ properties[j]+"'"]
			};
		};
	};
	return [true,""];
};
