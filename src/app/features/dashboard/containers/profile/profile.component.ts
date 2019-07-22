import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
	<div class="content">
		<div class="heading">
			<app-user-info></app-user-info>
			<div class="buttons">
				<button class="btn btn_small danger-btn"
					(click)="logout()">
					Odhlásit se
				</button>
			</div>
		</div>
	</div>
  `,
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {

	constructor(private authService: AuthService, private router: Router) {}

	logout() {
		this.authService.logOut();
		this.router.navigate(['login']);
	}

}
