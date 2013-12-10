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
	var myChart = new FusionCharts( "../content/fusion/swf/"+chartData.chartType+".swf", "myChartId", chartData.width, chartData.height, "0","1" );

	//set the data
	myChart.setDataXML(chartData.xmlData);

	//add the chart
	myChart.render("chartPlaceHolder"); 
     
} 