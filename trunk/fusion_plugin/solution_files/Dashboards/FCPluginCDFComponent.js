/**
 * 
 * This CDF component renders Fusion Charts Graph 
 * 
 */
var FusionChartComponent = BaseComponent.extend({

    update: function(){
    
    	this.clear();

        var options = this.getOptions();

        var url = webAppPath + '/content/fusion';
        var myself=this;
        $.ajax({url: url, data: options, dataType:"html", success: function(json)
        	{
        	//when the fusion chart returns we have to do 4 steps
        	
        	//1- Add result do HTML page
        	$("#"+myself.htmlObject).html(json);
        	
        	//2- Call the fusion chart JS framewokr to init and read all fusion configuration
        	FusionChartsDOM.Constructor();
        	
        	//3- Render All charts with the tag fusionCharts 
        	FusionChartsDOM.RenderAllCharts(true);
        	
        	//4- Remove the tag fusionCharts to avoid other refreshs if we use more than one chart
        	$("#"+myself.htmlObject).find("fusioncharts").remove();
        	
        	//5 - Set Transparence Wmode transparent
        	$("#"+myself.htmlObject).find("embed").attr("wmode","transparent"); 

        	
        	//set the chart object to this cdf component
        	myself.chartObject=FusionChartsDOM.Nodes[0].chartObject; 
        	
        	//set the back button
        	if(myself.backButton)
        	{
	    		var div=$('<div class="ui-state-default ui-corner-all" title="" style="position: absolute;"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span></div>');
	    		 
	    		div.css("left",Number(myself.chartDefinition.width));
	    		
	    		$("#"+myself.htmlObject).prepend(div);
	    		
	    		div.click(myself.backButtonCallBack);
        	}
        }});
    },

    getOptions: function(){
                         
    	//map options 
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

            //get all chartproperties Definition
            for (var name in this.chartDefinition) {
            	  var chartDefinitonValue=this.chartDefinition[name];
            	  if(typeof(chartDefinitonValue)=="function")
            		  chartDefinitonValue=chartDefinitonValue();
            	  options[name]=chartDefinitonValue;
            	}

            
			//default options
            if(typeof options.command == "undefined")
            	options.command="open";       	
            	
            //TODO colocar aqui lógica para permitir alterar entre os vários tipos de operações
            // sem ter que saber parametros (edit, command)
            	
            return options;

    }
});