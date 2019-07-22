import { Injectable } from '@angular/core';
import { Location } from '../models/location';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class MapService {

	private API_URL = 'https://api.opencagedata.com/geocode/v1/json';

	constructor(private http: HttpClient) { }

	getAddress(location: Location): Observable<string> {
		let requst_url = `${this.API_URL}?q=${location.lat}+${location.lng}&key=${environment.opencage.apiKey}&language=cz`;
		return this.http.get(requst_url) as Observable<string>;
	}

}
