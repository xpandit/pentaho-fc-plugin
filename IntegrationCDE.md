## Integrate Fusioncharts(above than version 3.0) with CDE ##

  1. Install the plugin [DeveloperGuide](DeveloperGuide.md)
  1. Update file system/pentaho-cdf-dd/resources/styles/Clean.html
```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
@HEADER@
		<script type='text/javascript' src="/pentaho/content/xfusion/JSClass/FusionCharts.js"></script>
		<script type="text/javascript" src="/pentaho/content/xfusion/js/XDashFusionChartComponent.js"></script>
		<script type="text/javascript" src="/pentaho/content/xfusion/js/CDE.js"></script>
```
  1. Restart Pentaho
  1. Create a new dashboard using CDE.
  1. Select add a new FusionCharts Component
  1. Configure the CDA file and querie id
  1. Configure the Width ,Height and HtmlObject
  1. Save and run


## Integrate Fusioncharts(above than version 2.0) with CDE ##

  1. Install the plugin [DeveloperGuide](DeveloperGuide.md)
  1. Unzip the content of fusion\_pentaho-CDE-XXXX.zip to system/pentaho-cdf-dd
  1. Update file system/pentaho-cdf-dd/resources/styles/Clean.html
```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
@HEADER@
<script type='text/javascript' src="/pentaho/content/pentaho-cdf/GetCDFResource?resource=/system/fusion_plugin/fusioncharts/JSClass/FusionCharts.js"></script>
		<script type="text/javascript" src="/pentaho/content/pentaho-cdf/GetCDFResource?resource=/system/fusion_plugin/js/XDashFusionChartComponent.js"></script>
		<script type="text/javascript" src="/pentaho/content/pentaho-cdf/GetCDFResource?resource=/system/fusion_plugin/js/CDE.js"></script>
```
  1. Restart Pentaho
  1. Create a new dashboard using CDE.
  1. Select add a new FusionCharts Component
  1. Configure the CDA file and querie id
  1. Configure the Width ,Height and HtmlObject
  1. Save and run


## Integrate Fusioncharts(V1.0 and V2.0)with CDE ##

  1. Install the plugin [DeveloperGuide](DeveloperGuide.md)
  1. Run: ant install-cdf-dd-res
  1. Restart Pentaho
  1. Create a new dashboard using CDE.
  1. Select add a new FusionCharts Component
  1. Configure the CDA file and querie id
  1. Configure the Width ,Height and HtmlObject
  1. Save and run

### Examples ###
We've created an example of FusionCharts+CDE in:
bi-developers\fusion-charts\Dashboards\FusionCharts\_CDE