import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services';
import { User } from '@core/models';

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
				/>

				<label for="pass">heslo</label>
				<input
					id="pass"
					type="password"
					placeholder="Heslo"
					formControlName="password"
				/>

				<button
					type="submit"
					class="btn yellow-btn"
					[disabled]="!loginForm.valid"
				>
					Přihlásit se
				</button>
				<a routerLink="/authorization/create-account" routerLinkActive="active"
					>Nemáte účet?</a
				>
			</form>

			<div *ngIf="error" class="error">
				Chybně zadané heslo nebo email.
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
				console.log(user);
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
