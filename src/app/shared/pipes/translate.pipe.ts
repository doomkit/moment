import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '@core/services';

@Pipe({
	name: 'translate'
})
export class TranslatePipe implements PipeTransform {
	constructor(private translate: TranslationService) {}

	transform(key: any): any {
		return this.translate.data[key] || key;
	}
}
