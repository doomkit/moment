import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../../core/services/issue.service';
import { Issue } from '../../../../core/models/issue';
import { AuthService } from '../../../../auth/auth.service';

@Component({
	selector: 'app-automatisation',
	template: `
		<div class="content">
			<h2>Automatické vytváření závad</h2>
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
export class AutomatisationComponent implements OnInit {
	autoIssues: Issue[] = [];
	templates: Issue[] = [];

	constructor(private issueService: IssueService) {}

	ngOnInit() {
		this.issueService
			.getAllIssues()
			.subscribe(
				data =>
					(this.autoIssues = data.filter(el => el.title.startsWith('[Auto]'))),
				err => console.error(err),
				() => {}
			);
		this.issueService
			.getAutomaticGeneratedIssues()
			.subscribe(data => (this.templates = data), err => console.error(err));
	}

	onGenerateIssue(issue: Issue) {
		delete issue.id;
		issue.createdAt = +new Date();
		issue.author = '';
		this.issueService
			.createIssue(issue)
			.subscribe(data => {}, err => console.error(err));
	}
}
