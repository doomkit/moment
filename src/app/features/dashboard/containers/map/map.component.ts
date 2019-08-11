import {
	Component,
	ViewChild,
	ChangeDetectorRef,
	AfterViewInit
} from '@angular/core';

import { IssueService } from '@core/services';
import { MapboxComponent } from '@shared/components/mapbox/mapbox.component';
import { Issue } from '@core/models';
import { IssueState } from '@core/enums/issue-state';

@Component({
	selector: 'app-map',
	template: `
		<div class="scrollable-container">
			<div class="content">
				<div class="content__header">
					<h2>
						{{ 'dashboard.map.active-issues' | translate }}: {{ counter }}
					</h2>
				</div>
				<app-mapbox></app-mapbox>
			</div>
		</div>
	`,
	styleUrls: ['./map.component.sass']
})
export class MapComponent implements AfterViewInit {
	@ViewChild(MapboxComponent, { static: true }) mapbox: MapboxComponent;
	counter: number;

	constructor(
		private issueService: IssueService,
		private cdr: ChangeDetectorRef
	) {}

	ngAfterViewInit(): void {
		this.issueService.getAllIssues().subscribe(
			(allIssues: Issue[]) => {
				if (!allIssues) {
					return;
				}
				const issuesOnMap = allIssues.filter(issue => {
					return (
						!issue.archived &&
						IssueState[issue.state] !== IssueState[IssueState.CONFIRMED] &&
						IssueState[issue.state] !== IssueState[IssueState.COMPLETE]
					);
				});
				this.mapbox.addMarkers(issuesOnMap);
				this.counter = issuesOnMap.length;
				this.cdr.detectChanges();
			},
			err => console.error(err)
		);
	}
}
