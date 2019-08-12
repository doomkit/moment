import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { ModalDirective } from './directives/modal.directive';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Components
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownListComponent } from './components/dropdown/dropdown-list/dropdown-list.component';
import { MapboxComponent } from './components/mapbox/mapbox.component';
import { SwitcherComponent } from './components/switcher/switcher.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
	],
	declarations: [
		DropdownComponent,
		DropdownListComponent,
		ClickOutsideDirective,
		TranslatePipe,
		MapboxComponent,
		TooltipDirective,
		SwitcherComponent,
		ModalDirective
	],
	exports: [
		DropdownComponent,
		ClickOutsideDirective,
		TranslatePipe,
		FormsModule,
		ReactiveFormsModule,
		MapboxComponent,
		TooltipDirective,
		SwitcherComponent,
		ModalDirective
	]
})
export class SharedModule {}
