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

			var url = webAppPath + '/content/fusion';
			var myself = this;

			// get the xml chart
			var resultXml = $.ajax({url: url, data: options, async: false}).responseText;
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
				var chartTypeFull=(options.isHTML5&&!isFree)?options.chartType:url+"/swf/"+options.chartType+".swf";
							
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
		},

		getOptions: function(){

			var options = {
					solution : this.solution,
					path: this.path,
					name: this.action
			};

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
			options["dashboard-mode"] = false;
			
						
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
			var url = webAppPath + '/content/fusion/checkVersions';
			var myself=this;
			// get the xml chart
			var result=$.ajax({url: url, async: false}).responseText;
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
	fileref.setAttribute("src", webAppPath+'/content/fusion/JSClass/FusionCharts.js');
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