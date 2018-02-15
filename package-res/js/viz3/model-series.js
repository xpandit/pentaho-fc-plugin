define([
	"module"
], function(module){
	"use strict";

	return [
		"pentaho/visual/base/model",
		"./types/themeOptions",
		"./types/chartTypeOptions",
		function(BaseModel,ThemeOptions,ChartTypeOptions) {
		 	// Create the Bar Model subclass
	    var SeriesModel = BaseModel.extend({
	    	$type: {
		        id: module.id,

		        // CSS class
		        styleClass:"fusioncharts",

		        // The label may show up in menus
		        label: "Viz3 FusionCharts Series Charts",

		        // The default view to use to render this visualization is
		        defaultView: "./view-series",

		        // Properties
		        props: [
				  // General properties
				  {
            		name: "series",
            		base: "pentaho/visual/role/property",
            		levels: "ordinal",
					attributes: { isRequired: true, countMax: 1 }
				  },
				  {
            		name: "category",
            		base: "pentaho/visual/role/property",
            		levels: "ordinal",
					attributes: { isRequired: true, countMax: 1 }
				  },
				  {
            		name: "measure",
		            base: "pentaho/visual/role/property",
		            levels: "quantitative",
		            dataType: "number",
		            attributes: { isRequired: true, countMax: 1 }
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
					domain: ["none", "zune", "fint", "carbon", "ocean"],
					isRequired: true,
					defaultValue: "none"
				  }
		        ]
	 		}
	 	});
	 	return SeriesModel;
	}]
});

