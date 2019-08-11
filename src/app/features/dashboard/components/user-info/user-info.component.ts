import { Component, Input } from '@angular/core';
import { User } from '@core/models/user';
import { UserRole } from '@core/enums/user-role';

@Component({
	selector: 'app-user-info',
	template: `
		<div class="user-info">
			<div class="avatar avatar_admin"></div>
			<h2>{{ user?.name }}</h2>
			<p>{{ user?.email }} - {{ getUserRole(user?.role) }}</p>
		</div>
	`,
	styleUrls: ['./user-info.component.sass']
})
export class UserInfoComponent {
	@Input() user: User;

	getUserRole(role) {
		return UserRole[role];
	}
}
