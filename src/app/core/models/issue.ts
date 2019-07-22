import { IssueState } from '../enums/issue-state';

export interface Issue {
	id?: number,
	author: string,
	title: string,
	description: string,
	coordinates: [number, number],
	street: string,
	master: string,
	state: IssueState,
	createdAt: number,
	archived: boolean
}

