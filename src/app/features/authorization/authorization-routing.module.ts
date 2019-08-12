import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizationComponent } from './authorization.component';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'sign-in',
		pathMatch: 'full'
	},
	{
		path: 'sign-in',
		component: AuthorizationComponent,
		children: [
			{
				path: '',
				component: LoginComponent,
				data: { animation: 'Login' }
			}
		]
	},
	{
		path: 'create-account',
		component: AuthorizationComponent,
		children: [
			{
				path: '',
				component: RegistrationComponent,
				data: { animation: 'Registration' }
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthorizationRoutingModule {}
