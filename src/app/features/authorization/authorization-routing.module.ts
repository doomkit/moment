import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizationComponent } from './authorization.component';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
	{
		path: '',
		component: AuthorizationComponent,
		children: [
			{
				path: 'sign-in',
				component: LoginComponent,
				data: { animation: 'Login' }
			},
			{
				path: 'create-account',
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
