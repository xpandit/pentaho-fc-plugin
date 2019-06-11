define([
	"module"
], function(module){
	"use strict";

	return [
		"pentaho/visual/base/model",
		"./types/themeOptions",
		"./types/chartTypeOptions",
		"./types/renderAsOptions",
		function(BaseModel,ThemeOptions,ChartTypeOptions, RenderAsOptions) {
		 	// Create the Bar Model subclass
	    var CombinationModel = BaseModel.extend({
	    	$type: {
		        id: module.id,

		        // CSS class
		        styleClass:"fusioncharts",

		        // The label may show up in menus
		        label: "Viz3 FusionCharts Combination Charts",

		        // The default view to use to render this visualization is
		        defaultView: "./view-combination",

		        // Properties
		        props: [
				  // General properties
				  {
            		name: "category",
            		base: "pentaho/visual/role/property",
            		modes: [
            			{dataType: "string"},
            			{dataType: "date"}
            		],
            		fields: {isRequired: true}
				  },
				  {
            		name: "measures",
		            base: "pentaho/visual/role/property",
		            modes: [{dataType: ["number"]}],
		            fields: { isRequired: true, countMax: 3 }
				  },
				  {
					name: "chartType",
					valueType: ChartTypeOptions,
					domain: [
						"mscombi2d","mscombidy2d","mscombi3d",
						"mscolumn3dlinedy","mscolumnline3d",
						"scrollcombidy2d","scrollcombi2d",
					],
					isRequired: true,
					defaultValue: "mscombi2d"
				  },
				  {
					name: "theme",
					valueType: ThemeOptions,
					domain: ["none", "zune", "fint", "carbon", "ocean", "candy", "gammel", "umber", "fusion"],
					isRequired: true,
					defaultValue: "none"
				  },
				  {
					name: "render line",
					valueType: RenderAsOptions,
					domain: ["-1","0", "1", "2"],
					isRequired: true,
					defaultValue: "-1"
				  },
				  {
					name: "render area",
					valueType: RenderAsOptions,
					domain: ["-1","0", "1", "2"],
					isRequired: true,
					defaultValue: "-1"
				  },
				  {
					name: "secondary y-axis",
					valueType: RenderAsOptions,
					domain: ["-1","0", "1", "2"],
					isRequired: true,
					defaultValue: "-1"
				  }
		        ]
	 		}
	 	});
	 	return CombinationModel;
	}]
});

