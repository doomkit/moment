// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { PROCESS } from './process.env';

export const environment = {
	production: false,
	mapbox: {
		accessToken: PROCESS.MAPBOX
	},
	opencage: {
		apiKey: PROCESS.OPENCAGE
	},
	api: {
		base_url: 'http://localhost:3000'
	},
	session: {
		userId: 'userId',
		lang: 'lang',
		darkMode: 'darkMode'
	}
};
