import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Issue } from '@core/models/issue';

@Component({
	selector: 'app-autoreport',
	template: `
		<div class="predefined-issue">
			<span>{{ issue.title }}</span>
			<span>{{ issue.street }}</span>
			<button
				class="btn yellow-btn btn_small"
				(click)="autoReport(issue)"
				[disabled]="generated"
			>
				{{
					generated
						? ('dashboard.reports.generated' | translate)
						: ('dashboard.reports.generate' | translate)
				}}
			</button>
		</div>
	`,
	styleUrls: ['./autoreport.component.sass']
})
export class AutoreportComponent implements OnInit {
	@Input() issue: Issue;
	@Output() generateIssue = new EventEmitter<Issue>();
	@Input() autoIssues: Issue[];

	generated: boolean = false;

	autoReport(issue: Issue) {
		if (!this.generated) {
			this.generated = true;
			this.generateIssue.emit(issue);
		}
	}

	ngOnInit(): void {
		this.autoIssues.forEach(issue => {
			if (this.issue.title === issue.title) {
				this.generated = true;
			}
		});
	}
}
