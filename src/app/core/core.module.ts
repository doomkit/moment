import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '@core/services';
import { environment } from '@env/environment';

export function setupTranslateFactory(service: TranslationService): Function {
	if (localStorage.getItem('lang')) {
		localStorage.setItem('lang', environment.defaults.language);
	}
	return () => service.use(localStorage.getItem('lang'));
}

@NgModule({
	imports: [CommonModule],
	declarations: [],
	exports: [],
	providers: [
		TranslationService,
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [TranslationService],
			multi: true
		}
	]
})
export class CoreModule {}
