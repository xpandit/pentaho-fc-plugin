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
	    var DataModel = BaseModel.extend({
	    	$type: {
		        id: module.id,

		        // CSS class
		        styleClass:"fusioncharts",

		        // The label may show up in menus
		        label: "Viz3 FusionMaps",

		        // The default view to use to render this visualization is
		        defaultView: "./view-map",

		        // Properties
		        props: [
		          // General properties
		          {
            		name: "id",
            		base: "pentaho/visual/role/property",
            		modes: [
            			{dataType: "string"},
            			{dataType: "date"}
            		],
            		fields: {isRequired: true}
          		  },
          		  {
            		name: "value",
		            base: "pentaho/visual/role/property",
		            modes: [{dataType: "number"}],
		            fields: { isRequired: true }
				  },
				  {
					name: "chartType",
					valueType: ChartTypeOptions,
					domain: [
					"maps/world", "maps/usa"],
					isRequired: true,
					defaultValue: "maps/world"
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
	 	return DataModel;
	}]
});