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
	    var ErrorModel = BaseModel.extend({
	    	$type: {
		        id: module.id,

		        // CSS class
		        styleClass:"fusioncharts",

		        // The label may show up in menus
		        label: "Viz3 FusionCharts Error Charts",

		        // The default view to use to render this visualization is
		        defaultView: "./view-error",

		        // Properties
		        props: [
				  // General properties
				  {
            		name: "series",
            		base: "pentaho/visual/role/property",
            		modes: [
            			{dataType: "string"},
            			{dataType: "date"}
            		],
            		fields: {isRequired: true}
				  },
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
            		name: "measure",
		            base: "pentaho/visual/role/property",
		            modes: [{dataType: "number"}],
		            fields: { isRequired: true }
				  },
				  {
            		name: "error",
		            base: "pentaho/visual/role/property",
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
	 	return ErrorModel;
	}]
});

