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

					myself.chartObject.setDataXML(resultXml);

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
					myself.chartObject.setDataXML(resultXml);
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

/**
 *
 * This CDF component renders the chart client-side assincronously
 *
 */

var XDashFusionChartComponentAsync = UnmanagedComponent.extend({
	 update: function() {
		var render = _.bind(this.render, this);
		 this.triggerQuery(this.chartDefinition, render);
	 },

	 render: function(values) {

		var myself = this;
		var cd = myself.chartDefinition;
		//validate fusion plugin key
		var urlApi = webAppPath + '/plugin/fusion_plugin/api/verifyKey';
		var fusionkey = $.ajax({type: 'GET', url: urlApi, async: false}).responseText;
		fusionkey = fusionkey.split("-", 2);
		if(fusionkey[0].match("Error")){
			$("#"+myself.htmlObject).html(
					"<div class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em;\">"+
					"<p style=\"margin: 0 0 .3em;\">"+
					"<span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: .3em;\"></span>"+fusionkey[0]+"</p></div>");
		}else if (fusionkey[1].match("true")) {
        	$("#"+myself.htmlObject).html("<div class=\"alert alert-danger\">You need to install FusionCharts XT to render the chart</div>");
        }else{
			if (!_.has(cd, 'chartType') || !_.has(myself, 'htmlObject') || !_.has(cd, 'width') || !_.has(cd, 'height')){
				// display missing options error
				$("#"+myself.htmlObject).html(
						"<div class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em;\">"+
						"<p style=\"margin: 0 0 .3em;\">"+
						"<span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: .3em;\"></span>"+
						"<strong>Error:</strong>Missing Options (chartType, htmlObject, width or height)</p></div>");
			} else if((!_.has(cd, 'chartProperties') && !_.has(myself,'chartProperties')) || (!_.has(cd, 'dataSetProperties') && !_.has(myself,'dataSetProperties')) || (!_.has(cd, 'connectorsProperties') && !_.has(myself,'connectorsProperties'))){
				//display mission properties error
				$("#"+myself.htmlObject).html(
						"<div class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em;\">"+
						"<p style=\"margin: 0 0 .3em;\">"+
						"<span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: .3em;\"></span>"+
						"<strong>Error:</strong>Missing chartProperties</p></div>");
			} else		{

				//Fix CDE properties
				cd = chartDefinitionCDEproperties(myself,cd,'chartProperties','chartScriptProperties');
				cd = chartDefinitionCDEproperties(myself,cd,'dataSetProperties','dataSetScriptProperties',[['datasetColor','color']]);
				cd = chartDefinitionCDEproperties(myself,cd,'connectorsProperties','connectorsScriptProperties',[['connectorColor','color']]);
				cd = chartDefinitionCDEproperties(myself,cd,'trendlinesProperties','trendlinesScriptProperties');
				cd = chartDefinitionCDEproperties(myself,cd,'labelsProperties','labelsScriptProperties');

				// Creating chart basic options
				var fusionOptions = {
					"type": cd.chartType,
					"renderAt": myself.htmlObject,
					"width": cd.width,
					"height": cd.height,
					"dataFormat": "json"
				};

				//allow chartProperties functions
				$.map(cd.chartProperties,function(v,k){return typeof cd.chartProperties[k]=="function"?cd.chartProperties[k]=cd.chartProperties[k]():cd.chartProperties[k]=v});

				//create node dataset
				var queryDataset = values.resultset.map(function(i) {return {"x": i[0], "y": i[1], "id": i[2], "name": i[3]};});

				// create connectors dataset
				var queryConnectors = values.resultset.map(function(i) { return (i[4]!=null?{"from": i[2], "to": i[4],"label": i[5]} : undefined); });

				// remove undefined connectors
				queryConnectors = queryConnectors.filter(function(i){return i!=undefined;});

				//remove duplicated nodes (dragnode)
				queryDataset = removeDuplicatedNodes(queryDataset);

				//apply node callback function
				if(_.has(cd.dataSetProperties, 'dataSetCallback')){queryDataset = applyCallBack(queryDataset,cd.dataSetProperties.dataSetCallback);};

				//apply connectors callback function
				if(_.has(cd.connectorsProperties, 'connectorCallback')){queryConnectors = applyCallBack(queryConnectors,cd.connectorsProperties.connectorCallback);};

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

				// add trend lines to chart
				if(_.has(cd, 'trendlinesProperties')){
					if(_.has(cd.trendlinesProperties, 'dataAccessId') && _.has(cd.trendlinesProperties, 'path')){
						var responseText = $.ajax({type: 'GET',dataType: 'json', url: webAppPath + "/plugin/cda/api/doQuery?dataAccessId="+cd.trendlinesProperties.dataAccessId+"&path="+cd.trendlinesProperties.path, async: false}).responseText;
						var resultset = JSON.parse(responseText).resultset;
						resultset = resultset.map(function(i) {return {"startvalue": i[0], "endvalue": i[1]}});
						//apply trendlines callback function
						if(_.has(cd.trendlinesProperties, 'lineCallback')){
							resultset = applyCallBack(resultset, cd.trendlinesProperties.lineCallback);
						};
						// draw vertical or horizontal trendlines
						if(_.has(cd.trendlinesProperties,"vertical")){
							if(cd.trendlinesProperties.vertical == "1"){
								data.vtrendlines = [{line: resultset}];
							}else{
								data.trendlines = [{line: resultset}];
							}
						}else{
							data.trendlines = [{line: resultset}];
						}
					}else{
						if(_.has(cd.trendlinesProperties, 'vtrendlines')){
							data.vtrendlines = cd.trendlinesProperties.vtrendlines;
						};
						if(_.has(cd.trendlinesProperties, 'trendlines')){
							data.trendlines = cd.trendlinesProperties.trendlines;
						};
					};
				};

				// add labels to chart
				if(_.has(cd, 'labelsProperties')){
					if(_.has(cd.labelsProperties, 'dataAccessId') && _.has(cd.labelsProperties, 'path')){
						var responseText = $.ajax({type: 'GET',dataType: 'json', url: webAppPath + "/plugin/cda/api/doQuery?dataAccessId="+cd.labelsProperties.dataAccessId+"&path="+cd.labelsProperties.path, async: false}).responseText;
						var resultset = JSON.parse(responseText).resultset;
						resultset = resultset.map(function(i) {return {"x": i[0], "y": i[1], "text": i[2]}});
						//apply trendlines callback function
						if(_.has(cd.labelsProperties, 'labelCallback')){
							resultset = applyCallBack(resultset, cd.labelsProperties.labelCallback);
						};
						data.labels = {label: resultset};
					}else{
						if(_.has(cd.labelsProperties, 'labels')){
							data.labels = cd.labelsProperties.labels;
						};
					};
				};

				// create Fusion chart and render
				if(myself.chartObject == undefined) {
					myself.chartObject = new FusionCharts(fusionOptions);
					myself.chartObject.setJSONData(data);
					myself.chartObject.render();
				} else {
					myself.chartObject.setJSONData(data);
				}
			}
		 }
		}

 });

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
* Remove duplicated values
* Parameter: Data Set
* Output: New Data Set
*/
 function removeDuplicatedNodes(dataset){
	 var nodes = [];
	 var uniqueVals = [];
	 $.each(dataset, function(i, el){
		 if($.inArray(el["id"], uniqueVals) === -1) {uniqueVals.push(el["id"]); nodes.push(el);}
	 });

	 return nodes;
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
