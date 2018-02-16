define([
	'cdf/lib/jquery',
	'amd!cdf/lib/underscore'
], function ($, _) {
    'use strict';

    function Utils(){};
    
    Utils.prototype = {
        validateFusionKey: function(domContainer){
            if(!sessionStorage.getItem("validFusionKey") || !sessionStorage.getItem("validFusionXT")){
                // Request Fusion API Key Validation
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

                // Response: error validating key
                if (fusionkey.match("<html >")) {
                    domContainer.innerHTML = fusionkey;
                    return false;
                }
                // Response: error key expired
                fusionkey = fusionkey.split("-", 2);
                if (fusionkey[0].match("Error")) {
                    fusionkey[0] = fusionkey[0].replace("Error:", " ");
                    domContainer.innerHTML = 
                    "<div class=\"reportEmpty\">"+
                    "<div class=\"viz-image  pentaho-type-instance pentaho-type-value pentaho-type-element pentaho-type-complex pentaho-type-model pentaho-visual-base-model fusioncharts component-icon-landscape\"><img src=\"../analyzer/images/spacer.gif\"></div>"+
                    "<br>"+
                    "<strong>Error!</strong><br>" + fusionkey[0] + "</div>";
                    return false;
                }
                sessionStorage.validFusionKey = true;
                // Response: Error fusion XT not installed
                if (fusionkey[1].match("true")) {
                    domContainer.innerHTML = 
                    "<div class=\"reportEmpty\">"+
                    "<div class=\"viz-image  pentaho-type-instance pentaho-type-value pentaho-type-element pentaho-type-complex pentaho-type-model pentaho-visual-base-model fusioncharts component-icon-landscape\"><img src=\"../analyzer/images/spacer.gif\"></div>"+
                    "<br>"+
                    "<strong>Error!</strong><br>You need to install FusionCharts XT to render the chart</div>";
                    return false;
                }
                sessionStorage.validFusionXT = true;
            }
            return true;
        },
    }

    return Utils;
    
});