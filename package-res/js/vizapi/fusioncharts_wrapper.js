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
        args : {
            chartType: "Bar2D"
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
                allowMultiple : false,
                ui : {
                    group : "data"
                }
            }/*, {
                id : 'aggregate',
                dataType : 'string',
                values : [ 'MIN', 'MAX', 'AVG' ],
                ui : {
                    labels : [ 'Minimum', 'Maximum', 'Average' ],
                    group : 'options',
                    type : 'combo', // combo, checkbox, slider, textbox, gem,
                    // gemBar, and button are valid ui types
                    caption : 'Aggregation'
                }
            }*/ ]
        } ]
    },
    {
        id : 'fcplugin_line', 
        type : 'chart', 
        source : 'FusionCharts', 
        name : 'FusionCharts Line', 
        'class' : 'pentaho.fcplugin', 
        args : {
            chartType: "Line"
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
                allowMultiple : false,
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
        args : {
            chartType: "AngularGauge",
            range: '{"cols":[{"id":"[MEASURE:0]","label":"Start","type":"number"},{"id":"[MEASURE:0]","label":"Range1","type":"number"},{"id":"[MEASURE:0]","label":"Range2","type":"number"},{"id":"[MEASURE:0]","label":"Final","type":"number"}],'+
                   '"rows":[{"c":[{"f":"0","v":0},{"f":"20000","v":20000},{"f":"40000","v":40000},{"f":"100000","v":100000}]}]}'
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

    /**
     * Function that resizes visualizations. The resize function is called every
     * time the visualization renders as a different size, and allows the
     * visualization to adjust calculations
     * 
     * height width
     */
    pentaho.fcplugin.prototype.resize = function(width, height) {
        this.chart.attr("height",height);
        this.chart.attr("width",width);
    };

    /**
     * Function that renders the visualizations
     * 
     * dataTable a pentaho.DataTable object with the data to display vizOptions
     * the options for the visualization
     */
    pentaho.fcplugin.prototype.draw = function(datView, vizOptions) {
        var options = {
                height: this.canvasElement.offsetHeight,
                width: this.canvasElement.offsetWidth,
                data: datView.toDataTable().jsonTable
                //TODO convert to Google datatable to be more generic convertCdaToDataTable see pentaho-solutions\system\common-ui\resources\web\vizapi\DataTable.js
        }
        
        //Set options
        //Set arguments of visualization as options.
        $.each(this.controller.currentViz.args, function(key, value) { 
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
        
        //place chart object available
        this.chart = $("#"+this.containerDiv.id).find("object");
        
        this.chart.attr("wmode","transparent"); 
        //TODO end of reuse XDashFusionChartComp and replace logic bellow. 
    }
    
});
