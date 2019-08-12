import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AuthorizationRoutingModule } from './authorization-routing.module';

import { AuthorizationComponent } from './authorization.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
	imports: [CommonModule, AuthorizationRoutingModule, SharedModule],
	declarations: [AuthorizationComponent, LoginComponent, RegistrationComponent]
})
export class AuthorizationModule {}
