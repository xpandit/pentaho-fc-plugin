/**
 * 
 * Renders the charts in html page 
 * 
 * @author dduque
 * @date 1,Mar,2011
 */

var chartData=
{
		xmlData:"",
		chartType:"",
		width:500,
		height:500
}

//renders the chart in the html page
function renderChart()
{
	var myChart = new FusionCharts( "../../../content/xfusion/swf/"+chartData.chartType+".swf", "myChartId", chartData.width, chartData.height, "0","1" );

	//set the data
	var fusion_version=(FusionCharts.version == undefined)? [1,0]:FusionCharts.version;
	if(fusion_version[0]>=3 && fusion_version[1]>=2) 
		myChart.setXMLData(chartData.xmlData); 
	else myChart.setDataXML(chartData.xmlData);

	//add the chart
	myChart.render("chartPlaceHolder"); 
     
} 