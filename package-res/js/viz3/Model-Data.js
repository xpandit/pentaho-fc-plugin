define([
	"pentaho/module!_",
	"pentaho/visual/Model",
	"./types/themeOptions",
	"./types/chartTypeOptions",
	"css!./css/model"
], function(module,BaseModel,ThemeOptions,ChartTypeOptions){
 	"use strict";
	 	// Create the Bar Model subclass
	    var DataModel = BaseModel.extend({
	    	$type: {
		        id: module.id,

		        // CSS class
		        styleClass:"fusioncharts",

		        // The label may show up in menus
		        label: "Viz3 FusionCharts Data Charts",

		        // The default view to use to render this visualization is
		        defaultView: "./View-Data",

		        // Properties
		        props: [
		          // General properties
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
					name: "chartType",
					valueType: ChartTypeOptions,
					domain: [
					"area2d",
					"bar2d", "bar3d", 
					"column2d", "column3d",
					"doughnut2d","doughnut3d",
					"funnel",
					"kagi",
					"line",
					"pareto2d","pareto3d","pie2d","pie3d","pyramid",
					"spline",
					"splinearea",
					"waterfall2d"],
					isRequired: true,
					defaultValue: "column2d"
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
	 	return DataModel.configure();
});