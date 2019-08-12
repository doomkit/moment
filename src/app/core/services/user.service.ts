import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { User } from '@core/models/user';
import { environment } from '@env/environment';

@Injectable()
export class UserService {
	constructor(private http: HttpClient, private cookieService: CookieService) {}

	private getUsers(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.api.base_url}/users`);
	}

	getUser(id: string): Observable<User> {
		return this.http.get<User>(`${environment.api.base_url}/users/${id}`);
	}

	private createSession(user: User): void {
		const now = new Date();
		const minutes = 10;
		const exprires = new Date(now.getTime() + minutes * 60000);
		this.cookieService.set(environment.session.userId, `${user.id}`, exprires);
	}

	private deleteSession(): void {
		this.cookieService.delete(environment.session.userId);
	}

	login(email: string, password: string): Promise<User> {
		let result = new Promise<User>((resolve, reject) => {
			this.getUsers().subscribe(
				users => {
					// TODO: this should be moved to server
					let usr = users.find(usr => usr.email === email);
					if (usr && usr.password === password) {
						this.createSession(usr);
						resolve(usr);
					} else {
						reject('User not found');
					}
				},
				err => reject(err)
			);
		});
		return result;
	}
}
