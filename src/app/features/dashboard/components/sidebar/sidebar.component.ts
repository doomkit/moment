import { Component, Input } from '@angular/core';
import { User } from '@core/models/user';
import { UserRole } from '@core/enums';

@Component({
	selector: 'app-sidebar',
	template: `
		<div class="sidebar">
			<ul class="sidebar-menu">
				<ng-container *ngFor="let item of menuItems">
					<li
						class="sidebar-menu__item"
						[routerLink]="item.link"
						routerLinkActive="sidebar-menu__item_active"
						[routerLinkActiveOptions]="{ exact: true }"
					>
						{{ item.name | translate }}
					</li>
				</ng-container>
			</ul>
			<div
				class="sidebar-profile"
				routerLink="profile"
				routerLinkActive="sidebar-profile_active"
			>
				<div class="sidebar-profile__avatar"></div>
				<div class="sidebar-profile__info">
					<a class="primary-text">{{ user?.name }}</a>
					<span class="secondary-text">{{ getUserRole(user) }}</span>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
	@Input() user: User;

	menuItems = [
		{
			link: '/dashboard',
			name: 'dashboard.sidebar.menu.issues'
		},
		{
			link: 'tasks',
			name: 'dashboard.sidebar.menu.tasks'
		},
		{
			link: 'automatisation',
			name: 'dashboard.sidebar.menu.automatization'
		},
		{
			link: 'statistics',
			name: 'dashboard.sidebar.menu.reports'
		},
		{
			link: 'map',
			name: 'dashboard.sidebar.menu.map'
		}
	];

	getUserRole(user: User) {
		if (user) {
			return UserRole[user.role];
		}
		return '';
	}
}
