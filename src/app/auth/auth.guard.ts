import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {}
	
	canActivate() {
		if (!this.authService.isLoggedIn()) {
			this.router.navigate(['/login']);
		}
		return this.authService.isLoggedIn();
	}
}
