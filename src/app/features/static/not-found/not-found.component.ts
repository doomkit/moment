import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
		<div class="not-found">
			<h1>4<i class="fas fa-heart-broken"></i>4</h1>
			<p>Stránka nenalezena 🤯</p>
			<a routerLink="/report" class="btn black-btn" >
				zpět
			</a>
		</div>
  `,
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent {

}
