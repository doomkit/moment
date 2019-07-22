import { UserRole } from '../enums/user-role'

export interface User {
	name: string,
	role: UserRole,
	email: string,
	password: string
}
