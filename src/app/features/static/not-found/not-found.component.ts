import { Component } from '@angular/core';

@Component({
	selector: 'app-not-found',
	template: `
		<div class="not-found">
			<h1>404</h1>
			<p>{{ 'static.not-found.page' | translate }} 🌚</p>
			<a routerLink="/report" class="btn yellow-btn">
				zpět
			</a>
		</div>
	`,
	styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent {}
