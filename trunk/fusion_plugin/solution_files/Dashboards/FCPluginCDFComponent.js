/**
 * 
 * This CDF component renders Fusion Charts Graph
 * 
 */
var FusionChartComponent = BaseComponent.extend({

	update: function(){

		this.clear();
	
		var options = this.getOptions();
		
		options["chartXML"]=true;
		options["dashboard-mode"]=false;
		
		var url = webAppPath + '/content/fusion';
		var myself=this;
	
		// get the xml chart
		var resultXml=$.ajax({url: url, data: options, async: false}).responseText;
		
		//test if is for free version
		var isFree=eval($(resultXml).attr("free"));
		options.chartType=(isFree==false?options.chartType:"FCF_"+options.chartType);
		
		//create chart Object
		var myChart = new FusionCharts( url+"/swf/"+options.chartType+".swf", myself.htmlObject+"myChartId", options.width, options.height, "0","1" );
	
		
		// set chart data
		myChart.setDataXML(resultXml);
	
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

	}
});