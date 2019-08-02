import { Component, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../../../core/models/issue';
import { ModalType } from '../../../../core/enums/modal-type';

@Component({
	selector: 'app-navbar',
	template: `
		<div class="navbar">
			<div class="navbar-content">
				<h1 routerLink="/dashboard">
					{{ 'dashboard.navbar.title' | translate }}
					<span class="accent-text">
						{{ 'dashboard.navbar.city' | translate }}
					</span>
				</h1>
				<button
					class="btn yellow-btn btn_small"
					(click)="openNewIssueModal($event)"
				>
					{{ 'shared.actions.new-issue' | translate }}
					<i class="fas fa-bug"></i>
				</button>
			</div>
		</div>
		<app-modal
			*ngIf="showNewIssueModal"
			[innerComponentType]="createMoadlType"
			(afterClose)="onModalClose($event)"
		>
		</app-modal>
	`,
	styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
	@Output() createIssue: EventEmitter<Issue> = new EventEmitter<Issue>();
	showNewIssueModal: boolean;

	createMoadlType: ModalType;

	constructor() {
		this.showNewIssueModal = false;
		this.createMoadlType = ModalType.CREATE;
	}

	openNewIssueModal(event): void {
		this.showNewIssueModal = true;
		event.stopPropagation();
	}

	onModalClose(event: Issue): void {
		this.showNewIssueModal = false;
		if (event) {
			// If modal was not canceled
			this.createIssue.emit(event);
		}
	}
}
