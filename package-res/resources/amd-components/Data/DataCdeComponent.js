define([
    'cdf/dashboard/Utils',
    'amd!cdf/lib/underscore',
    'cdf/lib/jquery',
    'cdf/Logger',
    'xfusion/XDashFCComponent',
    'xfusion/charts/ChartUtils',
], function ( Utils, _, $, Logger, XDashFCComponent,ChartUtils) {
    'use strict';
    

    var DataCdeComponent = XDashFCComponent.extend({
        
        beforeProcessUpdate: XDashFCComponent.prototype.update,

        update: function () {
            try {
                ChartUtils.prototype.chartDefinitionCDEproperties(this, ChartUtils.prototype.getCdeChartProperties());
                this.beforeProcessUpdate();
            } catch (error) {
                console.log(error);
            }
        }

    });

    return DataCdeComponent;

});