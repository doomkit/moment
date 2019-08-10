import {
	Component,
	OnInit,
	AfterViewInit,
	ViewChild,
	ElementRef
} from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MapService } from '../../core/services/map.service';
import { Location } from '../../core/models/location';
import { MapboxComponent } from '../../shared/components/mapbox/mapbox.component';
import { IssueState } from '../../core/enums/issue-state';
import { Issue } from '../../core/models/issue';
import { IssueService } from '../../core/services/issue.service';

@Component({
	selector: 'app-report',
	template: `
		<div class="container">
			<div #report class="report">
				<h1 class="title">Nová závada</h1>

				<form class="form" [formGroup]="form" (submit)="createIssue()">
					<div class="form__row">
						<input formControlName="title" type="text" placeholder="Název" />
					</div>
					<div class="form__row">
						<input
							formControlName="address"
							type="text"
							[(ngModel)]="address"
							placeholder="Adresa"
							[attr.disabled]="true"
						/>
					</div>

					<div class="form__row">
						<textarea
							formControlName="description"
							rows="4"
							placeholder="Popis: potřebný materiál, nápověda pro technika..."
						>
						</textarea>
					</div>

					<div class="map">
						<app-mapbox (markerLocation)="onDragEnd($event)"></app-mapbox>
					</div>

					<div class="buttons">
						<a routerLink="/login">Přihlásit se</a>
						<button
							[disabled]="!form.valid"
							class="btn yellow-btn btn_small"
							type="submit"
						>
							Vytvořit
						</button>
					</div>
				</form>
			</div>

			<div #next class="next"></div>
		</div>
	`,
	styleUrls: ['./report.component.sass']
})
export class ReportComponent implements AfterViewInit {
	@ViewChild(MapboxComponent, { static: true }) mapbox: MapboxComponent;
	@ViewChild('report', { static: true }) report: ElementRef;
	@ViewChild('next', { static: true }) next: ElementRef;

	address: string = '';
	coordinates: Location = {
		lng: 14.411458,
		lat: 50.086608
	};
	creating: boolean = true;

	form = this.fb.group({
		title: new FormControl('', Validators.required),
		address: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required)
	});

	constructor(
		private mapService: MapService,
		private issueService: IssueService,
		private fb: FormBuilder
	) {}

	ngAfterViewInit(): void {
		this.mapbox.addDraggableMarker();
		this.onDragEnd(this.coordinates); // Karlův most
	}

	onDragEnd(location: Location) {
		this.mapService
			.getAddress(location)
			.subscribe(
				(data: any) => (this.address = data.results[0].formatted),
				err => console.error(err),
				() => (this.coordinates = location)
			);
	}

	createIssue() {
		let newIssue: Issue = {
			author: 'Nepřihlášený uživatel',
			title: this.form.value.title,
			description: this.form.value.description,
			coordinates: [this.coordinates.lng, this.coordinates.lat],
			street: this.form.value.address,
			master: '',
			state: IssueState.NEW,
			createdAt: +new Date(),
			archived: false
		};
		this.issueService
			.createIssue(newIssue)
			.subscribe(
				data => alert(`Závada byla uložená s id: ${data.id}.`),
				err => console.error(err),
				() => this.form.reset()
			);
	}
}
