import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TooltipDirective } from './directives/tooltip.directive';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Components
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownListComponent } from './components/dropdown/dropdown-list/dropdown-list.component';
import { MapboxComponent } from './components/mapbox/mapbox.component';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [
		DropdownComponent,
		DropdownListComponent,
		ClickOutsideDirective,
		TranslatePipe,
		MapboxComponent,
		TooltipDirective
	],
	exports: [
		DropdownComponent,
		ClickOutsideDirective,
		TranslatePipe,
		FormsModule,
		ReactiveFormsModule,
		MapboxComponent,
		TooltipDirective
	]
})
export class SharedModule {}
