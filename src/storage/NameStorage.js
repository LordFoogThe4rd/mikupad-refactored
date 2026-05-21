import { AbstractStorage } from './AbstractStorage.js';

export class NameStorage extends AbstractStorage {
	constructor(dbAdapter) {
		super('Names', dbAdapter);
	}
}
