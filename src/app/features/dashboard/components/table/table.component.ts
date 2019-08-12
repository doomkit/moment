import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '@core/models';
import { IssueState } from '@core/enums/issue-state';
import { ColHeading } from './col-heading';

@Component({
	selector: 'app-table',
	template: `
		<div class="content__header">
			<h2 *ngIf="!hint">{{ title | translate }}</h2>
			<h2 *ngIf="hint" [tooltip]="hint | translate">
				{{ title | translate }} <i class="fas fa-info-circle info-icon"></i>
			</h2>
			<div *ngIf="sort" class="filters">
				<span class="toggle-archive" (click)="onToggleArchive()">
					{{
						showArchived
							? ('dashboard.overview.hide-archive' | translate)
							: ('dashboard.overview.show-archive' | translate)
					}}
				</span>
				<div>
					<app-dropdown
						[text]="'dashboard.overview.sort'"
						[sortingOptions]="sortOptions"
						[selectedOption]="selectedOption"
						(optionChange)="onSortOptionChange($event)"
					>
					</app-dropdown>
				</div>
			</div>
		</div>
		<table>
			<thead>
				<tr>
					<th *ngFor="let heading of headings" scope="col">
						{{ heading.name | translate }}
					</th>
				</tr>
			</thead>
			<tbody>
				<ng-container *ngFor="let issue of _issues">
					<tr
						*ngIf="showArchived === issue.archived"
						(click)="onIssueClick(issue)"
					>
						<ng-container *ngFor="let heading of headings">
							<ng-container [ngSwitch]="heading.property">
								<td *ngSwitchCase="'state'">
									<div
										[ngClass]="{
											state: true,
											state_new: issue.state == 0,
											state_processing: issue.state == 1,
											state_complete: issue.state == 2,
											state_confirmed: issue.state == 3
										}"
									>
										{{ getIssueState(issue.state) }}
									</div>
								</td>
								<td *ngSwitchCase="'createdAt'">
									{{ issue[heading.property] | date }}
								</td>
								<td *ngSwitchDefault>
									{{ issue[heading.property] }}
								</td>
							</ng-container>
						</ng-container>
					</tr>
				</ng-container>
			</tbody>
		</table>
	`,
	styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
	_issues: Issue[];
	showArchived = false;
	selectedOption = 'title';
	sortOptions = [];
	@Input() set issues(issues: Issue[]) {
		this._issues = issues;
		if (this.sort) {
			this._issues = this.sortIssues(this._issues, this.selectedOption);
		}
	}
	@Input() title: string;
	@Input() headings: ColHeading[];
	@Input() sort: boolean = false;
	@Input() hint: string;
	@Output() updateIssue = new EventEmitter<Issue>();

	ngOnInit(): void {
		this.sortOptions = this.headings.map(heading => heading.name);
		this.selectedOption = this.headings[0].name;
	}

	onSortOptionChange(event): void {
		this.selectedOption = event;
		let option = this.headings.find(elem => elem.name === event).property;
		this._issues = this.sortIssues(this._issues, option);
	}

	private sortIssues(issues: Issue[], parameter: string): Issue[] {
		let reversed = parameter === 'createdAt' ? -1 : 1;
		return issues.sort(function(a, b) {
			if (a[parameter] < b[parameter]) {
				return -1 * reversed;
			}
			if (a[parameter] > b[parameter]) {
				return 1 * reversed;
			}
			return 0;
		});
	}

	onToggleArchive(): void {
		this.showArchived = !this.showArchived;
	}

	getIssueState(state: IssueState): string {
		return IssueState[state];
	}

	onIssueClick(issue: Issue): void {
		this.updateIssue.emit(issue);
	}
}
