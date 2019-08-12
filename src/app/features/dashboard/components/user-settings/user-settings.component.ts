import {
	Component,
	Input,
	Output,
	EventEmitter,
	ChangeDetectorRef
} from '@angular/core';
import { Settings, User } from '@core/models';

@Component({
	selector: 'app-user-settings',
	template: `
		<div *ngIf="user" class="settings">
			<div class="settings__row">
				<span>
					{{ 'dashboard.settings.dark-mode' | translate }}
				</span>
				<app-switcher
					[checked]="user.settings.darkMode"
					(onSwitch)="onDarkModeSwitch($event)"
				></app-switcher>
			</div>
			<div class="settings__row">
				<span>
					{{ 'dashboard.settings.language' | translate }}
				</span>
				<div class="options">
					<div
						*ngFor="let language of languages"
						class="options__button btn btn_small"
						[ngClass]="{
							options__button_selected:
								language.short === user.settings.language
						}"
						(click)="onLanguageChange(language.short)"
					>
						{{ 'dashboard.settings.' + language.full | translate }}
					</div>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent {
	languages = [
		{
			full: 'english',
			short: 'en'
		},
		{
			full: 'czech',
			short: 'cz'
		}
	];
	@Input() user: User;
	@Output() changeSettings = new EventEmitter<Settings>();

	constructor(private cdRef: ChangeDetectorRef) {
		setTimeout(() => this.cdRef.detectChanges(), 1000);
	}

	onDarkModeSwitch(mode: boolean) {
		let settings: Settings = {
			darkMode: mode,
			language: this.user.settings.language
		};
		this.updateSettings(settings);
	}

	onLanguageChange(language: string) {
		let settings: Settings = {
			darkMode: this.user.settings.darkMode,
			language: language
		};
		this.updateSettings(settings);
	}

	private updateSettings(settings: Settings) {
		this.changeSettings.emit(settings);
	}
}
