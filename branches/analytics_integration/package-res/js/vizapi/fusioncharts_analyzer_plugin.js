/**
 * FusionCharts Analyzer plugin
 **/
var analyzerPlugins = analyzerPlugins || []; 

analyzerPlugins.push( 
    { 
      init:function () { 

        // Register visualizations to display in Analyzer 
        cv.pentahoVisualizations.push(pentaho.visualizations.getById('pentaho_sample_KPI')); 

        /* 
         Helpers contain code that knows about the Analyzer specific context. The one 
         function that's required "generateOptionsFromAnalyzerState" is called so the 
         visualization can set its own options based on Analyzer's current report. 
         */ 
        cv.pentahoVisualizationHelpers['pentaho_sample_KPI'] = { 
          // use one of Analyzer's stock placeholder images 
          placeholderImageSrc: CONTEXT_PATH 
                               + 'content/analyzer/images/viz/VERTICAL_BAR.png', 

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

        /*
         LayoutConfig objects manage the interaction between Analyzer's Layout Panel
         and the visualization's settings.
         */

        // Declare a new class which extends the built-in version from Analyzer 
        dojo.declare("SampleConfig", [analyzer.LayoutConfig], { 

          /** 
           * @param config    The parse Configuration object which serves 
           *                  as the model of the Panel 
           * @param item      The item in the panel which originated the event. 
           * @param eventName The name of the event (clicked, value, etc) 
           * @param args      A Hash Object containing relevent values (prevVal, 
           *                  newVal, etc) 
           */ 
          onModelEvent: function(config, item, eventName, args) {
            // This component has a single argument, so we assume if this event is 
            // fired it is for the aggregate
            this.report.visualization.args['aggregate'] = config.byId('aggregate').value; 
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

        // Register the Layout Panel Configuration Manager 
        // Note that the string entry matches 'JSON_' plus the visualization id 
        // defined earlier
        analyzer.LayoutPanel.configurationManagers['JSON_pentaho_sample_KPI'] = SampleConfig; 
      }
    }
);