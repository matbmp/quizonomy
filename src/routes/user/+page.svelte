<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import { session } from '../../store';
	import { introspect, login, logout } from '../../network/lib/auth';
	import { goto } from '$app/navigation';
	import Emoticon from 'virtual:icons/mdi/emoticon';
	import Account from 'virtual:icons/mdi/account';
	import Lock from 'virtual:icons/mdi/lock';
	import { onMount } from 'svelte';

	let username: string;
	let password: string;
	let loginError: string = '';

	onMount(async () => {
		$session.user = await introspect();
	})
</script>

{#if $session.user != null}
	<div class="h-full flex flex-col">
		<div class="grow rounded-2xl flex flex-col">
			<div
				class="rounded-t-2xl bg-gradient-to-t from-cream to-background border border-cream w-fit mx-auto p-4 mt-8 flex flex-col items-center text-4xl font-bold"
			>
				<Emoticon class="h-80 w-80 m-4 text-slate-800" />
				{$session.user.username}
			</div>

			<div class="grow flex flex-col self-stretch gap-6 p-4 bg-cream rounded-t-2xl">
				<div class='grow flex flex-col justify-center gap-6'>
					<div class="summary-item">
						<span class="summary-title">Dzienne punkty</span>
						{$session.user.dailyQuoins}
					</div>
					<div class="summary-item">
						<span class="summary-title">Tygodniowe punkty</span>
						{$session.user.weeklyQuoins}
					</div>
					<div class="summary-item">
						<span class="summary-title">Miesięczne punkty</span>
						{$session.user.monthlyQuoins}
					</div>
				</div>
				<button
					class="text-white bg-background px-8 py-4 rounded"
					on:click={async () => {
						await logout($session.key);
						$session.user = null;
						$session.key = null;
					}}>Wyloguj się</button
				>
			</div>
		</div>
	</div>
{:else}
	<div class="h-full flex flex-col justify-center gap-4 bg-white px-8">
		<div class="p-4 flex flex-col gap-6">
			<Input
				type="text"
				id="first_name"
				placeholder="Nazwa użytkownika"
				required
				bind:value={username}
			>
				<Account
					slot="left"
					aria-hidden="true"
					class="w-4 h-4"
					fill="currentColor"
					viewBox="0 0 20 20"
				/>
			</Input>
			<Input type="password" id="password" placeholder="Hasło" required bind:value={password}>
				<Lock
					slot="left"
					aria-hidden="true"
					class="w-4 h-4"
					fill="currentColor"
					viewBox="0 0 20 20"
				/>
			</Input>
			<button
				class="bg-amber-400 text-lg text-black py-2 bg-background text-white rounded mt-4"
				on:click={() => {
					login({ username, password })
						.then((data) => {
							$session = data;
							goto('/');
						})
						.catch((e) => {
							loginError = e.response.data;
						});
				}}>Zaloguj się</button
			>
		</div>
		<p class="my-2 text-red-600 dark:text-red-500 text-2xl">
			<span class="font-medium">{loginError}</span>
		</p>
	</div>
{/if}

<style lang="postcss">
	.summary-item {
		@apply flex justify-between bg-black bg-opacity-10 rounded-2xl p-6 font-bold;
	}
</style>
