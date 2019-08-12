import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './router-animation';

@Component({
	selector: 'app-root',
	animations: [slideInAnimation],
	template: `
		<main [@routeAnimations]="prepareRoute(outlet)">
			<router-outlet #outlet="outlet"></router-outlet>
		</main>
	`,
	styles: []
})
export class AppComponent {
	prepareRoute(outlet: RouterOutlet) {
		return (
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData['animation']
		);
	}
}
