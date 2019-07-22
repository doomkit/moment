import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from '../models/issue';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

@Injectable()
export class IssueService {
	
	private subject: Subject<Issue>;

	constructor(private http: HttpClient) {
		this.subject = new Subject<Issue>();
	}
	
	getAllIssues(): Observable<Issue[]> {
		return this.http.get(`${environment.api.base_url}/issues`) as Observable<Issue[]>;
	}

	createIssue(issue: Issue): Observable<Issue>{
		let res: Issue;
		return this.http.post<Issue>(`${environment.api.base_url}/issues`, issue).pipe(
				tap(
					el => { res = el },
					(err) => console.error(err),
					() => this.subject.next(res)
				)
			);
	}

	updateIssue(issue: Issue): Observable<Issue>{
		return this.http.put<Issue>(`${environment.api.base_url}/issues/${issue.id}`, issue);
	}

	getNewIssues(): Observable<Issue> {
		return this.subject.asObservable();
	}

	getAutomaticGeneratedIssues(): Observable<Issue[]> {
		return this.http.get(`${environment.api.base_url}/templates`) as Observable<Issue[]>;
	}

}
