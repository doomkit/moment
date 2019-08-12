import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { TranslationService } from '@core/services/translation.service';

import { User } from '@core/models/user';
import { environment } from '@env/environment';

@Injectable()
export class UserService {
	constructor(
		private http: HttpClient,
		private cookieService: CookieService,
		private translationService: TranslationService
	) {}

	getAuthorizedUser(): Observable<User> {
		if (!this.checkSession()) {
			return of(undefined);
		}
		let userID = this.cookieService.get(environment.session.userId);
		return this.http.get<User>(`${environment.api.base_url}/users/${userID}`);
	}

	private getUsers(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.api.base_url}/users`);
	}

	updateUser(user: User): Observable<User> {
		this.updateSessionVaribles(user);
		return this.http.put<User>(
			`${environment.api.base_url}/users/${user.id}`,
			user
		);
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

	logout() {
		this.cookieService.deleteAll();
	}

	checkSession(): boolean {
		// TODO: renew session before expiration
		return this.cookieService.check(environment.session.userId);
	}

	private createSession(user: User): void {
		const now = new Date();
		const minutes = 20;
		const exprires = new Date(now.getTime() + minutes * 60000);
		this.cookieService.set(environment.session.userId, `${user.id}`, exprires);
		this.updateSessionVaribles(user);
	}

	updateSessionVaribles(user: User): void {
		this.cookieService.set(environment.session.lang, user.settings.language);
		this.cookieService.set(
			environment.session.darkMode,
			`${user.settings.darkMode}`
		);
		this.translationService.use(user.settings.language);
	}
}
