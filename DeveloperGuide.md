# Pre-Requirements #

  * [Pentaho BI Platform](http://sourceforge.net/projects/pentaho/files/Business%20Intelligence%20Server/) 3.7 or above should be installed.
  * The Pentaho CDF plugin must be installed.
  * [Ant](http://ant.apache.org/bindownload.cgi) is installed
  * Have an SVN client or plugin for you favourite IDE

# How to start #

  1. Get the project through SVN by setting the url on the source tab
  1. Setup _build.properties_
    1. Specify your Pentaho solutions directory on _dir.solutions_
  1. Execute _ant_ default task (dist)
  1. Execute _ant install to get the plugin and the samples copied  to your Pentaho installation
  1. Change the file_system/pentaho.xml_to include another entry on the acl-files list: ` _<acl-files>...,xfusion</acl-files>_`
  1. Restart Pentaho
  1. Open the user console
  1. Go to path_bi-developers/fusion-samples_1. Double click on the samples available_

# How to add new charts #

If the chart you want to add has a similar XML structure to the ones already available, all you need to do is add the new chart to the ChartType enum in the _ChartType.java_ file and recompile the code.

If you want to add a chart or widget with a different XML structure from the ones who already exist, you will need to do some development on the _ChartFactoryWidget.java_ or _ChartFactoryChart.java_ files depending on the kind of chart you want do add. Check some code examples on how to add an Angular Gauge or Bullet widgets in the _ChartFactoryWidget.java_ file.

The swf files associated to the new charts should be placed in the _fusioncharts/charts_ path.

After making the development:
  * create a sample that tests the chart
  * submit the code and the sample by opening an issue