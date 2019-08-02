import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueService } from '../../../../core/services/issue.service';
import { Issue } from '../../../../core/models/issue';
import { MapboxComponent } from '../../components/mapbox/mapbox.component';
import { IssueState } from '../../../../core/enums/issue-state';

@Component({
  selector: 'app-map',
  template: `
		<div class="scrollable-container">
			<div class="content">

				<div class="content__header">
					<h2>Neodstranění závady: {{ counter }}</h2>
				</div>
				
				<app-mapbox></app-mapbox>
			</div>
		</div>
  `,
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

	@ViewChild(MapboxComponent, { static: true }) mapbox: MapboxComponent;
	allIssues: Issue[];
	counter: number;

  constructor(private issueService: IssueService) {
		// TODO: subscribe for issue subject
	}

  ngOnInit() {
		this.issueService.getAllIssues().subscribe(
			(data) => this.allIssues = data.filter(
				(elem) => {
					return (
						(!elem.archived) &&
						(IssueState[elem.state] !== IssueState[IssueState.CONFIRMED]) &&
						(IssueState[elem.state] !== IssueState[IssueState.COMPLETE])
					);
				}
			),
			(err) => console.error(err),
			() =>  {
				this.counter = this.allIssues.length;
				this.mapbox.addMarkers(this.allIssues);
			}
		);
  }
}
