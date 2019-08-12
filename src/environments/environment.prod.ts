import { PROCESS } from './process.env';

export const environment = {
	production: true,
	mapbox: {
		accessToken: PROCESS.MAPBOX
	},
	opencage: {
		apiKey: PROCESS.OPENCAGE
	},
	api: {
		base_url: ''
	},
	session: {
		userId: 'userId',
		lang: 'lang',
		darkMode: 'darkMode'
	}
};
