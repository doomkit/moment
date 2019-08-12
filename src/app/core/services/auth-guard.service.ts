import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '@core/services';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

	canActivate(): boolean {
		if (!this.userService.checkSession()) {
			this.router.navigate(['authorization/sign-in']);
			return false;
		}
		return true;
	}
}
