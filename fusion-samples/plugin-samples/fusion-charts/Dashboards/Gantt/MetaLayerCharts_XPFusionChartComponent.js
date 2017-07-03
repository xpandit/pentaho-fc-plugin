var MetaLayerCharts= {

      Gantt: {
            height                 : "600",
            width                  : "900",
            chartType              : "Gantt",
            path                   : "/public/plugin-samples/fusion-charts/Dashboards/Gantt/gantt.cda",
            dataAccessId           : "4",
            processesPath          : "/public/plugin-samples/fusion-charts/Dashboards/Gantt/gantt.cda",
            processesDataAccessId  : "2",
            datatablePath          : "/public/plugin-samples/fusion-charts/Dashboards/Gantt/gantt.cda",
            datatableDataAccessId  : "3",
            milestonesPath         : "/public/plugin-samples/fusion-charts/Dashboards/Gantt/gantt.cda",
            milestonesDataAccessId : "5",
            connectorsPath         : "/public/plugin-samples/fusion-charts/Dashboards/Gantt/gantt.cda",
            connectorsDataAccessId : "6",
            chartProperties: {
                  caption               : "Construction management of a new store in Denver",
                  subcaption            : "Planned vs Actual",
                  dateformat            : "dd/mm/yyyy",
                  outputdateformat      : "ddds mns yy",
                  ganttwidthpercent     : "60",
                  ganttPaneDuration     : "40",
                  ganttPaneDurationUnit : "d",
                  plottooltext          : "$processName{br} $label starting date $start{br}$label ending date $end",
                  legendBorderAlpha     : "0",
                  legendShadow          : "0",
                  usePlotGradientColor  : "0",
                  showCanvasBorder      : "0",
                  flatScrollBars        : "1",
                  gridbordercolor       : "#333333",
                  gridborderalpha       : "20",
                  slackFillColor        : "#e44a00",
                  taskBarFillMix        : "light+0"
            },
            tasksProperties: {
                  taskCallback: function(data){
                        data.height = "32%";
                        if(data.label === "Planned"){
                              data.toppadding = "12%";
                        }else{
                              data.toppadding = "56%";
                        };
                  },
            },
            processesProperties: {
                  headertext      : "Task",
                  fontcolor       : "#000000",
                  fontsize        : "11",
                  isanimated      : "1",
                  bgcolor         : "#6baa01",
                  headervalign    : "bottom",
                  headeralign     : "left",
                  headerbgcolor   : "#999999",
                  headerfontcolor : "#ffffff",
                  headerfontsize  : "12",
                  align           : "left",
                  isbold          : "1",
                  bgalpha         : "25",
                  processCallback: function(data){
                        if(data.id==="2"){
                              data.hoverBandColor = "E44A00";
                              data.hoverBandAlpha = "40";
                        }
                  },
            },
            datatableProperties: {
                  showprocessname : "1",
                  namealign       : "left",
                  fontcolor       : "#000000",
                  fontsize        : "10",
                  valign          : "right",
                  align           : "center",
                  headervalign    : "bottom",
                  headeralign     : "center",
                  headerbgcolor   : "#999999",
                  headerfontcolor : "#ffffff",
                  headerfontsize  : "12",
                  datacolumnCallback:function(data){
                        data.bgcolor = "#eeeeee";
                        data.headertext = data.headertext.replace(/ /g,"{br}");
                  },
                  textCallback: function(headertext,data){
                        if(headertext === "Actual Start Date"){
                              if(data.label === "26/4/2014"){
                                    data.bgcolor = "E44A00";
                                    data.bgAlpha = "40";
                              };
                        };
                  },
            },
            connectorsProperties: {
                  connectorCallback: function(data){
                        data.color = "008EE4";
                        data.thickness = "2";
                  }
            },
            categoriesProperties: {
                  path              : "/public/plugin-samples/fusion-charts/Dashboards/Gantt/gantt.cda",
                  dataAccessId      : "1",
                  categoriesCallback: function(data){
                        data.bgcolor = "999999";
                        data.align = "middle";
                        data.fontcolor = "ffffff";
                        data.fontsize = "12";
                  },
                  categoryCallback: function(group, data){},
            },
            legendProperties: {
                  item  : [
                              {
                                    label : "Planned",
                                    color : "#008ee4"
                              },
                              {
                                    label : "Actual",
                                    color : "#6baa01"
                              },
                              {
                                    label : "Slack (Delay)",
                                    color : "#e44a00"
                              }
                        ],
            },
      },

};
