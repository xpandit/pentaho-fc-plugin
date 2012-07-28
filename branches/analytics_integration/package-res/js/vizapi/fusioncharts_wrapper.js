/**
 * Wrapper for the FusionCharts plugin
 * 
 */
pen.require(["common-ui/vizapi/VizController"], function(){

    // Plugin namespace
    pentaho.fcplugin = pentaho.fcplugin || {};

     //Register visualization API
    pentaho.visualizations.push({
        id : 'pentaho_sample_KPI', // unique identifier
        type : 'kpi', // generic type id
        source : 'Example', // id of the source library
        name : 'Example KPI', // visible name, this will come from a
        // properties
        // file eventually
        'class' : 'pentaho.fcplugin.KPI', // type of the Javascript object to
        // instantiate
        args : { // arguments to provide to the Javascript
        // object
        // this allows a single class to act as
        // multiple
        // visualizations
        },
        propMap : [],
        dataReqs : [ // dataReqs describes the data requirements
        // of
        // this visualization
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
                caption : 'Level', // visible name
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
            }, {
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
            } ]
        } ]
    });

    /**
     * The constructor of the visualization class
     * 
     * element HTML element, which acts as the parent node of your visualization
     */
    pentaho.fcplugin.KPI = function(canvasElement) {
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
    pentaho.fcplugin.KPI.prototype.resize = function(width, height) {
        //this.containerDiv.style.left = ((this.canvasElement.offsetWidth - this.numSpan.offsetWidth) / 2)      + 'px';
        //this.containerDiv.style.top = ((this.canvasElement.offsetHeight - this.numSpan.offsetHeight) / 2)+ 'px';
    };

    /**
     * Function that renders the visualizations
     * 
     * dataTable a pentaho.DataTable object with the data to display vizOptions
     * the options for the visualization
     */
    pentaho.fcplugin.KPI.prototype.draw = function(datView, vizOptions) {
        //TODO options object must be built based on Analyzer settings. BarChart2DAnalyzer.xfusion must be removed.
        var options = {
                xFusionPath: "bi-developers/fusion-charts/Fusion Charts Free/BarChart2DAnalyzer.xfusion",
                chartType: "Bar2D",
                height: 200,
                width: 500,
                data: datView.toDataTable().jsonTable
                //TODO convert to Google datatable to be more generic convertCdaToDataTable see pentaho-solutions\system\common-ui\resources\web\vizapi\DataTable.js
        }
        
        //TODO try to reuse XDashFusionChartComp and replace logic bellow. 
        //Requires taking XDashFusionChartComp out of the object
        var url = webAppPath + '/content/fusion/renderChartExternalData';
        // get the xml chart
        var resultXml = $.ajax({type: 'post', 
                                url: url, 
                                data: {json: JSON.stringify(options)},
                                async: false}).responseText;
        //render the chart
        var chartObject = new FusionCharts( webAppPath+"/content/fusion/swf/"+"FCF_"+options.chartType+".swf", this.containerDiv.id, options.width, options.height, "0","1" );
        chartObject.setDataXML(resultXml);
        chartObject.render(this.containerDiv.id);   
    }
});
