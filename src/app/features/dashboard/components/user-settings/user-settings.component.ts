import { Component, OnInit } from '@angular/core';
import { Settings } from '@core/models';

@Component({
	selector: 'app-user-settings',
	template: `
		<div class="settings">
			<div class="settings__row">
				<span>
					{{ 'dashboard.settings.dark-mode' | translate }}
				</span>
				<app-switcher
					[checked]="settings.darkMode"
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
							options__button_selected: language === settings.language
						}"
						(click)="onLanguageChange(language)"
					>
						{{ 'dashboard.settings.' + language | translate }}
					</div>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent implements OnInit {
	languages = ['english', 'czech'];
	settings: Settings;

	constructor() {}

	ngOnInit() {
		this.settings = {
			darkMode: false,
			language: 'english'
		};
	}

	onDarkModeSwitch(value) {
		this.settings.darkMode = value;
	}

	onLanguageChange(language: string) {
		this.settings.language = language;
	}

	private updateSettings() {
		// TODO: save changes
	}
}
