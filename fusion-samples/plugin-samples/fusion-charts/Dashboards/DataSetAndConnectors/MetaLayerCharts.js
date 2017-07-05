var MetaLayerCharts= {

      DragNode: {
            height                        : "600",
            width                         : "950",
            chartType                     : "DragNode",
            path                          : "/public/plugin-samples/fusion-charts/Dashboards/DataSetAndConnectors/dataSetAndConnectors.cda",
            dataAccessId                  : "4",
            connectorsPath                : "/public/plugin-samples/fusion-charts/Dashboards/DataSetAndConnectors/dataSetAndConnectors.cda",
            connectorsDataAccessId        : "5",
            //Properties for the chart
            chartProperties: {
                  palette           : "2",
                  xaxisminvalue     : "0",
                  xaxismaxvalue     : "100",
                  yaxisminvalue     : "0",
                  yaxismaxvalue     : "100",
                  is3d              : "0",
                  showformbtn       : "0",
                  viewmode          : "0",
                  theme             : "fint",
            },
            // Properties for the dataset (nodes)
            dataSetProperties: {
                  plotborderalpha   : "0",
                  allowdrag               : "1",
                  showformbtn             : "0",
                  //Function to apply properties to nodes individually
                  dataSetCallback: function(data) {
                        if(data.id == "null" || data.id == "null2" || data.id == "null3"){
                              data.width= "50";
                              data.height = "40";
                              data.alpha = "0";
                              data.allowdrag = "0";
                        }else{
                              if(data.id == "pc1"){
                                    data.width = "110";
                                    data.height = "90";
                                    data.imagenode = "1";
                                    data.imageurl = "http://www.fusioncharts.com/explore/Resources/desktop.png";
                                    data.tooltext = "Name: PC1 <br> IP: 202.11.32.123 <br> Owner: Harry Mac";
                                    // apply a Javascript link to node with the data as a argument
                                    data.link = "JavaScript:Dashboard.nodelink("+data.id+","+data.tooltext+")";
                                    data.color="FE3233";
                                    data.alpha = "0"
                                    data.labelalign = "top";
                                    data.imagealign = "middle";
                                    data.imagewidth = "107";
                                    data.imageheight = "67";
                                    data.allowdrag = "1"
                              }else{
                                    // apply a webpage link to a node
                                    if(data.name == "Internet"){data.link = "n-http://www.fusioncharts.com/charts/drag-node-charts/";}
                                    data.shape= "circle";
                                    data.radius = "40";
                              }
                        }
                  }
            },
            //Properties to apply in the connectors
            connectorsProperties: {
                  stdthickness      : "5",
                  //Function to apply properties to connectres individually
                  connectorCallback: function (data){
                        data.arrowatstart = "0";
                        data.arrowatend = "0";
                        data.link = "n-http://www.fusioncharts.com/charts/drag-node-charts/";
                  }
            },
            //(Optional) Define vertical trendlines
            vtrendlinesProperties:{
                  path:"/public/plugin-samples/fusion-charts/Dashboards/DataSetAndConnectors/dataSetAndConnectors.cda",
                  dataAccessId: "2",
                  vlineCallback: function(data){
                        if(data.endvalue=="30"){data.color = "FF0000"; data.displayvalue = "External Network"};
                        if(data.endvalue=="60"){data.color = "00FF00"; data.displayvalue = "Middleware"};
                        if(data.endvalue=="100"){data.color = "0000FF"; data.displayvalue = "Internal Network"};
                        data.alpha = "5";
                        data.istrendzone = "1";
                  }
            },
            //(Optional) Define labels
            labelsProperties: {
                  path              :"/public/plugin-samples/fusion-charts/Dashboards/DataSetAndConnectors/dataSetAndConnectors.cda",
                  dataAccessId      : "3",
                  labelCallback: function(data){
                        data.color = "000000";
                        data.fontsize = "18";
                  },
            }
      },
};
