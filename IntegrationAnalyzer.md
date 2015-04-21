| Only Available with FusionCharts XT and Pentaho Business Analytics 4.5 |
|:-----------------------------------------------------------------------|

# Introduction #

Since version 4.5 of Pentaho Business Analytics it is possible to add external chart libraries to Analyzer (Only available on Enterprise Version). By leveraging this functionality the FusionCharts plugin can now be integrated with Analyzer.

## What you get! ##

Any user without any technical knowledge can simply drag and drop dimensions and measures creating and analysis and then switch to chart mode and visualize it on FusionCharts.

## How to use it ##

  1. Model cubes and publish on Analyzer
  1. Install the plugin as explained on [Manual](Manual.md)
  1. Start using it!
    1. On Analyzer click on "Switch to Chart Format" and select one of the FusionCharts... entries
    1. The field layout will change according to the selected type of chart and should be self explanatory

### Available Chart Types ###
For a list of supported charts check on the page [SupportedCharts](SupportedCharts.md) those that have _(Analyzer)_

## Settings ##

### Change Look & Feel ###
It is possible to change chart settings the same way as if you were using it on CDF, for more information about available settings check [SupportedParameters](SupportedParameters.md).How to:
  1. Open file _\fusion\_plugin\js\vizapi\chart\_settings.js_
  1. Edit the returned properties on 2 levels:
    1. Overall, applies to every chart and are set by changing the function _getOverallSettings()_
    1. For each chart type you can create a specific function that contains specific properties and can override overall settings. The function name must be the same as the chart id (id can be found on _\fusion\_plugin\js\vizapi\fusioncharts\_wrapper.js_). The plugin ships with an example _fcplugin\_angulargauge()_
    1. You also can change here the property to use free charts (isFree: true)

### Disable Analyzer Integration ###
If you are using Pentaho CE version or if you don't need Analyzer integration you can disable it.
  1. Open file plugin.xml on the plugin root folder
  1. Comment all entries with ` context="analyzer" ` by using ` <!-- -->`