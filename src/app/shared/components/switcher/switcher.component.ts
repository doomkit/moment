import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-switcher',
	template: `
		<input
			type="checkbox"
			[(ngModel)]="checked"
			(change)="onToggle()"
			id="cbx"
			style="display:none"
		/>
		<label for="cbx" class="toggle">
			<span>
				<svg width="10px" height="10px" viewBox="0 0 10 10">
					<path
						d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"
					></path>
				</svg>
			</span>
		</label>
	`,
	styleUrls: ['./switcher.component.sass']
})
export class SwitcherComponent {
	@Input() checked: boolean;
	@Output() onSwitch = new EventEmitter<boolean>();

	onToggle() {
		this.onSwitch.emit(this.checked);
	}
}
