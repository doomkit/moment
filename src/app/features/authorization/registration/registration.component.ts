import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-registration',
	template: `
		<div class="registration">
			<form (submit)="createUser()" [formGroup]="registrationForm">
				<label for="name">name</label>
				<input
					id="name"
					type="text"
					placeholder="Name and Surname"
					formControlName="name"
				/>

				<label for="email">email</label>
				<input
					id="email"
					type="email"
					placeholder="Email"
					formControlName="email"
				/>

				<label for="pass">password</label>
				<input
					id="pass"
					type="password"
					placeholder="password"
					formControlName="password"
				/>

				<button
					type="submit"
					class="btn yellow-btn"
					[disabled]="!registrationForm.valid"
				>
					Register
				</button>

				<a routerLink="/authorization/sign-in" routerLinkActive="active">
					Already registered?
				</a>
			</form>
		</div>
	`,
	styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent {
	registrationForm = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	});

	constructor() {}

	createUser(): void {
		alert('This feature is not implemented in current version.');
	}
}
