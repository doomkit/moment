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

import {
	AutoreportComponent,
	BarChartComponent,
	LabelsComponent,
	LineChartComponent,
	PieChartComponent,
	NavbarComponent,
	SidebarComponent,
	UserInfoComponent,
	TableComponent
} from './components';

@NgModule({
	imports: [CommonModule, SharedModule, DashboardRoutingModule],
	declarations: [
		DashboardComponent,
		// Containers
		OverviewComponent,
		ProfileComponent,
		TasksComponent,
		StatisticsComponent,
		MapComponent,
		AutomatisationComponent,
		// Components
		AutoreportComponent,
		BarChartComponent,
		LabelsComponent,
		LineChartComponent,
		PieChartComponent,
		NavbarComponent,
		SidebarComponent,
		UserInfoComponent,
		TableComponent
	]
})
export class DashboardModule {}
