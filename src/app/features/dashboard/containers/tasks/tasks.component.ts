import { Component, OnInit, OnDestroy } from '@angular/core';
import { Issue } from '../../../../core/models/issue';
import { ModalType } from '../../../../core/enums/modal-type';
import { Subscription } from 'rxjs/Subscription';
import { IssueService } from '../../../../core/services/issue.service';
import { IssueState } from '../../../../core/enums/issue-state';

@Component({
	selector: 'app-tasks',
	template: `
		<div class="scrollable-container">
			<div class="content">
				<h2>Moje závady</h2>

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
	styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit, OnDestroy {
	allIssues: Issue[];
	sortingOptions: string[];
	selectedOption: string;
	showUpdateIssueModal: boolean = false;
	updateMoadlType: ModalType = ModalType.WORKER;
	selectedIssue: Issue;
	showArchived: boolean;
	issuesSubscription: Subscription;
	userName: string = '';

	constructor(private issueService: IssueService) {
		this.issuesSubscription = this.issueService.getNewIssues().subscribe(
			(issue: Issue) => {
				if (issue) {
					this.allIssues.unshift(issue);
				}
			},
			err => console.error(err)
		);
		this.userName = localStorage.getItem('name');
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

	sortIssues(): void {
		this.allIssues = this.allIssues.sort(function(a, b) {
			if (a['createdAt'] < b['createdAt']) {
				return 1;
			}
			if (a['createdAt'] > b['createdAt']) {
				return -1;
			}
			return 0;
		});
	}

	loadIssues(): void {
		this.issueService.getAllIssues().subscribe(
			data => {
				this.allIssues = data.filter(elem => !elem.archived);
				this.allIssues = this.allIssues.filter(
					elem => elem.master === this.userName
				);
			},
			err => console.error(err),
			() => this.sortIssues()
		);
	}

	toggleArchive(): void {
		this.showArchived = !this.showArchived;
		this.loadIssues();
	}
}
