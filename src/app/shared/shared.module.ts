import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Components
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownListComponent } from './components/dropdown/dropdown-list/dropdown-list.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		DropdownComponent,
		DropdownListComponent,
		ClickOutsideDirective,
		TranslatePipe
	],
	exports: [DropdownComponent, ClickOutsideDirective, TranslatePipe]
})
export class SharedModule {}
