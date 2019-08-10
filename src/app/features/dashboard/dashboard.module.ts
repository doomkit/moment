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
	UserInfoComponent
} from './components';

@NgModule({
	imports: [CommonModule, SharedModule, DashboardRoutingModule],
	declarations: [
		DashboardComponent,
		OverviewComponent,
		ProfileComponent,
		TasksComponent,
		StatisticsComponent,
		MapComponent,
		AutomatisationComponent,
		AutoreportComponent,
		BarChartComponent,
		LabelsComponent,
		LineChartComponent,
		PieChartComponent,
		NavbarComponent,
		SidebarComponent,
		UserInfoComponent
	]
})
export class DashboardModule {}
