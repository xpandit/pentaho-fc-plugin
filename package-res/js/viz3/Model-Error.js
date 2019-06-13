define([
	"pentaho/module!_",
	"pentaho/visual/base/Model",
    "./types/themeOptions",
	"./types/chartTypeOptions",
], function(module,BaseModel,ThemeOptions,ChartTypeOptions){
    "use strict";
		 	// Create the Bar Model subclass
	    var ErrorModel = BaseModel.extend({
	    	$type: {
		        id: module.id,

		        // CSS class
		        styleClass:"fusioncharts",

		        // The label may show up in menus
		        label: "Viz3 FusionCharts Error Charts",

		        // The default view to use to render this visualization is
		        defaultView: "./View-Error",

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
		            modes: [{dataType: "number"}],
		            fields: { isRequired: true }
				  },
				  {
            		name: "error",
		            base: "pentaho/visual/role/Property",
		            modes: [{dataType: "number"}],
		            fields: { isRequired: true }
				  },
				  {
					name: "chartType",
					valueType: ChartTypeOptions,
					domain: [
						"errorbar2d","errorline",
					],
					isRequired: true,
					defaultValue: "errorbar2d"
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
	 	return ErrorModel.configure({$type: module.config});
 });

