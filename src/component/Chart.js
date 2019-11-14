import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// var startTime = 0, endTime = 0;

export default class Chart extends Component {
	// componentDidMount() {
	// 	endTime = new Date();
	// 	document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
	// }
	
	render() {
		var data = [];
		var dataSeries = { type: "line" };
		var dataPoints = [];
    var i = 0;
    this.props.value.forEach(element => {
			dataPoints.push({
				x: ++i,
				y: element
      });
		});
		dataSeries.dataPoints = dataPoints;
		data.push(dataSeries);
		
		const spanStyle = {
			position:'absolute', 
			top: '10px',
			fontSize: '20px', 
			fontWeight: 'bold', 
			backgroundColor: '#d85757',
			padding: '0px 4px',
			color: '#ffffff'
		}
		
		const options = {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: ""
			},
			axisY: {
				includeZero: false
			},
			data: data
		}
		
		startTime = new Date();
				
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			<span id="timeToRender" style={spanStyle}></span>
		</div>
		);
  } 			
}
