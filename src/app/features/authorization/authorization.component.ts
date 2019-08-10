import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-authorization',
	template: `
		<router-outlet></router-outlet>
	`,
	styleUrls: ['./authorization.component.sass']
})
export class AuthorizationComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
