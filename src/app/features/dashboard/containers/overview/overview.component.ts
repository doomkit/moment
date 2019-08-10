import { Component, OnInit, OnDestroy } from '@angular/core';
import { IssueService } from '../../../../core/services/issue.service';
import { Issue } from '../../../../core/models/issue';
import { IssueState } from '../../../../core/enums/issue-state';
import { ModalType } from '../../../../core/enums/modal-type';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-overview',
	template: `
		<div class="scrollable-container">
			<div class="content">
				<div class="content__header">
					<h2>Nahlášené závady</h2>
					<div class="filters">
						<span class="toggle-archive" (click)="toggleArchive()">
							{{ showArchived ? 'Skrýt' : 'Zobrazit' }} archiv
						</span>
						<div>
							<app-dropdown
								[text]="'Seřadit'"
								[sortingOptions]="sortingOptions"
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
							<th scope="col">Název</th>
							<th scope="col">Lokace</th>
							<th scope="col">Vytvořeno</th>
							<th scope="col">Stav</th>
							<th scope="col">Technik</th>
						</tr>
					</thead>
					<tbody>
						<tr
							*ngFor="let issue of allIssues"
							(click)="openUpdateIssueModal(issue)"
						>
							<td>{{ issue.title }}</td>
							<td>{{ issue.street }}</td>
							<td>{{ issue.createdAt | date }}</td>
							<td>
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
							<td>{{ issue.master }}</td>
						</tr>
					</tbody>
				</table>
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
export class OverviewComponent implements OnInit, OnDestroy {
	allIssues: Issue[];
	sortingOptions: string[];
	selectedOption: string;
	showUpdateIssueModal: boolean;
	updateMoadlType: ModalType;
	selectedIssue: Issue;
	showArchived: boolean;
	issuesSubscription: Subscription;

	constructor(private issueService: IssueService) {
		this.sortingOptions = ['Název', 'Lokace', 'Vytvořeno', 'Stav', 'Technik'];
		this.selectedOption = 'Vytvořeno';
		this.showUpdateIssueModal = false;
		this.updateMoadlType = ModalType.UPDATE;
		this.showArchived = false;
		this.issuesSubscription = this.issueService.getNewIssues().subscribe(
			(issue: Issue) => {
				if (issue) {
					this.allIssues.unshift(issue);
				}
			},
			err => console.error(err)
		);
	}

	ngOnInit() {
		this.loadIssues();
	}

	ngOnDestroy() {
		this.issuesSubscription.unsubscribe();
	}

	openUpdateIssueModal(issue: Issue): void {
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
				.subscribe(
					data => {},
					err => console.error(err),
					() => this.loadIssues()
				);
		}
	}

	getIssueState(state: IssueState) {
		return IssueState[state];
	}

	onSortOptionChange(event) {
		this.selectedOption = event;
		let option = 'createdAt';
		switch (this.selectedOption) {
			case 'Název':
				option = 'title';
				break;
			case 'Lokace':
				option = 'street';
				break;
			case 'Vytvořeno':
				option = 'createdAt';
				break;
			case 'Stav':
				option = 'state';
				break;
			case 'Technik':
				option = 'master';
				break;
		}
		this.sortIssues(option);
	}

	sortIssues(parameter: string): void {
		let reversed = parameter === 'createdAt' ? -1 : 1;
		this.allIssues = this.allIssues.sort(function(a, b) {
			if (a[parameter] < b[parameter]) {
				return -1 * reversed;
			}
			if (a[parameter] > b[parameter]) {
				return 1 * reversed;
			}
			return 0;
		});
	}

	loadIssues(): void {
		this.issueService.getAllIssues().subscribe(
			data => {
				this.allIssues = data.filter(elem =>
					this.showArchived ? elem.archived : !elem.archived
				);
			},
			err => console.error(err),
			() => this.onSortOptionChange(this.selectedOption)
		);
	}

	toggleArchive(): void {
		this.showArchived = !this.showArchived;
		this.loadIssues();
	}
}
