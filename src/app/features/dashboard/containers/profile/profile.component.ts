import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User, Settings } from '@core/models';
import { UserService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-profile',
	template: `
		<div class="content">
			<div class="heading">
				<app-user-info [user]="user"></app-user-info>
			</div>
			<app-user-settings
				[user]="user"
				(changeSettings)="onUpdateSettings($event)"
			></app-user-settings>
			<div class="buttons">
				<button class="btn btn_small danger-btn" (click)="logout()">
					{{ 'shared.actions.logout' | translate }}
				</button>
			</div>
		</div>
	`,
	styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnDestroy {
	user: User;
	userSub: Subscription;

	constructor(private router: Router, private userService: UserService) {
		this.userSub = this.userService
			.getAuthorizedUser()
			.subscribe(user => (this.user = user), err => console.error(err));
	}

	ngOnDestroy(): void {
		this.userSub.unsubscribe();
	}

	onUpdateSettings(newSettings: Settings) {
		this.user.settings = newSettings;
		this.userService.updateUser(this.user).subscribe();
	}

	logout() {
		this.userService.logout();
		this.router.navigate(['authorization/sign-in']);
	}
}
