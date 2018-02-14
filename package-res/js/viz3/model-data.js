define([
	"module",
	"css!./css/model"
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
		        label: "Viz3 FusionCharts Data Charts",

		        // The default view to use to render this visualization is
		        defaultView: "./view-data",

		        // Properties
		        props: [
		          // General properties
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
					"column2d", "column3d", 
					"line", 
					"bar2d", "bar3d", 
					"area2d",
					"pie2d","pie3d",
					"doughnut2d","doughnut3d",
					"pareto2d","pareto3d",
					"funnel",
					"pyramid",
					"spline",
					"splinearea",
					"waterfall2d",
					"kagi"],
					isRequired: true,
					defaultValue: "column2d"
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
	 	return DataModel;
	}]
});