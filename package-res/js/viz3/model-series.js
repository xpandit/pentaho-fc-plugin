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
					"mscolumn2d", "mscolumn3d", 
					"msline", 
					"msbar2d", "msbar3d", 
					"msarea",
					//Untested
					"marimekko",
					"zoomline", 
					"zoomlinedy", 
					"stackedcolumn2d", 
					"stackedcolumn3d", 
					"stackedbar2d", 
					"stackedbar3d", 
					"stackedarea2d", 
					"zoomscatter", 
					"bubble",
					"scrollstackedcolumn2d", 
					"logmscolumn2d", 
					"logmsline", 
					"msspline", 
					"mssplinearea",
					"errorbar2d", 
					"errorline", 
					"errorscatter", 
					"inversemsarea", 
					"inversemscolumn2d",
					"inversemsline",
					"selectscatter", 
					"mscombi2d", 
					"mscombi3d",
					"mscolumnline3d",
					"stackedcolumn2dline",
					"stackedcolumn3dline", 
					"mscombidy2d", 
					"mscolumn3dlinedy",
					"stackedcolumn3dlinedy",
					"scrollcombi2d", 
					"dragcolumn2d", 
					"dragline",
					"dragarea",
					"radar",
					"msstepline",
					"scrollcolumn2d",
					"scrollline2d",
					"scrollarea2d",
					"sparkline",
					"sparkcolumn",
					"sparkwinloss" 
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

