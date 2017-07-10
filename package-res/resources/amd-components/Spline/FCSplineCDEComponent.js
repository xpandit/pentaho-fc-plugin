define([
    'cdf/dashboard/Utils',
    'amd!cdf/lib/underscore',
    'cdf/lib/jquery',
    'cdf/Logger',
    'xfusion/XDashFusionChartComponent',
    'xfusion/charts/ChartUtils',
], function ( Utils, _, $, Logger, XPFusionChartComponent,ChartUtils) {
    'use strict';


    var FCSplineCDEComponent = XPFusionChartComponent.extend({

        beforeProcessUpdate: XPFusionChartComponent.prototype.update,

        update: function () {
            try {
                ChartUtils.prototype.chartDefinitionCDEproperties(this, ChartUtils.prototype.getCdeChartProperties());
                this.beforeProcessUpdate();
            } catch (error) {
                console.log(error);
            }
        }

    });

    return FCSplineCDEComponent;

});
