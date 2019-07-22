import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../auth/auth.service';
import { UserRole } from '../../../../core/enums/user-role';

@Component({
  selector: 'app-user-info',
  template: `
	<div class="user-info">
		<div class="avatar"
			[ngClass]="{
				'avatar_admin': user?.role === 0,
				'avatar_dispatcher': user?.role === 1,
				'avatar_worker': user?.role === 2,
				'avatar_magistrat': user?.role === 3
			}">
		</div>
		<h2>{{ user?.name }}</h2>
		<p>{{ user?.email }} - {{ getUserRole(user?.role) }}</p>
	</div>
  `,
  styleUrls: ['./user-info.component.sass']
})
export class UserInfoComponent implements OnInit {

	user: User;

  constructor(
		private userService: UserService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		let email = this.authService.getUserInfo().email;
		this.userService.getUsers().subscribe(
			(data) => this.user = data.filter((elem) => elem.email === email)[0],
			(err) => console.error(err)
		);
	}

	getUserRole(role) {
		return UserRole[role];
	}

}
