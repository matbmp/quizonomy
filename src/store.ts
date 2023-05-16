import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { SessionData } from './network/lib/auth';
import { browser } from '$app/environment';

const storedSession = (): SessionData => {
	if (browser) {
		const storageSession = localStorage.getItem('session');
		if (storageSession == null) return { key: null, user: null };
		return JSON.parse(storageSession);
	}
	return { key: null, user: null };
};
export const session: Writable<SessionData> = writable<SessionData>(
	(browser && storedSession()) || { key: null, user: null }
);
if (browser) {
	session.subscribe((value) => {
		localStorage.setItem('session', JSON.stringify(value));
	});
}

export const appError : Writable<string|undefined> = writable(undefined);
