import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	template: `
		<div class="login">
			<form (submit)="authorize()" [formGroup]="loginForm">
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

	error: boolean;

	constructor(private router: Router) {}

	authorize(): void {
		// this.authService
		// 	.logIn(this.loginForm.value.email, this.loginForm.value.password)
		// 	.subscribe(
		// 		response => (this.error = !response),
		// 		err => {
		// 			console.error(err);
		// 		},
		// 		() => {
		// 			if (this.authService.isLoggedIn) {
		// 				if (this.authService.checkPermissions() === UserRole.Technik) {
		// 					this.router.navigate(['/dashboard/tasks']);
		// 				} else {
		this.router.navigate(['/dashboard']);
		// 				}
		// 			}
		// 		}
		// 	);
	}
}
