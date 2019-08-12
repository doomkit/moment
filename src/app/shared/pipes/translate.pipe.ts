import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '@core/services';

@Pipe({
	name: 'translate',
	pure: false
})
export class TranslatePipe implements PipeTransform {
	constructor(private translate: TranslationService) {}

	transform(key: string): string {
		let path = key.split('.');
		let value = path.reduce((o, n) => o[n], this.translate.data);
		return value || key;
	}
}
