define([
  'cdf/components/UnmanagedComponent',
  'cdf/dashboard/Utils',
  'amd!cdf/lib/underscore',
  'cdf/lib/jquery',
  'cdf/Logger',
  'xfusion/charts/ChartUtils'
], function(UnmanagedComponent, Utils, _, $, Logger, ChartUtils) {
  'use strict';
  var XPFusionChartComponent = UnmanagedComponent.extend({

    update: function() {
      var render = _.bind(this.render, this);
      this.chartDefinition.path = ChartUtils.prototype.calculateRelativePath(this.chartDefinition.path,this.dashboard.context.path);
      this.triggerQuery(this.chartDefinition, render);
    },

    render: function(values) {
      var myself = this;
      var cd = myself.chartDefinition;
      var path = window.location.pathname.split('/');
      var urlApi = window.location.origin + "/" + path[1] + '/plugin/fusion_plugin/api/verifyKey';
      var fusionkey = $.ajax({
        type: 'GET',
        url: urlApi,
        async: false,
        error: function(xhr, textStatus, error) {
          alert("Error while validating your key. Make sure your key is valid")
        }
      }).responseText;
      // error validating key
      if (fusionkey.match("<html >")) {
        $("#" + myself.htmlObject).html(fusionkey);
        return;
      }

      // error key expired
      fusionkey = fusionkey.split("-", 2);
      if (fusionkey[0].match("Error")) {
        fusionkey[0] = fusionkey[0].replace("Error:", " ");
        $("#" + myself.htmlObject).html("<div class=\"alert alert-danger\"><strong>Error!</strong>" + fusionkey[0] + "</div>");
        return;
      }
      // Error fusion XT not installed
      if (fusionkey[1].match("true")) {
        $("#" + myself.htmlObject).html("<div class=\"alert alert-danger\">You need to install FusionCharts XT to render the chart</div>");
        return;
      }
      if (!_.has(cd, 'chartType')) {
        // display missing options error
        $("#" + myself.htmlObject).html("<div class=\"alert alert-info\">Missing Chart Type (chartType)</div>");
        return;
      }
      if (!_.has(myself, 'htmlObject')) {
        // display missing options error
        $("#" + myself.htmlObject).html("<div class=\"alert alert-info\">Missing HTML Object ID (htmlObject)</div>");
        return;
      }

      switch (myself.dataType.toLowerCase()) {
        case "data":
          window.require(['xfusion/charts/Data'], function(Data) {
            var chart = new Data(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartData(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());

            return chart;
          });

          break;
        case "dataset":
          window.require(['xfusion/charts/DataSet'], function(DataSet) {
            var chart = new DataSet(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartDataSet(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());

            return chart;
          });

          break;
        case "series":
          window.require(['xfusion/charts/Series'], function(Series) {
            var chart = new Series(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartSeries(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());
            // if is a realtime chart
            if (_.has(cd, 'cdaRefreshInterval')) {
              chart.realtimeChart(myself, cd);
            }

            return chart;
          });
          break;
        case "value":
          window.require(['xfusion/charts/Value'], function(Value) {
            var chart = new Value(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartValue(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());
            // if is a realtime chart
            if (_.has(cd, 'cdaRefreshInterval')) {
              chart.realtimeChart(myself, cd);
            }

            return chart;
          });
          break;
        case "pointers":
          window.require(['xfusion/charts/Pointers'], function(Pointers) {
            var chart = new Pointers(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartPointers(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());
            // if is a realtime chart
            if (_.has(cd, 'cdaRefreshInterval')) {
              chart.realtimeChart(myself, cd);
            }

            return chart;
          });
          break;
        case "seriescolumn":
          window.require(['xfusion/charts/SeriesColumn'], function(SeriesColumn) {
            var chart = new SeriesColumn(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartSeriesColumn(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());

            return chart;
          });
          break;
        case "gantt":
          window.require(['xfusion/charts/Gantt'], function(Gantt) {
            var chart = new Gantt(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartGantt(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());

            return chart;
          });
          break;
        case "dials":
          window.require(['xfusion/charts/Dials'], function(Dials) {
            var chart = new Dials(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartDials(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());
            // if is a realtime chart
            if (_.has(cd, 'cdaRefreshInterval')) {
              chart.realtimeChart(myself, cd);
            }

            return chart;
          });
          break;
        case "multipledatasets":
          window.require(['xfusion/charts/MultipleDataSets'], function(MultipleDataSets) {
            var chart = new MultipleDataSets(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartMultipleDataSets(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());

            return chart;
          });
          break;
        case "datasetandconnectors":
          window.require(['xfusion/charts/DataSetAndConnectors'], function(DataSetAndConnectors) {
            var chart = new DataSetAndConnectors(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartDataSetAndConnectors(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());

            return chart;
          });
          break;
        case "maps":
          window.require(['xfusion/charts/Maps'], function(Maps) {
            var chart = new Maps(myself.name, cd.width, cd.height, cd.chartType, myself.htmlObject);
            chart.setBuildChartMaps(cd, values);
            chart.setAdditionalOptions(cd);
            chart.renderChart(myself, chart.getFusionOptions(), chart.getData());

            return chart;
          });
          break;
        default:
          $("#" + myself.htmlObject).html("<div class=\"alert alert-info\"><strong>Chart Not Supported!</strong> This chart is not supported by the component</div>");
          break;
      }
    }
  });
  return XPFusionChartComponent;
});
