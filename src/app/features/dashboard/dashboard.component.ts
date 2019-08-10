import { Component } from '@angular/core';
import { IssueService } from '../../core/services/issue.service';
import { Issue } from '../../core/models/issue';

@Component({
	selector: 'app-dashboard',
	template: `
		<app-navbar (createIssue)="onCreateIssue($event)"> </app-navbar>

		<div class="dashboard">
			<app-sidebar></app-sidebar>
			<div class="dashboard__tab">
				<router-outlet></router-outlet>
			</div>
		</div>

		<div class="version">{{ currentVersion }}</div>
	`,
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
	currentVersion = 'Alpha-Version 0.0.2';

	constructor(private issueService: IssueService) {}

	onCreateIssue(newIssue: Issue) {
		this.issueService
			.createIssue(newIssue)
			.subscribe(data => {}, err => console.error(err));
	}
}
