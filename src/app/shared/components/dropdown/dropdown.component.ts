import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';

@Component({
  selector: 'app-dropdown',
	template: `
	<div class="dropdown" (click)="showDropdown($event)">
		<span>{{ text }}</span>
		<svg class="svg-icon dropdown-icon" viewBox="0 0 20 20">
			<path fill="none" d="M14.989,9.491L6.071,0.537C5.78,0.246,5.308,0.244,5.017,0.535c-0.294,0.29-0.294,0.763-0.003,1.054l8.394,8.428L5.014,18.41c-0.291,0.291-0.291,0.763,0,1.054c0.146,0.146,0.335,0.218,0.527,0.218c0.19,0,0.382-0.073,0.527-0.218l8.918-8.919C15.277,10.254,15.277,9.784,14.989,9.491z"></path>
		</svg>
		
		<app-dropdown-list
			*ngIf="opened"
			[options]="sortingOptions"
			[option]="selectedOption"
			(afterClose)="hideDropdown($event)">
		</app-dropdown-list>
	</div>
  `,
  styleUrls: ['./dropdown.component.sass']
})
export class DropdownComponent {

	@ViewChild(DropdownListComponent, { static: false }) dropdownList: DropdownListComponent;
	@Output() optionChange: EventEmitter<string> = new EventEmitter<string>();
	@Input() text: string;
	@Input() sortingOptions: string[];
	@Input() selectedOption: string;
	opened: boolean;

	constructor() {
		this.opened = false;
	}

	showDropdown(event) {
		if (!this.opened) {
			event.stopPropagation();
		}
		this.opened = true;
	}

	hideDropdown(event) {
		this.opened = false;
		let newOption = this.dropdownList.currentOption;
		if (newOption !== this.selectedOption) {
			this.optionChange.emit(newOption);
		}
	}
}
