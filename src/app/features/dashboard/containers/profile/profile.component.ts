import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models';
import { UserService } from '@core/services';

@Component({
	selector: 'app-profile',
	template: `
		<div class="content">
			<div class="heading">
				<app-user-info [user]="user"></app-user-info>
			</div>
			<app-user-settings></app-user-settings>
			<div class="buttons">
				<button class="btn btn_small danger-btn" (click)="logout()">
					{{ 'shared.actions.logout' | translate }}
				</button>
			</div>
		</div>
	`,
	styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
	user: User;

	constructor(private router: Router, private userService: UserService) {
		let email = 'john.doe@gmail.com'; // TODO: get email from session
		this.userService
			.getUsers()
			.subscribe(
				data => (this.user = data.find(elem => elem.email === email)),
				err => console.error(err)
			);
	}

	logout() {
		this.router.navigate(['authorization/sign-in']);
	}
}
