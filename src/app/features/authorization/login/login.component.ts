import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, TranslationService } from '@core/services';

@Component({
	selector: 'app-login',
	template: `
		<div class="login">
			<form (submit)="authorize($event)" [formGroup]="loginForm">
				<label for="email">email</label>
				<input
					id="email"
					type="email"
					placeholder="Email"
					formControlName="email"
					[tooltip]="'john.doe@gmail.com'"
				/>

				<label for="pass">password</label>
				<input
					id="pass"
					type="password"
					placeholder="Heslo"
					formControlName="password"
					[tooltip]="'1qaz2wsx'"
				/>

				<button
					type="submit"
					class="btn yellow-btn"
					[disabled]="!loginForm.valid"
				>
					Log in
				</button>
				<a routerLink="/authorization/create-account" routerLinkActive="active">
					Don't have account yet?
				</a>
			</form>

			<div *ngIf="error" class="error">
				Wrong email or password.
			</div>
		</div>
	`,
	styleUrls: ['./login.component.sass']
})
export class LoginComponent {
	loginForm = new FormGroup({
		email: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	});

	error: boolean = false;

	constructor(private router: Router, private userService: UserService) {}

	authorize(event: Event): void {
		event.preventDefault();
		let email = this.loginForm.value.email;
		let password = this.loginForm.value.password;
		this.userService.login(email, password).then(
			user => {
				// TODO: save user in session
				this.router.navigate(['/dashboard']);
			},
			err => {
				this.error = true;
				console.error(err);
			}
		);
	}
}
