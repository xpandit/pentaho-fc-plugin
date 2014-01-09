/**
 * File that contains Analyzer chart settings. Change to provide a different
 * look to the charts.
 */
//TODO place on the correct context pentaho.fcplugin

var chartSettingsManager = {
    /**
     * Overall look and feel setting that can be overridden bellow for specific chart types.
     */
    getOverallSettings : function(){
        var options = {
            isFree : false,
            bgColor : "e5e5e5",
            baseFontColor : 888888,
            showBorder : 0,
            showLegend : 0,
            showPlotBorder : 0,
            plotBorderColor : "e5e5e5",
            canvasBgColor : "e5e5e5",
            canvasBorderThickness : 0,
            canvasBgDepth : 2,
            rotateLabels : 1,
            showLimits : 0,
            adjustTM : 0,
            alternateHGridAlpha : 0,
            canvasBaseDepth : 3,
            bgAngle : 0,
            plotGradientColor : '',
            canvasBorderalpha : 0,
            paletteColors : "afd8f8;f6bd0e;8cba00;ff8f47",
            placeValuesInside : 1,
            valuePosition : "ABOVE",
            categoriesColor : "afd8f8;f6bd0e;8cba00;ff8f47",
            seriesColor : "afd8f8;f6bd0e;8cba00;ff8f47",
            trendLineId : "trend_line_type",
            trendLineColors : "afd8f8;f6bd0e;8cba00;ff8f47",
            trendLineShadiness : "true",
            trendLineNrShades : 6,
            trendLineMin : "Minimum",
            trendLineAvg : "Average",
            trendLineSLR : "Simple Linear Regression",
            trendLineMax : "Maximum"
        }
        return options;
    }, 
    
    fcplugin_angulargauge :  function(){
        var options = {
                colorRange : 'FF654F;FF654F;F6BD0F;8BBA00'
        }
        return options;
    },
    
    fcplugin_bullet :  function(){
        var options = {
                colorRange : 'FF654F;FF654F;F6BD0F;8BBA00'
        }
        return options;
    }
};