define([
  'cdf/components/BaseComponent',
  'cdf/dashboard/Utils',
  'amd!cdf/lib/underscore',
  'cdf/lib/jquery',
  'cdf/Logger'
], function(UnmanagedComponent, Utils, _, $, Logger) {
  'use strict';
  var XDashFusionChartComponent = BaseComponent.extend({

    update: function() {
      var render = _.bind(this.render, this);
      this.triggerQuery(this.chartDefinition, render);
    },


    render: function(values) {

    }
  });
  return XDashFusionChartComponent
});
