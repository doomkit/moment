import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';

import {
	TranslationService,
	IssueService,
	MapService,
	UserService,
	MasterService
} from '@core/services';

import { environment } from '@env/environment';

export function setupTranslateFactory(service: TranslationService): Function {
	if (localStorage.getItem('lang')) {
		localStorage.setItem('lang', environment.defaults.language);
	}
	return () => service.use(localStorage.getItem('lang'));
}

@NgModule({
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		HttpClientModule,
		SharedModule
	],
	exports: [BrowserAnimationsModule, HttpClientModule],
	providers: [
		TranslationService,
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [TranslationService],
			multi: true
		},
		IssueService,
		MasterService,
		MapService,
		UserService
	]
})
export class CoreModule {}
