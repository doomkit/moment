import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Issue } from '@core/models/issue';
import { DatePipe } from '@angular/common';

const Y_AXES_LENGTH = 14;

@Component({
	selector: 'app-line-chart',
	template: `
		<div class="chart">
			<canvas id="lineCanvas"></canvas>
		</div>
	`,
	styleUrls: ['./line-chart.component.sass']
})
export class LineChartComponent {
	chart = [];

	buildChart(graphData: any) {
		this.chart = new Chart('lineCanvas', {
			type: 'line',
			data: {
				labels: graphData.xAxes,
				datasets: [
					{
						label: 'New issues',
						data: graphData.data,
						backgroundColor: '#f8e71c',
						borderColor: '#e9d700',
						fill: false,
						pointRadius: 10,
						pointHoverRadius: 15,
						showLine: false
					}
				]
			},
			options: {
				responsive: true,
				aspectRatio: 4,
				title: {
					display: true
				},
				legend: {
					display: false
				},
				elements: {
					point: {
						pointStyle: 'rectRounded'
					}
				},
				scales: {
					yAxes: [
						{
							ticks: {
								min: 1,
								stepSize: 1
							}
						}
					]
				}
			}
		});
	}

	getGraphData(issues: Issue[]) {
		let today = new Date();
		let dates: Date[] = [];
		for (let i = 0; i < Y_AXES_LENGTH; i++) {
			dates.unshift(
				new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
			);
		}

		let pipe = new DatePipe('en');
		let formattedDates = [];
		dates.forEach(date => {
			formattedDates.push(pipe.transform(date, 'd.M'));
		});

		let data = [];
		for (let i = 0; i < dates.length; i++) {
			let res = 0;
			issues.forEach(issue => {
				let temp = new Date(issue.createdAt);
				let createdAt = new Date(
					temp.getFullYear(),
					temp.getMonth(),
					temp.getDate()
				);
				if (createdAt.getTime() === dates[i].getTime()) {
					res++;
				}
			});
			data.push(res);
		}
		return { xAxes: formattedDates, data: data };
	}
}
