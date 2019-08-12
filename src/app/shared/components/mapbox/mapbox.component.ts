import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '@env/environment';
import { Issue } from '@core/models/issue';

@Component({
	selector: 'app-mapbox',
	template: `
		<div id="map"></div>
	`,
	styleUrls: ['./mapbox.component.sass']
})
export class MapboxComponent implements OnInit {
	@Output() markerLocation = new EventEmitter<Location>();

	map: mapboxgl.Map;

	popupOptions = {
		closeButton: false,
		offset: 25
	};

	constructor() {
		mapboxgl.accessToken = environment.mapbox.accessToken;
	}

	ngOnInit() {
		this.buildMap();
	}

	buildMap() {
		this.map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/light-v9',
			zoom: 10,
			center: [14.411458, 50.086608]
		});
		// Add map controls
		this.map.addControl(new mapboxgl.NavigationControl());
	}

	addMarkers(issues: Issue[]) {
		issues.forEach(elem => {
			const popup = new mapboxgl.Popup(this.popupOptions).setHTML(
				`<h3>${elem.title}</h3><p>${
					elem.description
				}</p><br/><p class="secondary-text">adresa: ${
					elem.street
				}</p><p class="secondary-text">technik: ${elem.master}</p>`
			);
			const marker = new mapboxgl.Marker()
				.setLngLat([elem.coordinates[0], elem.coordinates[1]])
				.setPopup(popup)
				.addTo(this.map);
		});
	}

	addMarker(issues: Issue) {
		const popup = new mapboxgl.Popup(this.popupOptions).setHTML(
			`<h3>${issues.title}</h3><p>${
				issues.description
			}</p><br/><p class="secondary-text">adresa: ${
				issues.street
			}</p><p class="secondary-text">technik: ${issues.master}</p>`
		);
		const marker = new mapboxgl.Marker()
			.setLngLat([issues.coordinates[0], issues.coordinates[1]])
			.setPopup(popup)
			.addTo(this.map);
	}

	addDraggableMarker(location = { lng: 14.411458, lat: 50.086608 }) {
		var marker = new mapboxgl.Marker({ draggable: true })
			.setLngLat([location.lng, location.lat])
			.addTo(this.map);

		marker.on('dragend', () => {
			var lngLat = marker.getLngLat();
			this.markerLocation.emit(lngLat as Location);
		});
	}
}
