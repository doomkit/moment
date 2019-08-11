import { Component, OnInit, ViewChild } from '@angular/core';

import { IssueService } from '@core/services';
import { Issue } from '@core/models';

import {
	PieChartComponent,
	BarChartComponent,
	LineChartComponent
} from '../../components';

@Component({
	selector: 'app-statistics',
	template: `
		<div class="scrollable-container">
			<div class="statistics">
				<h2>{{ 'dashboard.statistics.title' | translate }}</h2>

				<div class="statistics__section">
					<h3>{{ 'dashboard.statistics.state' | translate }}</h3>
					<div class="container">
						<app-pie-chart></app-pie-chart>
						<app-labels [legend]="legends" [archivedIssues]="archivedIssues">
						</app-labels>
						<app-bar-chart></app-bar-chart>
					</div>
				</div>
				<div class="statistics__section">
					<h3>
						{{ 'dashboard.statistics.last-issues' | translate }}:
						<span class="subheading">
							{{ 'dashboard.statistics.interval' | translate }}
						</span>
					</h3>
					<app-line-chart></app-line-chart>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent implements OnInit {
	@ViewChild(PieChartComponent, { static: true }) pieChart: PieChartComponent;
	@ViewChild(BarChartComponent, { static: true }) barChart: BarChartComponent;
	@ViewChild(LineChartComponent, { static: true })
	lineChart: LineChartComponent;
	allIssues: Issue[];
	legends: any[];
	archivedIssues: Issue[];

	constructor(private issueService: IssueService) {}

	ngOnInit() {
		this.issueService.getAllIssues().subscribe(
			data => {
				this.allIssues = data;
				this.buildCharts();
				this.archivedIssues = this.getArchivedIssues(this.allIssues);
			},
			err => console.error(err)
		);
	}

	buildCharts() {
		let stateLabels = ['NEW', 'PROCESSING', 'COMPLETE', 'CONFIRMED'];
		let backgroundColors = [
			'rgba(0, 127, 255, 0.5)',
			'rgba(231, 231, 231, 0.5)',
			'rgba(248, 231, 28, 0.5)',
			'rgba(40, 167, 69, 0.5)'
		];
		let borderColors = [
			'rgb(0, 127, 255)',
			'rgb(231, 231, 231)',
			'rgb(248, 231, 28)',
			'rgb(40, 167, 69)'
		];
		let charData = [0, 0, 0, 0];
		this.allIssues.forEach(issue => {
			charData[issue.state]++;
		});
		for (let i = 0; i < charData.length; i++) {
			if (charData[i] === 0) {
				try {
					stateLabels.splice(i, 1);
					backgroundColors.splice(i, 1);
					borderColors.splice(i, 1);
					charData.splice(i, 1);
					i--;
				} catch (err) {
					console.error('Incorrect inout data for the pie chart!');
				}
			}
		}
		this.pieChart.buildChart(
			stateLabels,
			charData,
			backgroundColors,
			borderColors
		);
		this.barChart.buildChart(
			stateLabels,
			charData,
			backgroundColors,
			borderColors
		);
		this.lineChart.buildChart(this.lineChart.getGraphData(this.allIssues));
		this.legends = this.generateLabels(stateLabels, charData, backgroundColors);
	}

	generateLabels(
		labels: string[],
		data: number[],
		backgroundColors: string[]
	): any[] {
		let res = [];
		for (let i = 0; i < labels.length; i++) {
			res.push({
				label: labels[i],
				value: data[i],
				color: backgroundColors[i]
			});
		}
		return res;
	}

	getArchivedIssues(issues: Issue[]): Issue[] {
		return issues.filter(issue => issue.archived);
	}
}
