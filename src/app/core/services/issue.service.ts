import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Issue } from '@core/models/issue';

import { environment } from '@env/environment';

@Injectable()
export class IssueService implements OnDestroy {
	private _issuesSubject: BehaviorSubject<Issue[]>;
	private update: Subscription;

	constructor(private http: HttpClient) {
		this._issuesSubject = new BehaviorSubject([]);
		this.loadIssues();
		// TODO: use websocket instead
		this.update = interval(1000).subscribe(val => {
			this.loadIssues();
		});
	}

	ngOnDestroy(): void {
		this.update.unsubscribe();
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
