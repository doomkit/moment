import { Component, Input } from '@angular/core';
import { Issue } from '../../../../../core/models/issue';

@Component({
  selector: 'app-labels',
  template: `
	<div class="legend">
		<div>
			<div *ngFor="let item of legend" class="legend__item">
				<div class="legend__color" [ngStyle]="{'background': item.color}"></div>
				<span>{{ item.label }} závady: </span>{{ item.value }}
			</div>
		</div>
		<div class="archived">
			<span><i class="fas fa-archive"></i> Archivované závady:</span>
			<span>{{ archivedIssues?.length }}</span>
		</div>
	</div>
  `,
  styleUrls: ['./labels.component.sass']
})
export class LabelsComponent {

	@Input() legend: any;
	@Input() archivedIssues: Issue[];

}
