import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import {
	OverviewComponent,
	ProfileComponent,
	TasksComponent,
	StatisticsComponent,
	MapComponent,
	AutomatisationComponent
} from './containers';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: '',
				component: OverviewComponent
			},
			{
				path: 'profile',
				component: ProfileComponent
			},
			{
				path: 'tasks',
				component: TasksComponent
			},
			{
				path: 'statistics',
				component: StatisticsComponent
			},
			{
				path: 'map',
				component: MapComponent
			},
			{
				path: 'automatisation',
				component: AutomatisationComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {}
