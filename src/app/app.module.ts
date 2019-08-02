import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FeaturesModule } from './features/features.module';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FeaturesModule,
		CoreModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
