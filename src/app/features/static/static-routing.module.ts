import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaticComponent } from './static.component';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		component: StaticComponent,
		children: [
			{
				path: '', // TODO: use '404' path
				component: NotFoundComponent
			}
			// TODO: redirect ** to 404 page
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StaticRoutingModule {}
