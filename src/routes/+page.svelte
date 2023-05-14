<script lang="ts">
	import QuestionMark from 'virtual:icons/mdi/help-circle-outline';
	import Account from 'virtual:icons/mdi/account';
	import { Input } from 'flowbite-svelte';
	import { getDailyQuiz, getQuizzes } from '../network/lib/quiz';
	import QuizSelect from './quiz/QuizSelect.svelte';
	import { goto } from '$app/navigation';

	let searchQuery: string = '';
	let quizzesPromise = getQuizzes({ searchQuery, skip: 0, take: 10 });
	$: quizzesPromise = getQuizzes({ searchQuery, skip: 0, take: 10 });
	let bestQuizzes = Array(10);
</script>

<div class="h-full text-white overflow-y-auto">
	<div class="p-4 flex align-center">
		<Input
			size="lg"
			placeholder="Wyszukaj quiz"
			defaultClass="block w-full disabled:cursor-not-allowed bg-opacity-0 text-white"
			bind:value={searchQuery}
		/>
		<a href="/user" class='mx-4 border-2 rounded-xl'>
			<Account class='text-4xl' />
		</a>
	</div>
	{#if searchQuery.length > 0}
		{#await quizzesPromise then quizzes}
			<QuizSelect {quizzes} />
		{/await}
	{:else}
		<div class="py-4 border-b-2 border-slate-600 h-40">
			<button
				on:click={async () => {
					let dailyQuizId = await getDailyQuiz();
					if (dailyQuizId != undefined) goto(`quiz/${dailyQuizId}`);
				}}
				class="items-center h-full w-3/4 mx-auto rounded-xl bg-gradient-to-r from-violet-500 to-violet-700 border-x-2 border-b-4 border-violet-800 flex flex-col"
			>
				<div class="h-full flex flex-col items-center justify-center">
					<div class="text-4xl">Dzienny quiz</div>
					<div class="text-slate-200 text-2xl">dzisiejsze szanse: <span>3/3</span></div>
				</div>
			</button>
		</div>

		<div class="h-96 flex flex-col">
			<h1 class="text-4xl py-4 px-8">Popularne quizy</h1>
			<div class="grow whitespace-nowrap overflow-x-auto">
				{#each bestQuizzes as quiz}
					<a href="/" class="h-full md:w-1/2 w-full p-4 inline-block">
						<div class="h-full flex flex-col rounded-2xl">
							<div
								class="h-1/2 rounded-t-2xl bg-opacity-25 bg-gradient-to-r from-violet-500/50 to-rose-700/50"
							>
								<QuestionMark class="text-8xl text-white object-cover h-full mx-auto" />
								<!--
						<img
						src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"
						alt=""
						class="object-cover h-full mx-auto"
					/>
					-->
							</div>
							<div class="p-4 bg-white bg-opacity-5 grow rounded-b-2xl">
								<h1 class="text-xl lg:text-3xl font-semibold text-ellipsis overflow-hidden">
									Fajny quiz
								</h1>
								<p class="pt-4 text-slate-400 text-ellipsis overflow-hidden">Opisy quizu</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
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
	{/if}
</div>

<style lang="postcss">
</style>
