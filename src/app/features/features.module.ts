import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

// Smart containers
import { LoginComponent } from './authorization/login/login.component';
import { NotFoundComponent } from './static/not-found/not-found.component';
import { RegistrationComponent } from './authorization/registration/registration.component';
import { ProfileComponent } from './dashboard/containers/profile/profile.component';
import { ReportComponent } from './report/report.component';

// Dumb Components
import { MapboxComponent } from './dashboard/components/mapbox/mapbox.component';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { OverviewComponent } from './dashboard/containers/overview/overview.component';
import { NavbarComponent } from './dashboard/components/navbar/navbar.component';
import { StatisticsComponent } from './dashboard/containers/statistics/statistics.component';
import { TasksComponent } from './dashboard/containers/tasks/tasks.component';
import { MapComponent } from './dashboard/containers/map/map.component';
import { PieChartComponent } from './dashboard/components/charts/pie-chart/pie-chart.component';
import { ModalComponent } from '../core/modal/modal.component';
import { CreateIssueComponent } from '../core/modal/modal-views/create-issue/create-issue.component';
import { UpdateIssueComponent } from '../core/modal/modal-views/update-issue/update-issue.component';
import { LabelsComponent } from './dashboard/components/charts/labels/labels.component';
import { BarChartComponent } from './dashboard/components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './dashboard/components/charts/line-chart/line-chart.component';
import { UserInfoComponent } from './dashboard/components/user-info/user-info.component';
import { AutomatisationComponent } from './dashboard/containers/automatisation/automatisation.component';
import { AutoreportComponent } from './dashboard/components/autoreport/autoreport.component';
import { WorkerViewComponent } from '../core/modal/modal-views/worker-view/worker-view.component';

// Directives
import { ModalDirective } from '../core/modal/modal.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		SharedModule
	],
	declarations: [
		LoginComponent,
		NotFoundComponent,
		RegistrationComponent,
		MapboxComponent,
		SidebarComponent,
		OverviewComponent,
		NavbarComponent,
		ProfileComponent,
		StatisticsComponent,
		TasksComponent,
		MapComponent,
		PieChartComponent,
		ModalComponent,
		ModalDirective,
		CreateIssueComponent,
		UpdateIssueComponent,
		WorkerViewComponent,
		LabelsComponent,
		BarChartComponent,
		LineChartComponent,
		UserInfoComponent,
		AutomatisationComponent,
		AutoreportComponent,
		ReportComponent
	],
	entryComponents: [
		CreateIssueComponent,
		UpdateIssueComponent,
		WorkerViewComponent
	]
})
export class FeaturesModule {}
