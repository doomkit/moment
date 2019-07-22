import { Component, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-list',
  template: `
		<div class="dropdown-list"
			(animationend)="animationDone($event)"
			(clickOutside)="close()">
			<div *ngFor="let option of options"
				[ngClass]="{
					'option': true,
					'option_selected': option === currentOption
				}"
				(click)="selectOption(option)">
				{{ option }}
			</div>
		</div>
  `,
  styleUrls: ['./dropdown-list.component.sass']
})
export class DropdownListComponent {

	currentOption: string;

	@Output() afterClose: EventEmitter<string> = new EventEmitter<string>();
	@Output() optionChange: EventEmitter<string> = new EventEmitter<string>();
	@Input() options: string[];
	@Input() set option(val: string ) {
		this.currentOption = val;
	};

	constructor(private host: ElementRef) { }

	get container(): HTMLElement {
    return this.host.nativeElement.querySelector('.dropdown-list') as HTMLElement;
	}
	
	selectOption(option) {
		this.currentOption = option;
		this.close();
	}
	
	close() {
		this.container.style.animation = 'hide 0.2s';
	}

	animationDone(event) {
		if (event.animationName === 'hide') {
      this.afterClose.emit();
    }
	}

}
