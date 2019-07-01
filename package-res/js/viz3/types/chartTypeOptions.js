define([
     "pentaho/module!_",
     "pentaho/type/String"
    ], function(module, PenString) {    
        return PenString.extend({
        $type: {
            mixins: ["enum"],
            domain: [
                //Data Types
                {v: "area2d", f: "Area 2D"},
                {v: "bar2d", f: "Bar 2D"},
                {v: "bar3d", f: "Bar 3D"},
                {v: "column2d", f: "Column 2D"},
                {v: "column3d", f: "Column 3D"},
                {v: "doughnut2d", f: "Doughnut 2D"},
                {v: "doughnut3d", f: "Doughnut 3D"},
                {v: "funnel", f: "Funnel Chart"},
                {v: "kagi", f: "Kagi Chart"},
                {v: "line", f: "Line 2D"},
                {v: "pareto2d", f: "Pareto 2D"},
                {v: "pareto3d", f: "Pareto 3D"},
                {v: "pie2d", f: "Pie 2D"},
                {v: "pie3d", f: "Pie 3D"},
                {v: "pyramid", f: "Pyramid Chart"},
                {v: "spline", f: "Single-Series Spline 2D"},
                {v: "splinearea", f: "Single-Series Spline Area 2D"},
                {v: "waterfall2d", f: "Waterfall / Cascade Chart"},
                // Series Types
                //{v: "bubble", f: "Bubble Chart"},
                {v: "dragarea", f: "Drag-able Area 2D Chart"},
                {v: "dragcolumn2d", f: "Drag-able Column 2D Chart"},
                {v: "dragline", f: "Drag-able Line 2D Chart"},
                {v: "errorbar2d", f: "Error Bar Chart"},
                {v: "errorline", f: "Error Line 2D Chart"},
                //{v: "errorscatter", f: "Error Scatter Chart"}, //Needs new Class
                //Heat Map Chart (to Implement)
                {v: "inversemsarea", f: "Inverse y-Axis Area 2D Chart"},
                {v: "inversemscolumn2d", f: "Inverse y-Axis Column 2D Chart"},
                {v: "inversemsline", f: "Inverse y-Axis Line 2D Chart"},
                {v: "logmscolumn2d", f: "Logarithmic Column 2D Chart"},
                {v: "logmsline", f: "Logarithmic Line 2D Chart"},
                //Multi-axis Line Chart (to Implement)
                //Multi-level Pie Chart (to Implement)
                {v: "marimekko", f: "Marimekko"},
                {v: "mscombi2d", f: "Multi-series 2D Single Y Combination Chart (Column + Line + Area)"}, 
                {v: "mscombidy2d", f: "Multi-series 2D Dual Y Combination Chart (Column + Line + Area)"}, 
                {v: "mscombi3d", f: "Multi-series 3D Single Y Combination Chart (Column + Line + Area)"},
                {v: "msarea", f: "Multi-series Area 2D"},
                {v: "msbar2d", f: "Multi-series Bar 2D"},
                {v: "msbar3d", f: "Multi-series Bar 3D"},
                {v: "mscolumn2d", f: "Multi-series Column 2D"},
                {v: "mscolumn3d", f: "Multi-series Column 3D"},
                //{v: "mscolumn3dlinedy", f: "Multi-series Column 3D + Line - Dual Y Axis"}, // New Model for charts with Line
                //{v: "mscolumnline3d", f: "Multi-series Column 3D + Line - Single Y Axis"}, // New Model for charts with Line
                {v: "msline", f: "Multi-series Line 2D"},
                {v: "msspline", f: "Multi-Series Spline 2D"},
                {v: "mssplinearea", f: "Multi-Series Spline Area 2D"},
                //Multi-series Stacked Column 2D (to Implement)
                //Multi-series Stacked Column 2D + Line Dual Y Axis (to Implement)
                {v: "radar", f: "Radar Chart"},
                //Real-time Charts (to Implement?)
                //Scatter Chart (to Implement)
                {v: "scrollarea2d", f: "Scroll Area 2D"},
                {v: "scrollcolumn2d", f: "Scroll Column 2D"},
                {v: "scrollcombidy2d", f: "Scroll Combination 2D (Dual Y)"}, 
                {v: "scrollcombi2d", f: "Scroll Combination 2D (Single Y)"}, 
                {v: "scrollline2d", f: "Scroll Line 2D"},
                {v: "scrollstackedcolumn2d", f: "Scroll Stacked Column 2D"},
                //{v: "selectscatter", f: "Select-Scatter Chart"}, //Not Working
                {v: "sparkcolumn", f: "Spark Column"},
                {v: "sparkline", f: "Spark Line"},
                //{v: "sparkwinloss", f: "Spark Win/Loss"}, //Not Working
                //{v: "stackedcolumn2dline", f: "Stacked Column2D + Line single Y Axis"}, // New Model for charts with Line
                //{v: "stackedcolumn3dline", f: "Stacked Column3D + Line single Y Axis"}, // New Model for charts with Line
                {v: "stackedarea2d", f: "Stacked Area 2D"},
                {v: "stackedbar2d", f: "Stacked Bar 2D"},
                {v: "stackedbar3d", f: "Stacked Bar 3D"},
                {v: "stackedcolumn2d", f: "Stacked Column 2D"},
                {v: "stackedcolumn3d", f: "Stacked Column 3D"},
                //{v: "stackedcolumn3dlinedy", f: "Stacked Column 3D + Line Dual Y Axis"}, // New Model for charts with Line
                {v: "msstepline", f: "Step Line Charts"},
                {v: "zoomline", f: "Zoom Line"},
                {v: "zoomlinedy", f: "Zoom Line Dual Y-axis"},
                //{v: "zoomscatter", f: "Zoom Scatter Chart"}, // Not Working
                //Maps
                {v: "maps/world", f: "World Map"},
                {v: "maps/usa", f: "USA Map"}
            ]
        }
        }).configure();
});
