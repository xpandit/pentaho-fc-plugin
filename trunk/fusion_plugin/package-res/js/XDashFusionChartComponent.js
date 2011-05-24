/**
 * 
 * This CDF component renders Fusion Charts Graph
 * 
 */
var XDashFusionChartComponent = BaseComponent.extend({
	type: "XDashFusionChartComponent",
	update: function(){

		this.clear();
	
		var options = this.getOptions();
		
		options["chartXML"]=true;
		options["dashboard-mode"]=false;
		
		var url = webAppPath + '/content/fusion';
		var myself=this;
	
		// get the xml chart
		var resultXml=$.ajax({url: url, data: options, async: false}).responseText;
		
		// get chart type from xml
        options.chartType = $(resultXml).attr("chartType")
		//test if is for free version
		var isFree=eval($(resultXml).attr("free"));
		options.chartType=(isFree==false?options.chartType:"FCF_"+options.chartType);
		
		// calculate width and height of fusion chart
		var widgetNum = this.htmlObject.substring(this.htmlObject.length - 1);
		var widgetPanel = document.getElementById("content-area-Panel_" + widgetNum);
		
		/*var rect = getRectangle(widgetPanel);
		options.width = rect.width - 25;
		options.height = rect.height - 20;*/
		
		//create chart Object
		var myChart = new FusionCharts( url+"/swf/"+options.chartType+".swf", myself.htmlObject+"myChartId", options.width, options.height, "0","1" );
	
		
		// set chart data
		myChart.setDataXML(resultXml);
	
		//set extra configuration for HTML5 charts
        if (!!myChart._overrideJSChartConfiguration&&options.overrideJSChartConfiguration!=undefined) {
        	myChart._overrideJSChartConfiguration(options.overrideJSChartConfiguration);
        	}
		
		// add the chart
		myChart.render(myself.htmlObject); 
	
	
		$("#"+options.htmlObject).find("embed").attr("wmode","transparent"); 
	
	
		// set the chart object to this cdf component
		myself.chartObject=myChart; 
	
		// set the back button
		if(myself.backButton)
		{
			var div=$('<div class="ui-state-default ui-corner-all" title="" style="position: absolute;"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span></div>');
	
			div.css("left",Number(myself.chartDefinition.width));
	
			$("#"+myself.htmlObject).prepend(div);
	
			div.click(myself.backButtonCallBack);
		}
	},

	getOptions: function(){

		// map options
		var options = {
				solution : this.solution,
				path: this.path,
				name: this.action
		};

		// process params and update options
		if(this.parameters!=undefined)
			$.map(this.parameters,function(k){
				options[k[0]] = k.length==3?k[2]: Dashboards.getParameterValue(k[1]);
			});

		// get all chartproperties Definition
		for (var name in this.chartDefinition) {
			var chartDefinitonValue=this.chartDefinition[name];
			if(typeof(chartDefinitonValue)=="function")
				chartDefinitonValue=chartDefinitonValue();
			options[name]=chartDefinitonValue;
		}


		// default options
		if(typeof options.command == "undefined")
			options.command="open";       	

		// TODO colocar aqui lógica para permitir alterar entre os vários
		// tipos de operações
		// sem ter que saber parametros (edit, command)

		return options;
	},
	getGUID : function(){
		if(this.GUID == null){
		  this.GUID = WidgetHelper.generateGUID();
		}
		return this.GUID;
	}
});
XDashFusionChartComponent.newInstance = function(prptref, localizedFileName) {
  var widget = new XDashFusionChartComponent();
  widget.localizedName = localizedFileName;
  widget.parameters = [];
  widget.outputParameters = [];
  var selectedWidgetIndex = pentahoDashboardController.getSelectedWidget() + 1; // add one to convert to 1-based
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

// now load the fusion js file


/*
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", '/pentaho/content/fusion/JSClass/FusionCharts.js');
  if (typeof fileref!="undefined") document.getElementsByTagName("head")[0].appendChild(fileref);


PentahoDashboardController.registerComponentForFileType("xfusion", XDashFusionChartComponent);
*/