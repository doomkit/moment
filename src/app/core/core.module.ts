import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '@shared/shared.module';
import { environment } from '@env/environment';

import {
	TranslationService,
	IssueService,
	MapService,
	UserService,
	MasterService
} from '@core/services';

export function setupTranslateFactory(
	service: TranslationService,
	cookie: CookieService
): Function {
	if (cookie.check(environment.session.lang)) {
		return () => service.use(cookie.get(environment.session.lang));
	}
	return () => service.use('en');
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
		CookieService,
		TranslationService,
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [TranslationService, CookieService],
			multi: true
		},
		IssueService,
		MasterService,
		MapService,
		UserService
	]
})
export class CoreModule {}
