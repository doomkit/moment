import { Component, OnDestroy } from '@angular/core';
import { IssueService } from '@core/services/issue.service';
import { Issue } from '@core/models/issue';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-overview',
	template: `
		<div class="scrollable-container">
			<div class="content">
				<app-table
					[issues]="issues"
					[title]="'dashboard.overview.title'"
					[headings]="headings"
					[sort]="true"
					[hint]="'dashboard.overview.title-tooltip'"
					(updateIssue)="onIssueUpdate($event)"
				></app-table>
			</div>
		</div>
		<!--
		<app-modal *ngIf="showUpdateIssueModal"
			[innerComponentType]="updateMoadlType"
			[issue]="selectedIssue"
			(afterClose)="onUpdateModalClose($event)">
    </app-modal>
    -->
	`,
	styleUrls: ['./overview.component.sass']
})
export class OverviewComponent implements OnDestroy {
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

	constructor(private issueService: IssueService) {
		let sub = this.issueService
			.getAllIssues()
			.subscribe(
				(issues: Issue[]) => (this.issues = issues),
				err => console.error(err)
			);
		this.subscriptions = [...this.subscriptions, sub];
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	onIssueUpdate(issue: Issue) {
		console.log(issue);
	}

	// openUpdateIssueModal(issue: Issue): void {
	// 	this.selectedIssue = issue;
	// 	this.showUpdateIssueModal = true;
	// 	event.stopPropagation();
	// }

	// onUpdateModalClose(issue: Issue): void {
	// 	this.showUpdateIssueModal = false;
	// 	this.selectedIssue = null;
	// 	if (issue) {
	// 		this.issueService
	// 			.updateIssue(issue)
	// 			.subscribe(
	// 				data => {},
	// 				err => console.error(err),
	// 				() => this.loadIssues()
	// 			);
	// 	}
	// }
}
