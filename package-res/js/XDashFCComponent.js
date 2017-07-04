define([
  'cdf/components/UnmanagedComponent',
  'cdf/dashboard/Utils',
  'amd!cdf/lib/underscore',
  'cdf/lib/jquery',
  'cdf/Logger'
], function(UnmanagedComponent, Utils, _, $, Logger) {
  'use strict';
  var XDashFCComponent = UnmanagedComponent.extend({

    update: function() {
      var render = _.bind(this.render, this);
      this.triggerQuery(this.chartDefinition, render);
    },


    render: function(values) {
      console.log("hello");
      var myself = this;
      var cd = myself.chartDefinition;
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
      console.log("test");
    }
  });
  return XDashFCComponent;
});
