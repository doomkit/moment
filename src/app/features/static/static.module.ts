import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module';

import { StaticComponent } from './static.component';

@NgModule({
	imports: [CommonModule, StaticRoutingModule],
	declarations: [StaticComponent]
})
export class StaticModule {}
