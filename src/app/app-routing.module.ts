import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '@core/services/auth-guard.service';

const routes: Routes = [
	{
		path: 'dashboard',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./features/dashboard/dashboard.module').then(
				mod => mod.DashboardModule
			)
	},
	{
		path: 'authorization',
		loadChildren: () =>
			import('./features/authorization/authorization.module').then(
				mod => mod.AuthorizationModule
			)
	},
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: '**',
		loadChildren: () =>
			import('./features/static/static.module').then(mod => mod.StaticModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
