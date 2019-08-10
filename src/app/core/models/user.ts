import { UserRole } from '@core/enums/user-role';
import { Settings } from '@core/models';

export interface User {
	id: number;
	name: string;
	role: UserRole;
	email: string;
	password: string;
	settings: Settings;
}
