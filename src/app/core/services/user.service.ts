import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '@core/models/user';

import { environment } from '@env/environment';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) {}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.api.base_url}/users`);
	}

	getUser(id: string): Observable<User> {
		return this.http.get<User>(`${environment.api.base_url}/users/${id}`);
	}

	login(email: string, password: string) {
		return of(true);
	}

	// private checkUser(email: string, password: string): Observable<boolean> {
	// 	return of(false);
	// }

	// private createSession(userId: string): void {

	// }

	// private resetSession(): void {
	// 	// TODO: save environment.sessionVariables.userId cookie
	// }
}
