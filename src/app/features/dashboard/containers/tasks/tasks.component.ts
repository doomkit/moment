import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IssueService, UserService } from '@core/services';
import { ModalType } from '@core/enums';
import { Issue } from '@core/models';

@Component({
	selector: 'app-tasks',
	template: `
		<div class="scrollable-container">
			<div class="content">
				<app-table
					[issues]="issues"
					[title]="'dashboard.tasks.title'"
					[sort]="false"
					[headings]="headings"
					(updateIssue)="onIssueUpdate($event)"
				></app-table>
			</div>
		</div>
		<app-modal
			*ngIf="showUpdateIssueModal"
			[innerComponentType]="updateMoadlType"
			[issue]="selectedIssue"
			(afterClose)="onUpdateModalClose($event)"
		>
		</app-modal>
	`,
	styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnDestroy {
	headings = [
		{
			name: 'dashboard.table-headings.name',
			property: 'title'
		},
		{
			name: 'dashboard.table-headings.location',
			property: 'street'
		},
		{
			name: 'dashboard.table-headings.created',
			property: 'createdAt'
		},
		{
			name: 'dashboard.table-headings.state',
			property: 'state'
		},
		{
			name: 'dashboard.table-headings.master',
			property: 'master'
		}
	];

	issues: Issue[];
	subscriptions: Subscription[] = [];
	userName: string = '';
	selectedIssue: Issue;
	showUpdateIssueModal = false;
	updateMoadlType = ModalType.UPDATE;

	constructor(
		private issueService: IssueService,
		private userService: UserService
	) {
		const sub = userService.getAuthorizedUser().subscribe(
			user => {
				this.userName = user.name;
				const sub = this.issueService
					.getAllIssues()
					.subscribe(
						(issues: Issue[]) =>
							(this.issues = issues.filter(
								issue => issue.master === this.userName
							)),
						err => console.error(err)
					);
				this.subscriptions = [...this.subscriptions, sub];
			},
			err => console.error(err)
		);
		this.subscriptions = [...this.subscriptions, sub];
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	onIssueUpdate(issue): void {
		this.selectedIssue = issue;
		this.showUpdateIssueModal = true;
		event.stopPropagation();
	}

	onUpdateModalClose(issue: Issue): void {
		this.showUpdateIssueModal = false;
		this.selectedIssue = null;
		if (issue) {
			this.issueService
				.updateIssue(issue)
				.subscribe(null, err => console.error(err));
		}
	}
}
