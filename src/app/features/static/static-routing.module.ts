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
				path: '404',
				component: NotFoundComponent
			},
			{
				path: '**',
				redirectTo: '404',
				pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StaticRoutingModule {}
