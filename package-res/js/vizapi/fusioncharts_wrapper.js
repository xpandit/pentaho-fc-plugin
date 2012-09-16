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
        id : 'fcplugin_line', // unique identifier
        type : 'chart', // generic type id
        source : 'FusionCharts', // id of the source library
        name : 'FusionCharts Line', // visible name, this will come from a properties file eventually
        'class' : 'pentaho.fcplugin', 
        args : {
            chartType: "Line"
        },
        propMap : [],
        dataReqs : [ //data requirements of this visualization
        {
            name : 'Default',
            reqs : [ {
                id : 'rows',
                dataType : 'string',
                dataStructure : 'column',
                caption : 'Series', // visible name
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
            }]
        } ]
    },
    {
        id : 'fcplugin_angulargauge', // unique identifier
        type : 'chart', // generic type id
        source : 'FusionCharts', // id of the source library
        name : 'FusionCharts Gauge', // visible name, this will come from a properties file eventually
        'class' : 'pentaho.fcplugin', 
        args : {
            chartType: "AngularGauge",
            range: '{"cols":[{"id":"[MEASURE:0]","label":"Start","type":"number"},{"id":"[MEASURE:0]","label":"Range1","type":"number"},{"id":"[MEASURE:0]","label":"Range2","type":"number"},{"id":"[MEASURE:0]","label":"Final","type":"number"}],'+
                   '"rows":[{"c":[{"f":"0","v":0},{"f":"20","v":20},{"f":"80","v":80},{"f":"100","v":100}]}]}',
            colorRange: 'FF654F;FF654F;F6BD0F;8BBA00'
        },
        propMap : [],
        dataReqs : [ //data requirements of this visualization
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
        $("#"+this.containerDiv.id).find("embed").attr("height",height);
        $("#"+this.containerDiv.id).find("embed").attr("width",width);
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
                isFree: false,
                data: datView.toDataTable().jsonTable
                //TODO convert to Google datatable to be more generic convertCdaToDataTable see pentaho-solutions\system\common-ui\resources\web\vizapi\DataTable.js
        }
        
        //Set arguments of visualization as options.
        $.each(this.controller.currentViz.args, function(key, value) { 
            options[key] = value;
          });
        
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
        $("#"+this.containerDiv.id).find("embed").attr("wmode","transparent"); 
        //TODO end of reuse XDashFusionChartComp and replace logic bellow. 
    }
});
