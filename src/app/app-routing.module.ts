import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { AuthModule } from './auth/auth.module';

import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { OverviewComponent } from './features/dashboard/containers/overview/overview.component';
import { TasksComponent } from './features/dashboard/containers/tasks/tasks.component';
import { StatisticsComponent } from './features/dashboard/containers/statistics/statistics.component';
import { ProfileComponent } from './features/dashboard/containers/profile/profile.component';
import { MapComponent } from './features/dashboard/containers/map/map.component';
import { AutomatisationComponent } from './features/dashboard/containers/automatisation/automatisation.component';
import { ReportComponent } from './features/report/report.component';
import { MasterGuard } from './auth/guards/master.guard';
import { NtMasterGuard } from './auth/guards/nt-master.guard';

const routes: Routes = [
	{ 
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: OverviewComponent,
				canActivate: [NtMasterGuard]
			},
			{
				path: 'profile',
				component: ProfileComponent
			},
			{
				path: 'tasks',
				component: TasksComponent,
				canActivate: [MasterGuard]
			},
			{
				path: 'statistics',
				component: StatisticsComponent,
				canActivate: [AdminGuard]
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
	},
	{ path: 'login', component: LoginComponent, data: { animation: 'Login' } },
	{ path: 'registration', component: RegistrationComponent, data: { animation: 'Registration' } },
	{ path: 'report', component: ReportComponent },
	{ path: '', redirectTo: 'report', pathMatch: 'full' },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
		RouterModule.forRoot(routes),
		AuthModule
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
