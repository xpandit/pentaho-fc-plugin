/*
* XPCharts Types
*/
var XPCharts ={
  column2d                : "data",  // Single Series Charts
  column3d                : "data",  // Single Series Charts
  line                    : "data",  // Single Series Charts
  area2d                  : "data",  // Single Series Charts
  bar2d                   : "data",  // Single Series Charts
  bar3d                   : "data",  // Single Series Charts
  pie2d                   : "data",  // Single Series Charts
  pie3d                   : "data",  // Single Series Charts
  doughnut2d              : "data",  // Single Series Charts
  doughnut3d              : "data",  // Single Series Charts
  pareto2d                : "data",  // Single Series Charts
  pareto3d                : "data",  // Single Series Charts
  funnel                  : "data",  // Others (Widgets)
  pyramid                 : "data",  // Others (Widgets)
  spline                  : "data",  // Spline Charts
  splinearea              : "data",  // Spline Charts
  waterfall2d             : "data",  // Miscellaneous Power Charts
  kagi                    : "data",  // Miscellaneous Power Charts
  scrollcolumn2d          : "dataSet",  // Scroll Charts
  scrollline2d            : "dataSet",  // Scroll Charts
  scrollarea2d            : "dataSet",  // Scroll Charts
  sparkline               : "dataSet",  // Spark charts
  sparkcolumn             : "dataSet",  // Spark charts
  sparkwinloss            : "dataSet",  // Spark charts
  mscolumn2d              : "series",  // Multi Series Charts
  mscolumn3d              : "series",  // Multi Series Charts
  msline                  : "series",  // Multi Series Charts
  msbar2d                 : "series",  // Multi Series Charts
  msbar3d                 : "series",  // Multi Series Charts
  msarea                  : "series",  // Multi Series Charts
  marimekko               : "series",  // Multi Series Charts
  zoomline                : "series",  // Multi Series Charts
  zoomlinedy              : "series",  // Multi Series Charts
  stackedcolumn2d         : "series",  // Stacked Charts
  stackedcolumn3d         : "series",  // Stacked Charts
  stackedbar2d            : "series",  // Stacked Charts
  stackedbar3d            : "series",  // Stacked Charts
  stackedarea2d           : "series",  // Stacked Charts
  scatter                 : "series",  // XY Plot Charts
  zoomscatter             : "series",  // XY Plot Charts
  bubble                  : "series",  // XY Plot Charts
  scrollstackedcolumn2d   : "series",  // Scroll Charts
  realtimearea            : "series",  // RealTimeCharts
  realtimecolumn          : "series",  // RealTimeCharts
  realtimeline            : "series",  // RealTimeCharts
  realtimestackedarea     : "series",  // RealTimeCharts
  realtimestackedcolumn   : "series",  // RealTimeCharts
  realtimelinedy          : "series",  // RealTimeCharts
  logmscolumn2d           : "series",  // Logarithmic Charts
  logmsline               : "series",  // Logarithmic Charts
  msspline                : "series",  // Spline Charts
  mssplinearea            : "series",  // Spline Charts
  errorbar2d              : "series",  // Error Charts
  errorline               : "series",  // Error Charts
  errorscatter            : "series",  // Error Charts
  inversemsarea           : "series",  // Inverse Y Axis Chart
  inversemscolumn2d       : "series",  // Inverse Y Axis Chart
  inversemsline           : "series",  // Inverse Y Axis Chart
  selectscatter           : "series",  // Miscellaneous Power Charts
  mscombi2d               : "seriesColumn",  // Combination Charts
  mscombi3d               : "seriesColumn",  // Combination Charts
  mscolumnline3d          : "seriesColumn",  // Combination Charts
  stackedcolumn2dline     : "seriesColumn",  // Combination Charts
  stackedcolumn3dline     : "seriesColumn",  // Combination Charts
  mscombidy2d             : "seriesColumn",  // Combination Charts
  mscolumn3dlinedy        : "seriesColumn",  // Combination Charts
  stackedcolumn3dlinedy   : "seriesColumn",  // Combination Charts
  scrollcombi2d           : "seriesColumn",  // Scroll Charts
  scrollcombidy2d         : "seriesColumn",  // Scroll Charts
  dragcolumn2d            : "seriesColumn",  // Drag-able Charts
  dragline                : "seriesColumn",  // Drag-able Charts
  dragarea                : "seriesColumn",  // Drag-able Charts
  radar                   : "seriesColumn",  // Miscellaneous Power Charts
  msstepline              : "seriesColumn",  // Miscellaneous Power Charts
  msstackedcolumn2d       : "multipleDataSets",  // Stacked Charts
  msstackedcolumn2dlinedy : "multipleDataSets",  // Combination Charts
  dragnode                : "dataSetAndConnectors",  // Miscellaneous Power Charts
  angulargauge            : "dials",  // Gauge
  bulb                    : "value",  // Gauges
  cylinder                : "value",  // Gauges
  hled                    : "value",  // Gauges
  thermometer             : "value",  // Gauges
  vled                    : "value",  // Gauges
  hbullet                 : "value",  // Bullet Graphs
  vbullet                 : "value",  // Bullet Graphs
  hlineargauge            : "pointers",  // Gauges
  gantt                   : "gantt" // Others (Widgets)
}

/*
* XPCharts Types Properties
*/

var XPChartsData = {
  requiredProperties:['value'],
}

var XPChartsDataSet = {
  requiredProperties:['value'],
}

var XPChartsSeries = {
  requiredProperties:[],
}

var XPChartsSeriesColumn = {
  requiredProperties:['value'],
}

var XPChartsMultipleDataSets = {
  requiredProperties:['value'],
}

var XPChartsDataSetAndConnectors = {
  requiredProperties:['x','y','id'],
  requiredConnectorsProperties: ['from','to'],
}

var XPChartsDials = {
  requiredProperties:['value'],
}

var XPChartsValue = {
  requiredProperties:['value'],
}

var XPChartsPointers = {
  requiredProperties:['value'],
}

var XPChartsGantt = {
  requiredTasksProperties:['processid','id','start','end'],
  requiredProcessesProperties:['id','label'],
  requiredDataTableProperties:['label'],
  requiredMilestonesProperties:['taskid','date'],
  requiredConnectorsProperties:['fromtaskid','totaskid'],
}
