import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { StaticRoutingModule } from './static-routing.module';

import { StaticComponent } from './static.component';

import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	imports: [CommonModule, SharedModule, StaticRoutingModule],
	declarations: [StaticComponent, NotFoundComponent]
})
export class StaticModule {}
