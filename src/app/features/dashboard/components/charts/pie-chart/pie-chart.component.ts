import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
	template: `
	<div class="chart">
		<canvas id="pieCanvas"></canvas>
	</div>
  `,
  styleUrls: ['./pie-chart.component.sass']
})
export class PieChartComponent {

	chart = [];

	buildChart(labels: string[], data: number[], backgroundColors: string[], borderColors: string[]) {
		this.chart = new Chart('pieCanvas', {
			type: 'doughnut',
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
				aspectRatio: 1,
				legend: {
					display: false
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}
		});
	}

}
