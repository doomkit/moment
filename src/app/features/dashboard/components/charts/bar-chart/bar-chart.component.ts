import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  template: `
	<div class="chart">
		<canvas id="barCanvas"></canvas>
	</div>
  `,
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent {

	chart = [];

	buildChart(labels: string[], data: number[], backgroundColors: string[], borderColors: string[]) {
		this.chart = new Chart('barCanvas', {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					data: data,
					backgroundColor: backgroundColors,
					borderColor: borderColors,
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				aspectRatio: 1.5,
				legend: {
					display: false,
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							stepSize: 1,
							display: false
						}
					}],
					xAxes: [{
						display: false
					}]
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}
		});
	}

}
