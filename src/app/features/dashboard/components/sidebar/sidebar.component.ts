import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../core/models/user';
import { UserRole } from '../../../../core/enums/user-role';

@Component({
  selector: 'app-sidebar',
  template: `
		<div class="sidebar">
			<ul class="sidebar-menu">
				<ng-container *ngFor="let item of menuItems">
					<li *ngIf="item.canActivate"
						class="sidebar-menu__item"
						[routerLink]="item.link"
						routerLinkActive="sidebar-menu__item_active"
						[routerLinkActiveOptions]="{exact: true}">
						{{ item.name }}
					</li>
				</ng-container>
			</ul>
			<div class="sidebar-profile">
				<div class="sidebar-profile__avatar"
					[ngClass]="{
						'sidebar-profile__avatar_admin': user?.role === 0,
						'sidebar-profile__avatar_dispatcher': user?.role === 1,
						'sidebar-profile__avatar_worker': user?.role === 2,
						'sidebar-profile__avatar_magistrat': user?.role === 3
					}">
				</div>
				<div class="sidebar-profile__info">
					<a routerLink="profile" class="primary-text">{{ user?.name }}</a>
					<span class="secondary-text">{{ getUserRole(user?.role) }}</span>
				</div>
			</div>
		</div>
  `,
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

	menuItems = [
		{
			link: '/dashboard',
			name: 'Nahlášené závady',
			canActivate: this.authService.checkPermissions() !== UserRole.Technik
		},
		{
			link: 'tasks',
			name: 'Moje úkoly',
			canActivate: this.authService.checkPermissions() === UserRole.Technik
		},
		{
			link: 'automatisation',
			name: 'Automatizace',
			canActivate: this.authService.checkPermissions() !== UserRole.Technik
		},
		{
			link: 'statistics',
			name: 'Reporty',
			canActivate: this.authService.checkPermissions() === UserRole.Administrátor
		},
		{
			link: 'map',
			name: 'Mapa',
			canActivate: true
		},
	]

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
