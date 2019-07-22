import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user';

@Injectable()
export class AuthService {

	user = { 
		isAdmin: false,
		role: 4,
		details: {
			name: '',
			email: ''
		}
	};

	allUsers: User[];

	constructor(private userService: UserService) {
		this.userService.getUsers().subscribe(
			(data) => this.allUsers = data,
			(err) => console.error(err)
		)
		this.user.details.email = localStorage.getItem('email');
		this.user.details.name = localStorage.getItem('name');
		this.user.role = +localStorage.getItem('role');
	}

  checkPermissions() {
    return this.user.role;
	}
	
  isLoggedIn() {
		let isLogged = localStorage.getItem('email');
		if (isLogged) {
			return Observable.of(true);
		}
		return Observable.of(false);
	}
	
	logIn(email: string, password: string) {
		let user: User = this.allUsers.filter((usr) => (usr.email === email && usr.password === password))[0];
		if (user) {
			localStorage.setItem('email', user.email);
			localStorage.setItem('name', user.name);
			localStorage.setItem('role', String(user.role));
			this.user.details.email = user.email;
			this.user.details.name = user.name;
			this.user.role = user.role;
			return Observable.of(true);
		}
		return Observable.of(false);
	}

	logOut() {
		localStorage.removeItem('email');
		localStorage.removeItem('name');
		localStorage.removeItem('role');
	}

	getUserInfo() {
		return this.user.details;
	}

}
