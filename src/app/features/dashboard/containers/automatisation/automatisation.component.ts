import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IssueService } from '@core/services';
import { Issue } from '@core/models';

@Component({
	selector: 'app-automatisation',
	template: `
		<div class="content">
			<div class="content__header">
				<h2 [tooltip]="'dashboard.reports.tooltip' | translate">
					{{ 'dashboard.reports.title' | translate }}
					<i class="fas fa-info-circle info-icon"></i>
				</h2>
			</div>
			<ng-container *ngFor="let template of templates">
				<app-autoreport
					[issue]="template"
					[autoIssues]="autoIssues"
					(generateIssue)="onGenerateIssue($event)"
				>
				</app-autoreport>
			</ng-container>
		</div>
	`,
	styleUrls: ['./automatisation.component.sass']
})
export class AutomatisationComponent implements OnInit, OnDestroy {
	autoIssues: Issue[] = [];
	templates: Issue[] = [];
	subscriptions: Subscription[] = [];

	constructor(private issueService: IssueService) {}

	ngOnInit(): void {
		let sub1 = this.issueService
			.getAllIssues()
			.subscribe(
				data =>
					(this.autoIssues = data.filter(el => el.title.startsWith('[Auto]'))),
				err => console.error(err),
				() => {}
			);
		let sub2 = this.issueService
			.getAutomaticGeneratedIssues()
			.subscribe(data => (this.templates = data), err => console.error(err));
		this.subscriptions = [...this.subscriptions, sub1, sub2];
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	onGenerateIssue(issue: Issue): void {
		delete issue.id;
		issue.createdAt = +new Date();
		issue.author = ''; // TODO: take author from session
		this.issueService.createIssue(issue).subscribe();
	}
}
