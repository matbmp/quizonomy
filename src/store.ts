import { writable } from 'svelte/store';
import type {Writable} from 'svelte/store';
import type { UserExtendedData } from './network/lib/auth';

export const noUser = {
    id: 0,
    username: '',
    dailyQuoins: 0,
    weeklyQuoins: 0,
    monthlyQuoins: 0,
    dailyCount:0
}

export const user : Writable<UserExtendedData> = writable<UserExtendedData>(noUser)