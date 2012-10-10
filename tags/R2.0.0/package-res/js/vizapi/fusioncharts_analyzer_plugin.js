/**
 * FusionCharts Analyzer plugin
 **/
var analyzerPlugins = analyzerPlugins || []; 

analyzerPlugins.push( 
    { 
      init:function () {
          
          /*
          LayoutConfig objects manage the interaction between Analyzer's Layout Panel
          and the visualization's settings.
          */

         // Declare a new class which extends the built-in version from Analyzer 
         dojo.declare("FCPluginConfig", [analyzer.LayoutConfig], { 

           /** 
            * @param config    The parse Configuration object which serves 
            *                  as the model of the Panel 
            * @param item      The item in the panel which originated the event. 
            * @param eventName The name of the event (clicked, value, etc) 
            * @param args      A Hash Object containing relevent values (prevVal, 
            *                  newVal, etc) 
            */ 
           onModelEvent: function(config, item, eventName, args) {
            var report=this.report;
			
			
			
			//set the items with the locations to be used when chart is generated
			
			
			/**********************************************************************
								
									Combi Options
			
			**********************************************************************/
			
			if(config.byId('measures_column')!=undefined)
			{
				this.report.visualization.args['measures_column']=[];
				$(config.byId("measures_column").gems).each(
					function(){
								report.visualization.args['measures_column'].push(this.value);
							});
			}
			
			if(config.byId('measures_line')!=undefined)	
			{			
				this.report.visualization.args['measures_line']=[];
				$(config.byId("measures_line").gems).each(
					function(){
								report.visualization.args['measures_line'].push(this.value);
							});
			}
			
			if(config.byId('measures_area')!=undefined)
			{
				this.report.visualization.args['measures_area']=[];
				$(config.byId("measures_area").gems).each(
					function(){
								report.visualization.args['measures_area'].push(this.value);
							});
			}
			
			
			/**********************************************************************
								
									Gauge and Bullet Chart Options
			
			**********************************************************************/
			
			if(config.byId('redLimit')!=undefined)
				this.report.visualization.args['redLimit']=config.byId('redLimit').value;
			
			if(config.byId('yellowLimit')!=undefined)
				this.report.visualization.args['yellowLimit']=config.byId('yellowLimit').value;
			
			if(config.byId('greenLimit')!=undefined)
				this.report.visualization.args['greenLimit']=config.byId('greenLimit').value;
			
			/**********************************************************************
								
									General Options
			
			**********************************************************************/
			
			// fired it is for the orientation
			if(config.byId('orientation')!=undefined)
				this.report.visualization.args['orientation'] = config.byId('orientation').value; 
			// fired it is for the 2d_3d
			if(config.byId('2d_3d')!=undefined)
				this.report.visualization.args['2d_3d'] = config.byId('2d_3d').value; 
				
            this.inherited(arguments); // Let super class handle the insertAt and 
                                        // removedGem events 
           }, 

           /** 
            * Return the JSON configuration object which the panel will use to 
            * create the UI and its model 
            */ 
           getConfiguration: function() { 
             var config = this.inherited(arguments); 

             dojo.forEach(config.properties, function (item) { 
               if (this.report.visualization.args[item.id] !== 'undefined') { 
                 item.value = this.report.visualization.args[item.id]; 
               } 
             }, this); 
             return config; 
           } 
         }); 
          

        //Loop all FusionCharts vizualizations 
        $.each(pentaho.visualizations, function(key, value) {
            if(value.id.substr(0,9)=='fcplugin_'){
             // Register  visualizations to display in Analyzer 
                cv.pentahoVisualizations.push(value);
                
                
                /* 
                Helpers contain code that knows about the Analyzer specific context. The one 
                function that's required "generateOptionsFromAnalyzerState" is called so the 
                visualization can set its own options based on Analyzer's current report. 
                */ 
               cv.pentahoVisualizationHelpers[value.id] = {  
                 placeholderImageSrc: CONTEXT_PATH 
                                      + 'content/fusion/res/background_logo.jpg', 

                 /**
                  * This method is used to set visualization options based on the Analyzer 
                  * report definition or the current state of the report editor/viewer.  
                  * This is called right before the visualization is drawn.  The returned 
                  * options are not saved as part of the visualization state when saving 
                  * an Analyzer report showing this visualization.
                  *
                  *  @return  a hash object containing the custom state of your 
                  *           visualization.
                  */
                 generateOptionsFromAnalyzerState:function (report) { 
                   return {}; // perform no work 
                 }
               };
               
               // Register the Layout Panel Configuration Manager 
               // Note that the string entry matches 'JSON_' plus the visualization id 
               // defined earlier
               analyzer.LayoutPanel.configurationManagers['JSON_'+value.id] = FCPluginConfig; 
            }
        }); 
      }
    }
);