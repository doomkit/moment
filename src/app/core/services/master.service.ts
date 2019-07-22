import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Master } from '../models/master';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MasterService {

	constructor(private http: HttpClient) { }
	
	getAllMasters(): Observable<Master[]> {
		return this.http.get(`${environment.api.base_url}/masters`) as Observable<Master[]>;
	}

}
