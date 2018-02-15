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
            		name: "error",
		            base: "pentaho/visual/role/property",
		            levels: "quantitative",
		            dataType: "number",
		            attributes: { isRequired: true, countMax: 1 }
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
					domain: ["none", "zune", "fint", "carbon", "ocean"],
					isRequired: true,
					defaultValue: "none"
				  }
		        ]
	 		}
	 	});
	 	return ErrorModel;
	}]
});

