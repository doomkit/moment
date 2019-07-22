import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

	constructor(private http: HttpClient) { }
	
	getUsers(): Observable<User[]> {
		return this.http.get(`${environment.api.base_url}/users`) as Observable<User[]>;
	}

}
