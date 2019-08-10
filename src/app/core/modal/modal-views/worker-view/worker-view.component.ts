import {
	Component,
	EventEmitter,
	Output,
	ViewChild,
	ElementRef,
	OnInit
} from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Issue, Master, Location } from '@core/models';

import { MapboxComponent } from '@shared/components/mapbox/mapbox.component';

import { MapService, MasterService } from '@core/services';
import { IssueState } from '@core/enums/issue-state';

@Component({
	selector: 'app-worker-view',
	template: `
		<div class="update-issue">
			<h2 class="modal__title">Upravit závadu</h2>

			<form class="form" [formGroup]="form">
				<div class="form__col">
					<div class="form__row">
						<span class="input-name">Název</span>
						<input
							formControlName="title"
							type="text"
							[value]="issue.title"
							placeholder="Název závady"
							[attr.disabled]="true"
						/>
					</div>
					<div class="form__row">
						<span class="input-name">Adresa</span>
						<input
							formControlName="address"
							type="text"
							[(ngModel)]="address"
							placeholder="Adresa"
							[attr.disabled]="true"
						/>
					</div>
				</div>

				<div class="form__col">
					<div class="form__row">
						<span class="input-name">Vybrat technika</span>
						<select
							#master_select
							formControlName="master"
							[attr.disabled]="true"
						>
							<option *ngFor="let master of masters" [value]="master.name">
								{{ master.name }}
							</option>
						</select>
					</div>

					<div class="form__row">
						<span class="input-name">Vybrat stav</span>
						<select #state_select formControlName="state">
							<option *ngFor="let state of states; let i = index" [value]="i">
								{{ state }}
							</option>
						</select>
					</div>
				</div>

				<div class="form__col form__col_fluid">
					<div>
						<p class="input-name">
							Popis
						</p>
						<textarea
							formControlName="description"
							rows="4"
							placeholder="Popis: potřebný materiál, nápověda pro technika..."
							[value]="issue.description"
						>
						</textarea>
					</div>
				</div>
			</form>

			<div class="map">
				<app-mapbox></app-mapbox>
			</div>

			<div class="buttons">
				<div>
					<button #close_btn class="btn black-btn btn_small">Zavřít</button>
					<button
						#update_btn
						[disabled]="!form.valid"
						class="btn yellow-btn btn_small"
					>
						Uložit
					</button>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['./worker-view.component.sass']
})
export class WorkerViewComponent implements OnInit {
	@ViewChild('close_btn', { static: true }) closeButton: ElementRef;
	@ViewChild('update_btn', { static: true }) submitButton: ElementRef;
	@ViewChild('state_select', { static: true }) stateSelect: ElementRef;
	@ViewChild('master_select', { static: true }) masterSelect: ElementRef;
	@Output('close') close: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild(MapboxComponent, { static: true }) mapbox: MapboxComponent;

	masters: Master[];
	states: string[];
	address: string;
	issue: Issue;
	coordinates: Location;
	isArchived: boolean;

	form = this.fb.group(
		{
			title: new FormControl('', Validators.required),
			address: new FormControl('', Validators.required),
			master: new FormControl('', Validators.required),
			description: new FormControl('', Validators.required),
			state: new FormControl('', Validators.required)
		},
		{ updateOn: 'blur' }
	);

	constructor(
		private masterService: MasterService,
		private mapService: MapService,
		private fb: FormBuilder
	) {
		this.states = [];
		this.masters = [];
		this.isArchived = false;
	}

	ngOnInit(): void {
		this.masterService.getAllMasters().subscribe(
			data => (this.masters = data),
			err => console.error(err),
			() => {
				setTimeout(() => {
					let res = this.masters
						.map(master => master.name)
						.indexOf(this.issue.master);
					this.masterSelect.nativeElement.selectedIndex = res;
					this.form.controls['title'].setValue(this.issue.title);
					this.form.controls['master'].setValue(this.issue.master);
					this.form.controls['state'].setValue(this.issue.state);
					this.form.controls['description'].setValue(this.issue.description);
					this.isArchived = this.issue.archived;
				});
			}
		);
		for (var enumMember in IssueState) {
			var isValueProperty = parseInt(enumMember, 10) >= 0;
			if (isValueProperty) {
				this.states.push(IssueState[enumMember]);
			}
		}
	}

	ngAfterViewInit(): void {
		let location: Location = {
			lng: this.issue.coordinates[0],
			lat: this.issue.coordinates[1]
		};
		this.mapService
			.getAddress(location)
			.subscribe(
				(data: any) => (this.address = data.results[0].formatted),
				err => console.error(err),
				() => (this.coordinates = location)
			);
		this.stateSelect.nativeElement.selectedIndex = this.issue.state;
		this.mapbox.addMarker(this.issue);
	}

	archiveIssue() {
		this.isArchived = !this.isArchived;
	}

	onClose(canceled: boolean): Issue {
		if (!canceled) {
			let updatedIssue: Issue = {
				id: this.issue.id,
				author: this.issue.author,
				title: this.form.value.title,
				description: this.form.value.description,
				coordinates: [this.coordinates.lng, this.coordinates.lat],
				street: this.form.value.address,
				master: this.form.value.master,
				state: this.form.value.state,
				createdAt: this.issue.createdAt,
				archived: this.isArchived
			};
			return updatedIssue;
		}
		return null;
	}
}
