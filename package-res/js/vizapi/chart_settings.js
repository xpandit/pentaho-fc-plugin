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
            paletteColors: "AFD8F8,F6BD0E,8CBA00,FF8F47",
            placeValuesInside: 1,
            valuePosition: "ABOVE",
            exportEnabled: "1",
            exportAtClientSide: "1",
            exportShowMenuItem: "0",
            labelDisplay: "STAGGER"
        }
        return options;
    },

    fcplugin_angulargauge :  function(){
        var options = {
                width      : '800',
                height     : '500',
                showValue  : '1',
                valueBelowPivot : '1',
                colorRange : 'E44A00;F8BD19;6BAA01;8BBA00'               
        }
        return options;
    },

    fcplugin_bullet :  function(){
        var options = {
                width      : '800',
                height     : '500',
                colorRange : 'E44A00;F8BD19;6BAA01;8BBA00',
                colorRangeFillMix : '{light-30}'
        }
        return options;
    }
};
