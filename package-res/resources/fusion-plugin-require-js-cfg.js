// require config for fusion Charts

(function() {

	var requirePaths = requireCfg.paths;
  var path = window.location.pathname.split('/');

  if (typeof CONTEXT_PATH !== "undefined") { // production
    prefixResources = "/" + path[1] + "/" + 'api/repos/fusion_plugin/resources';
    prefixFC = "/" + path[1] + "/" + 'api/repos/fusion_plugin/fusioncharts/JSClass';
    prefixJS = "/" + path[1] + "/" + 'api/repos/fusion_plugin/js';

  } else if (typeof FULL_QUALIFIED_URL != "undefined") { // embedded production
    prefixResources = window.location.origin + "/" + path[1] + "/" + 'api/repos/fusion_plugin/resources';
    prefixFC = window.location.origin + "/" + path[1] + "/" + 'api/repos/fusion_plugin/fusioncharts/JSClass';
    prefixJS = window.location.origin + "/" + path[1] + "/" + 'api/repos/fusion_plugin/js';

  } else { // build
    prefixResources = '../resources';
    prefixFC = '../fusioncharts/JSClass';
    prefixJS = '../js';
  }

	//Samples
	requirePaths['xfusion/SampleEndpoints'] = prefixJS + '/endpointsForSamples';
  //Core Component
  requirePaths['xfusion/XDashFusionChartComponent'] = prefixJS + '/XDashFusionChartComponent';

  //FC Plugin javascript classes
  requirePaths['xfusion/charts/Chart'] = prefixJS + '/xfusion/Chart';
  requirePaths['xfusion/charts/Series'] = prefixJS + '/xfusion/Series';
  requirePaths['xfusion/charts/Data'] = prefixJS + '/xfusion/Data';
  requirePaths['xfusion/charts/DataSet'] = prefixJS + '/xfusion/DataSet';
  requirePaths['xfusion/charts/Dials'] = prefixJS + '/xfusion/Dials';
  requirePaths['xfusion/charts/MultipleDataSets'] = prefixJS + '/xfusion/MultipleDataSets';
  requirePaths['xfusion/charts/SeriesColumn'] = prefixJS + '/xfusion/SeriesColumn';
  requirePaths['xfusion/charts/Value'] = prefixJS + '/xfusion/Value';
  requirePaths['xfusion/charts/Pointers'] = prefixJS + '/xfusion/Pointers';
  requirePaths['xfusion/charts/Gantt'] = prefixJS + '/xfusion/Gantt';
  requirePaths['xfusion/charts/DataSetAndConnectors'] = prefixJS + '/xfusion/DataSetAndConnectors';
  requirePaths['xfusion/charts/Maps'] = prefixJS + '/xfusion/Maps';
  requirePaths['xfusion/charts/ChartUtils'] = prefixJS + '/xfusion/utils/ChartUtils';

  //CDE Require scripts
	requirePaths['fusion_plugin/components/FCSingleSeriesCDEComponent']  = prefixResources + '/amd-components/SingleSeries/FCSingleSeriesCDEComponent';
  requirePaths['fusion_plugin/components/FCMultiSeriesCDEComponent']  = prefixResources + '/amd-components/MultiSeries/FCMultiSeriesCDEComponent';

  //FC Library
  requirePaths['xfusion/fclib/FusionCharts'] = prefixFC + '/FusionCharts';
	//Themes
  requirePaths['xfusion/fclib/fusioncharts.theme.ocean'] = prefixFC + '/themes/fusioncharts.theme.ocean';
  requirePaths['xfusion/fclib/fusioncharts.theme.carbon'] = prefixFC + '/themes/fusioncharts.theme.carbon';
  requirePaths['xfusion/fclib/fusioncharts.theme.zune'] = prefixFC + '/themes/fusioncharts.theme.zune';
  requirePaths['xfusion/fclib/fusioncharts.theme.fint'] = prefixFC + '/themes/fusioncharts.theme.fint';
	requirePaths['xfusion/XPTheme'] = prefixJS + '/XPTheme';

})();
