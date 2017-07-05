var MetaLayerCharts = {

  Map: {
    height: "500",
    width: "900",
    chartType: "maps/world",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Maps/maps.cda",
    dataAccessId: "1",
    markers: false,
    chartProperties: {
      "caption": "Global Population",
      "theme": "fint",
      "formatNumberScale": "0",
      "numberSuffix": "M",
      "showLabels": "1",
      "includeNameInLabels": "1",
      "useSNameInLabels": "0"
    },
    colorRangeProperties: {
      path: "/public/plugin-samples/fusion-charts/Dashboards/Maps/maps.cda",
      dataAccessId: "2"
    },
  },

  MapWithMarkers: {
    height: "500",
    width: "900",
    chartType: "maps/world",
    path: "/public/plugin-samples/fusion-charts/Dashboards/Maps/maps.cda",
    dataAccessId: "3",
    markers: true,
    connectorsDataAccessId: "4",
    chartProperties: {
      "caption": "Busiest Routes from Heathrow Airport",
      "subcaption": "2014",
      "theme": "fint",
      "markerBgColor": "#FF0000",
      "markerRadius": "10",
      "showMarkerLabels": "1",
      "connectorColor": "#0CB2B0",
      "connectorHoverColor": "#339933",
      "entityFillColor": "#CECED2",
      "entityFillHoverColor": "#E5E5E9"
    },
    markersProperties: {
      shapes: [{
        "id": "airport",
        "type": "image",
        "url": "http://static.fusioncharts.com/docs/assets/airplane-99047_150.png",
        "xscale": "15",
        "yscale": "15",
        "labelPadding": "15"
      }],
      itemsCallback: function(data) {
        data.shapeid = "airport";
      },
      connectorsCallback: function(data) {
        data.tooltext = "Total Passengers: " + data.tooltext;
      }
    },
  }

};
