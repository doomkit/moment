import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';

import {
	OverviewComponent,
	ProfileComponent,
	TasksComponent,
	StatisticsComponent,
	MapComponent,
	AutomatisationComponent
} from './containers';

import { CreateIssueComponent } from '../../core/modal/modal-views/create-issue/create-issue.component';
import { UpdateIssueComponent } from '../../core/modal/modal-views/update-issue/update-issue.component';
import { WorkerViewComponent } from '../../core/modal/modal-views/worker-view/worker-view.component';

@NgModule({
	imports: [CommonModule, SharedModule, DashboardRoutingModule],
	declarations: [
		DashboardComponent,
		OverviewComponent,
		ProfileComponent,
		TasksComponent,
		StatisticsComponent,
		MapComponent,
		AutomatisationComponent
	],
	entryComponents: [
		CreateIssueComponent,
		UpdateIssueComponent,
		WorkerViewComponent
	]
})
export class DashboardModule {}
