<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import { noUser, user } from '../../store';
	import { introspect, login, logout } from '../../network/lib/auth';

	let username: string;
	let password: string;
</script>

<div class="h-full flex flex-col justify-center px-8 text-4xl">
	{#if $user.username != ''}
		{$user.username}
        <button on:click={() => {
            logout();
            introspect().then((data) => ($user = data)).catch(() => $user = noUser);
        }}>Wyloguj</button>
	{:else}
		<div class="">
			<label for="username" class="">Nazwa użytkownika</label>
			<Input type="text" id="first_name" class="my-6" required bind:value={username} />
		</div>
		<div class="">
			<label for="password" class="mb-2">Hasło</label>
			<Input type="password" id="password" class="my-6" required bind:value={password} />
		</div>
		<button
			on:click={() => {
				login({ username, password });
				introspect().then((data) => ($user = data));
			}}>Zaloguj</button
		>
	{/if}
</div>
