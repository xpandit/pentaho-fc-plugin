/**
 * Wrapper for the FusionCharts plugin
 * 
 */
pen.require(["common-ui/vizapi/VizController"], function(){

    // Plugin namespace
    pentaho.fcplugin = pentaho.fcplugin || {};

     //Register visualization API
    pentaho.visualizations.push({
        id : 'fcplugin_bar2d', // unique identifier -> cannot have numbers
        type : 'chart', // generic type id
        source : 'FusionCharts', // id of the source library
        name : 'FusionCharts Bar', // visible name, this will come from a properties file eventually
        'class' : 'pentaho.fcplugin',
		chartType: "Bar2D",		
        args : {
           
        },
        propMap : [],
        dataReqs : [ //data requirements of this visualization
        {
            name : 'Default',
            reqs : [ {
                id : 'rows', // id of the data element
                dataType : 'string', // data type - 'string', 'number',
                // 'date',
                // 'boolean', 'any' or a comma separated
                // list
                dataStructure : 'column', // 'column' or 'row' - only 'column'
                // supported
                // so far
                caption : 'Y-Axis', // visible name
                required : true, // true or false
                allowMultiple : false,
                ui : {
                    group : 'data'
                }
            }, {
                id : 'measures',
                dataType : 'number',
                dataStructure : 'column',
                caption : 'Measure',
                required : true,
                allowMultiple : true,
                ui : {
                    group : "data"
                }
            },{
				id: "orientation", 
				dataType: "string", 
				values: ["vertical", "horizontal"], 
				ui: {
					labels: ["Vertical", "Horizontal"], 
					group: "options", 
					type: "combo", 
					caption: "Orientation"
					}
			},{
				id: "2d_3d", 
				dataType: "string", 
				values: ["2D", "3D"], 
				ui: {
					labels: ["2D", "3D"], 
					group: "options", 
					type: "combo", 
					caption: "2D/3D"
					}
				}]
        } ]
    },
    {
        id : 'fcplugin_line', 
        type : 'chart', 
        source : 'FusionCharts', 
        name : 'FusionCharts Line', 
        'class' : 'pentaho.fcplugin', 
		chartType: "Line",
        args : {
          
        },
        propMap : [],
        dataReqs : [
        {
            name : 'Default',
            reqs : [ {
                id : 'rows',
                dataType : 'string',
                dataStructure : 'column',
                caption : 'Series', 
                required : true, 
                allowMultiple : false,
                ui : {
                    group : 'data'
                }
            }, {
                id : 'measures',
                dataType : 'number',
                dataStructure : 'column',
                caption : 'Measure',
                required : true,
                allowMultiple : true,
                ui : {
                    group : "data"
                }
            }]
        } ]
    },
	{
        id : 'fcplugin_area', 
        type : 'chart', 
        source : 'FusionCharts', 
        name : 'FusionCharts Area', 
        'class' : 'pentaho.fcplugin', 
		chartType: "Area",
        args : {
          
        },
        propMap : [],
        dataReqs : [
        {
            name : 'Default',
            reqs : [ {
                id : 'rows',
                dataType : 'string',
                dataStructure : 'column',
                caption : 'Series', 
                required : true, 
                allowMultiple : false,
                ui : {
                    group : 'data'
                }
            }, {
                id : 'measures',
                dataType : 'number',
                dataStructure : 'column',
                caption : 'Measure',
                required : true,
                allowMultiple : true,
                ui : {
                    group : "data"
                }
            }]
        } ]
    },
	{
        id : 'fcplugin_combi', // unique identifier -> cannot have numbers
        type : 'chart', // generic type id
        source : 'FusionCharts', // id of the source library
        name : 'FusionCharts Combi', // visible name, this will come from a properties file eventually
        'class' : 'pentaho.fcplugin', 
		 chartType: "MSCombi",
        args : {
           
        },
        propMap : [],
        dataReqs : [ //data requirements of this visualization
        {
            name : 'Default',
            reqs : [ {
                id : 'rows', // id of the data element
                dataType : 'string', // data type - 'string', 'number',
                // 'date',
                // 'boolean', 'any' or a comma separated
                // list
                dataStructure : 'column', // 'column' or 'row' - only 'column'
                // supported
                // so far
                caption : 'Y-Axis', // visible name
                required : true, // true or false
                allowMultiple : false,
                ui : {
                    group : 'data'
                }
            }, {
                id : 'measures_line',
                dataType : 'number',
                dataStructure : 'column',
                caption : 'Measure Line',
                required : false,
                allowMultiple : true,
                ui : {
                    group : "data"
                }
			}, {
                id : 'measures_column',
                dataType : 'number',
                dataStructure : 'column',
                caption : 'Measure Column',
                required : false,
                allowMultiple : true,
                ui : {
                    group : "data"
                }
			}, {
                id : 'measures_area',
                dataType : 'number',
                dataStructure : 'column',
                caption : 'Measure Area',
                required : false,
                allowMultiple : true,
                ui : {
                    group : "data"
                }
            },{
				id: "2d_3d", 
				dataType: "string", 
				values: ["2D", "3D"], 
				ui: {
					labels: ["2D", "3D"], 
					group: "options", 
					type: "combo", 
					caption: "2D/3D"
					}
				}]
        } ]
    },
	{
        id : 'fcplugin_marimekko', 
        type : 'chart', 
        source : 'FusionCharts', 
        name : 'FusionCharts Marimekko', 
        'class' : 'pentaho.fcplugin', 
		chartType: "Marimekko",
        args : {
          
        },
        propMap : [],
        dataReqs : [
        {
            name : 'Default',
            reqs : [ {
                id : 'rows',
                dataType : 'string',
                dataStructure : 'column',
                caption : 'Series', 
                required : true, 
                allowMultiple : false,
                ui : {
                    group : 'data'
                }
            }, {
                id : 'measures',
                dataType : 'number',
                dataStructure : 'column',
                caption : 'Measure',
                required : true,
                allowMultiple : true,
                ui : {
                    group : "data"
                }
            }]
        } ]
    },
    {
        id : 'fcplugin_angulargauge',
        type : 'chart',
        source : 'FusionCharts',
        name : 'FusionCharts Gauge',
        'class' : 'pentaho.fcplugin', 
		 chartType: "AngularGauge",
        args : {
        },
        propMap : [],
        dataReqs : [
        {
            name : 'Default',
            reqs : [  {
                id : 'measures',
                dataType : 'number',
                dataStructure : 'column',
                caption : 'KPI',
                required : true,
                allowMultiple : false,
                ui : {
                    group : "data"
                }
            }]
        } ]
    }
	
	
	
    );

    /**
     * The constructor of the visualization class
     * 
     * element HTML element, which acts as the parent node of your visualization
     */
    pentaho.fcplugin = function(canvasElement) {
        this.canvasElement = canvasElement;
        this.containerDiv = document.createElement("div");
        this.containerDiv.id = "chartContainer"
        this.canvasElement.appendChild(this.containerDiv);
    };
	
	//
	//set the charType in the options object
	//
	pentaho.fcplugin.prototype._chartTypeByOptions = function(options)
	 {
		var args=this.controller.currentViz.args;
		var chartType="";
		switch (this.controller.currentViz.chartType)
		{
			// only for column ou Bar charts
			case "Bar2D":
						if(options.orientation=="vertical")
							chartType=options.data.cols.length>2?"MSColumn":"Column";
						else
							chartType=options.data.cols.length>2?"MSBar":"Bar";

						//Chart not supported by Fusion charts
						if(options["2d_3d"]=="3D"&&options.data.cols.length==2&&vizOptions.orientation=="horizontal")
						{
							alert("Chart 3D Not Supported");
							chartType+="2D";
							options.chartType=chartType;
							return true;
						}	
						//set 2D or 3D
						chartType+=options["2d_3d"];	
						break;
					case "MSCombi":
						var seriesTypes="";
						$(options.data.cols).each(
								function(index, element)
								{	
									if(index>0)
									{
										//when the chart type change, the variables are undefined but we know that all are lines
										if(args.measures_column!=undefined)
										{
											seriesTypes+=$.inArray(this.label, args.measures_column)==-1?"":"BAR";
											seriesTypes+=$.inArray(this.label, args.measures_line)==-1?"":"LINE";
											seriesTypes+=$.inArray(this.label, args.measures_area)==-1?"":"AREA";
										}
										else
										{
											seriesTypes+="LINE";
										}
										seriesTypes+=";";
									}
								}
							);
						options.seriesTypes=seriesTypes;
						chartType="MSCombi";
						//set 2D or 3D
						chartType+=options["2d_3d"];	
					break;
					case "Line":
						chartType=options.data.cols.length>2?"MSLine":"Line";
						break;
					case "Area":
						chartType=options.data.cols.length>2?"MSArea":"Area2D";
						break;
					case "AngularGauge":
						//TODO Set this range values from parameters in the UI
						var val=this._dataTable.dataTable.jsonTable.rows[0].c[0].v;
						options.range='{"cols":[{"id":"[MEASURE:0]","label":"Start","type":"number"},{"id":"[MEASURE:0]","label":"Range1","type":"number"},{"id":"[MEASURE:0]","label":"Range2","type":"number"},{"id":"[MEASURE:0]","label":"Final","type":"number"}],'+
						'"rows":[{"c":[{"f":"0","v":0},{"f":"'+val*0.2+'","v":'+val*0.2+'},{"f":"'+val*0.4+'","v":'+val*0.4+'},{"f":"'+val*0.7+'","v":'+val*0.7+'}]}]}';
						
					default:
						chartType=this.controller.currentViz.chartType;
						break;
					
					
			}
			options.chartType=chartType;	
	 };
	
	pentaho.fcplugin.prototype._prepareOptions = function () {
		var vizOptions = this._vizOptions;
	};

    /**
     * Function that resizes visualizations. The resize function is called every
     * time the visualization renders as a different size, and allows the
     * visualization to adjust calculations
     * 
     * height width
     */
    pentaho.fcplugin.prototype.resize = function(width, height) {
      var vizOptions = this._originalVizOptions;
      vizOptions.width  = width;
      vizOptions.height = height;
      vizOptions.isResize = true;
      this.draw(this._dataTable, vizOptions);
    };

    /**
     * Function that renders the visualizations
     * 
     * dataTable a pentaho.DataTable object with the data to display vizOptions
     * the options for the visualization
     */
    pentaho.fcplugin.prototype.draw = function(datView, vizOptions) {
		this._dataTable=datView;
		this._originalVizOptions = $.extend({}, vizOptions);
		var args=this.controller.currentViz.args;
		
        var options = {
                height: this.canvasElement.offsetHeight,
                width: this.canvasElement.offsetWidth,
                data: datView.toDataTable().jsonTable
                //TODO convert to Google datatable to be more generic convertCdaToDataTable see pentaho-solutions\system\common-ui\resources\web\vizapi\DataTable.js
        }
        
		if(vizOptions.isResize)
		{
			    options.height= vizOptions.height;
                options.width=vizOptions.width;
		}
		
		
		//set default values
		args["2d_3d"]=args["2d_3d"]!=undefined?args["2d_3d"]:"2D";
		args.orientation=args.orientation!=undefined?args.orientation:"vertical";
		
        //Set options
        //Set arguments of visualization as options.
        $.each(args, function(key, value) { 			
			options[key] = value;
        });
        
		
        //Get overall look & feel options
        $.each(chartSettingsManager.getOverallSettings(), function(key, value) { 
            options[key] = value;
        });
        
        //Override with any specific look & feel options if function is defined on chartSettingsManager
        var chartFn = chartSettingsManager[this.controller.currentViz.id];
        if(typeof chartFn === 'function') {
            $.each(chartFn(), function(key, value) { 
                options[key] = value;
            });
        }
		
		//generate the ChartType considering the options
		this._chartTypeByOptions(options);
		
        // finish set options
        
        //TODO try to reuse XDashFusionChartComp and replace logic bellow. 
        //Requires taking XDashFusionChartComp out of the object
        var url = webAppPath + '/content/fusion/renderChartExternalData';
        // get the xml chart
        var resultXml = $.ajax({type: 'post', 
                                url: url, 
                                data: {json: JSON.stringify(options)},
                                async: false}).responseText;
        //render the chart
        //test if is for free version
        var isFree=options.isFree;
        options.chartType=(isFree==false?options.chartType:"FCF_"+options.chartType);
        
        var chartObject = new FusionCharts( webAppPath+"/content/fusion/swf/"+options.chartType+".swf", this.containerDiv.id+"-generated", options.width, options.height, "0","1" );
        chartObject.setDataXML(resultXml);
        chartObject.render(this.containerDiv.id);
		
		this.chartObject=chartObject;
        
        //place chart object available
        this.chart = $("#"+this.containerDiv.id).find("object");
        
        this.chart.attr("wmode","transparent"); 
        //TODO end of reuse XDashFusionChartComp and replace logic bellow. 
    }
    
});
