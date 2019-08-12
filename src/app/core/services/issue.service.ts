import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Issue } from '@core/models/issue';

import { environment } from '@env/environment';

@Injectable()
export class IssueService {
	private _issuesSubject: BehaviorSubject<Issue[]>;

	constructor(private http: HttpClient) {
		this._issuesSubject = new BehaviorSubject([]);
		// TODO: use websocket to get updates from another users
		this.loadIssues();
	}

	getAllIssues(): Observable<Issue[]> {
		return this._issuesSubject;
	}

	private loadIssues() {
		this.http
			.get(`${environment.api.base_url}/issues`)
			.subscribe(
				(data: Issue[]) => this._issuesSubject.next(data),
				err => console.error(err)
			);
	}

	createIssue(issue: Issue): Observable<Issue> {
		return this.http
			.post<Issue>(`${environment.api.base_url}/issues`, issue)
			.pipe(tap(null, null, () => this.loadIssues()));
	}

	updateIssue(issue: Issue): Observable<Issue> {
		return this.http
			.put<Issue>(`${environment.api.base_url}/issues/${issue.id}`, issue)
			.pipe(tap(null, null, () => this.loadIssues()));
	}

	getAutomaticGeneratedIssues(): Observable<Issue[]> {
		return this.http.get(`${environment.api.base_url}/templates`) as Observable<
			Issue[]
		>;
	}
}
