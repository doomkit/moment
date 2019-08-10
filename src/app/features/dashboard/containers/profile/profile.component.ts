import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	template: `
		<div class="content">
			<div class="heading">
				<app-user-info></app-user-info>
				<div class="buttons">
					<button class="btn btn_small danger-btn" (click)="logout()">
						Odhlásit se
					</button>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
	constructor(private router: Router) {}

	logout() {
		this.router.navigate(['login']);
	}
}
