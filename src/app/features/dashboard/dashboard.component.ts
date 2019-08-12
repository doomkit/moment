import { Component } from '@angular/core';
import { IssueService, UserService } from '@core/services';
import { Issue } from '@core/models/issue';
import { User } from '@core/models';

@Component({
	selector: 'app-dashboard',
	template: `
		<app-navbar (createIssue)="onCreateIssue($event)"> </app-navbar>
		<div class="dashboard">
			<app-sidebar [user]="user"></app-sidebar>
			<div class="dashboard__tab">
				<router-outlet></router-outlet>
			</div>
		</div>
	`,
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
	user: User;

	constructor(
		private issueService: IssueService,
		private userService: UserService
	) {
		this.userService
			.getAuthorizedUser()
			.subscribe(user => (this.user = user), err => console.error(err));
	}

	onCreateIssue(newIssue: Issue) {
		this.issueService
			.createIssue(newIssue)
			.subscribe(null, err => console.error(err));
	}
}
