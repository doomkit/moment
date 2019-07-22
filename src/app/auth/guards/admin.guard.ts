import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../auth.service';
import { UserRole } from '../../core/enums/user-role';

@Injectable()
export class AdminGuard implements CanActivate {

	constructor(private authService: AuthService) {}
	
	canActivate() {
		return this.authService.checkPermissions() === UserRole.Administrátor;
	}
}
