import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import { Issue } from '../../../../core/models/issue';
import { Master } from '../../../../core/models/master';
import { Location } from '../../../../core/models/location';

import { MapboxComponent } from '../../../dashboard/components/mapbox/mapbox.component';

import { MapService } from '../../../../core/services/map.service';
import { MasterService } from '../../../../core/services/master.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IssueState } from '../../../../core/enums/issue-state';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-create-issue',
  template: `
	<div class="new-issue">
		<h2 class="modal__title">Nová závada</h2>
		
		<form class="form" [formGroup]="form">
			<div class="form__col">
				<div class="form__row">
					<span class="input-name">Název</span>
					<input formControlName="title" type="text" placeholder="Název závady">
				</div>
				<div class="form__row">
					<span class="input-name">Adresa</span>
					<input formControlName="address" type="text" [(ngModel)]="address" placeholder="Adresa" [attr.disabled]="true">
				</div>
			</div>

			<div class="form__col">
				<div class="form__row">
					<span class="input-name">Vybrat technika</span>
					<select formControlName="master" aria-placeholder="Master">
						<option value="" disabled selected>technik</option>
						<option *ngFor="let master of masters" [value]="master.name">{{ master.name }}</option>
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
						placeholder="Popis: potřebný materiál, nápověda pro technika...">
					</textarea>
				</div>
			</div>
		</form>

		<div class="map">
			<app-mapbox (markerLocation)="onDragEnd($event)"></app-mapbox>
		</div>

		<div class="buttons">
			<button #close_btn class="btn black-btn btn_small">Zrušit</button>
			<button #create_btn [disabled]="!form.valid" class="btn yellow-btn btn_small">Vytvořit</button>
		</div>
	</div>
  `,
  styleUrls: ['./create-issue.component.sass']
})
export class CreateIssueComponent implements OnInit, AfterViewInit {

	@ViewChild('close_btn') closeButton: ElementRef;
	@ViewChild('create_btn') submitButton: ElementRef;
	@Output('close') close: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild(MapboxComponent) mapbox: MapboxComponent;

	masters: Master[];
	address: string;
	coordinates: Location;

	form = this.fb.group({
		title: new FormControl('', Validators.required), 
		address: new FormControl('', Validators.required), 
		master: new FormControl('', Validators.required), 
		description: new FormControl('', Validators.required)
	})

	constructor(
		private masterService: MasterService,
		private mapService: MapService,
		private fb: FormBuilder,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.masterService.getAllMasters().subscribe(
			(data) => this.masters = data,
			(err) => console.error(err)
		);
	}

	ngAfterViewInit(): void {
		this.mapbox.addDraggableMarker();
		let karluvMost: Location = {
			lng: 14.411458,
			lat: 50.086608
		};
		this.onDragEnd(karluvMost);
	}

	onClose(canceled: boolean): Issue {
		if (!canceled) {
			let userDetails = this.authService.getUserInfo();
			let newIssue: Issue = {
				author: userDetails.name,
				title: this.form.value.title,
				description: this.form.value.description,
				coordinates: [this.coordinates.lng, this.coordinates.lat],
				street: this.form.value.address,
				master: this.form.value.master,
				state: IssueState.NEW,
				createdAt: +(new Date()),
				archived: false
			}
			return newIssue;
		}
		return null;
	}

	onDragEnd(location: Location) {
		this.mapService.getAddress(location).subscribe(
			(data: any) => this.address = data.results[0].formatted,
			(err) => console.error(err),
			() => this.coordinates = location
		)
	}
}
