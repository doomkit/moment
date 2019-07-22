import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';

// Components
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownListComponent } from './components/dropdown/dropdown-list/dropdown-list.component';

@NgModule({
  imports: [
		CommonModule
  ],
  declarations: [
		DropdownComponent,
		DropdownListComponent,
		ClickOutsideDirective
	],
	exports: [
		DropdownComponent,
		ClickOutsideDirective
	]
})
export class SharedModule { }
