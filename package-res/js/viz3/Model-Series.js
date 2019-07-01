define([
	"pentaho/module!_",
	"pentaho/visual/Model",
	"./types/themeOptions",
	"./types/chartTypeOptions",
], function(module,BaseModel,ThemeOptions,ChartTypeOptions){
    "use strict";
		 	// Create the Bar Model subclass
	    var SeriesModel = BaseModel.extend({
	    	$type: {
		        id: module.id,

		        // CSS class
		        styleClass:"fusioncharts",

		        // The label may show up in menus
		        label: "Viz3 FusionCharts Series Charts",

		        // The default view to use to render this visualization is
		        defaultView: "./View-Series",

		        // Properties
		        props: [
				  // General properties
				  {
            		name: "series",
            		base: "pentaho/visual/role/Property",
            		modes: [
            			{dataType: "string"},
            			{dataType: "date"}
            		],
            		fields: {isRequired: true}
				  },
				  {
            		name: "category",
            		base: "pentaho/visual/role/Property",
            		modes: [
            			{dataType: "string"},
            			{dataType: "date"}
            		],
            		fields: {isRequired: true}
				  },
				  {
            		name: "measure",
		            base: "pentaho/visual/role/Property",
		            levels: "quantitative",
		            modes: [{dataType: "number"}],
		            fields: { isRequired: true }
				  },
				  {
					name: "chartType",
					valueType: ChartTypeOptions,
					domain: [
						"dragarea","dragcolumn2d","dragline",
						"inversemsarea","inversemscolumn2d","inversemsline",
						"logmscolumn2d","logmsline",
						"marimekko",
						"msarea",
						"msbar2d","msbar3d",
						"mscolumn2d","mscolumn3d",
						"msline",
						"msspline","mssplinearea",
						"radar",
						"scrollarea2d",
						"scrollcolumn2d",
						"scrollline2d",
						"scrollstackedcolumn2d",
						"sparkcolumn","sparkline",
						"stackedarea2d",
						"stackedbar2d","stackedbar3d",
						"stackedcolumn2d","stackedcolumn3d",
						"msstepline",
						"zoomline","zoomlinedy",
					],
					isRequired: true,
					defaultValue: "mscolumn2d"
				  },
				  {
					name: "theme",
					valueType: ThemeOptions,
					domain: ["none", "zune", "fint", "carbon", "ocean", "candy", "gammel", "umber", "fusion"],
					isRequired: true,
					defaultValue: "none"
				  }
		        ]
	 		}
	 	});
	 	return SeriesModel.configure();
});

