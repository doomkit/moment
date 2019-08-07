import { Component } from '@angular/core';

@Component({
	selector: 'app-static',
	template: `
		<div class="static-page">
			<router-outlet></router-outlet>
		</div>
	`,
	styleUrls: ['./static.component.sass']
})
export class StaticComponent {}
