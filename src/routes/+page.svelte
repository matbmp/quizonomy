<script lang="ts">
	import Account from 'virtual:icons/mdi/account';
	import { Input } from 'flowbite-svelte';
	import { getDailyQuiz, getPopularQuiz, getQuizzes } from '../network/lib/quiz';
	import QuizSelect from './quiz/QuizSelect.svelte';
	import { goto } from '$app/navigation';
	import {  appError, session } from '../store';
	import QuizSelectCard from './quiz/QuizSelectCard.svelte';
	import { onMount } from 'svelte';
	import { introspect } from '../network/lib/auth';

	let searchQuery: string = '';
	$: quizzesPromise = getQuizzes({ searchQuery, skip: 0, take: 10 }).catch((e) => {
		$appError = e;
	});
	let bestQuizzesPromise = getPopularQuiz(4);

	onMount(async () => {
		$session.user = await introspect();
	});
</script>

<div class="h-full overflow-y-auto flex flex-col">
	<div class="p-4 flex align-center">
		<Input
			size="lg"
			placeholder="Wyszukaj quiz"
			defaultClass="block w-full disabled:cursor-not-allowed"
			bind:value={searchQuery}
		/>
		<a href="/user" class="mx-4 border-2 rounded-xl">
			<Account class="text-4xl text-white" />
		</a>
	</div>
	{#if searchQuery.length > 0}
		<div class="grow bg-cream rounded-t-2xl py-4 px-2">
			{#await quizzesPromise then quizzes}
				{#if quizzes != undefined}
					<QuizSelect {quizzes} />
				{/if}
			{/await}
		</div>
	{:else}
		{#if $session.user != null}
			<div class="py-4 h-40">
				<button
					disabled={$session.user.dailyCount > 0}
					on:click={async () => {
						let dailyQuizId = await getDailyQuiz();
						if (dailyQuizId != undefined) goto(`quiz/${dailyQuizId}`);
					}}
					class="items-center h-full w-3/4 mx-auto rounded bg-[#F3F9D2] flex flex-col"
				>
					<div class="h-full flex flex-col items-center justify-center">
						<div class="text-4xl">Dzienny quiz</div>
						<div class="text-slate-500 text-normal">
							{#if $session.user.dailyCount > 0}
								dzisiejsze szanse: <span>{$session.user.dailyCount}/3</span>
							{:else}
								koniec szans! Spróbuj jutro!
							{/if}
						</div>
					</div>
				</button>
			</div>
		{/if}

		<div class="flex flex-col grow bg-cream rounded-t-2xl">
			<h1 class="text-4xl py-4 px-8">Popularne quizy</h1>
			<div class="grow whitespace-nowrap overflow-x-auto px-4">
				{#await bestQuizzesPromise then bestQuizzes}
					{#each bestQuizzes as quiz}
						<a href="/quiz/{quiz.id}">
							<QuizSelectCard {quiz} />
						</a>
					{/each}
				{/await}
			</div>
		</div>
		<!-- 
		<div class="text-2xl py-2 h-96">
			<div class="text-center p-4">Ranking</div>
			<div
				class="grid grid-flow-col justify-stretch place-items-center px-2 py-4 border-t-2 border-slate-600"
			>
				<div>Dzień</div>
				<div>Tydzień</div>
				<div>Miesiąc</div>
			</div>
			<table class="table-auto w-full border-2 border-slate-600 bg-slate-400 bg-opacity-25">
				<thead>
					<th>gracz</th>
					<th>punkty</th>
				</thead>
				<tbody>
					<tr>
						<td>matbmp</td>
						<td>42</td>
					</tr>
				</tbody>
			</table>
		</div>
		-->
	{/if}
</div>

<style lang="postcss">
</style>
