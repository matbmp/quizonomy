<script lang="ts">
	import Quiz from './Quiz.svelte';
	import { State } from '../enums';
	import { getQuiz } from '../../../network/lib/quiz';

	let state: State = State.Intro;
	let time: number;
	let correctAnswerCount: number;

	export let data;
	let quizPromise = getQuiz(data.slug);
</script>

<div class="h-full">
	{#await quizPromise then quiz}
		{#if state === State.Intro}
			<div class="h-full flex flex-col justify-evenly p-4">
				<button
					class="bg-cream shadow-lg rounded-lg self-center py-4 px-16 text-5xl"
					on:click={() => {
						state = State.Started;
					}}>Start</button
				>
			</div>
		{:else if state === State.Started && quiz !== undefined}
			<Quiz {quiz} bind:state bind:correctAnswerCount bind:time />
		{:else if state === State.Finished}
			<div class="h-full flex flex-col text-2xl">
				<div class="text-4xl h-1/3 flex justify-center items-center text-center font-bold text-white">{quiz?.name}</div>
				<div class='grow flex flex-col items-center justify-evenly bg-cream rounded-t-2xl p-4'>
					<span class='font-bold text-4xl'>Podsumowanie</span>
					<div class="self-stretch gap-4">
						<div class="summary-item">
							<span class="summary-title">Poprawne odpowiedzi</span>
							{correctAnswerCount} / {quiz.questions.length}
						</div>
						<div class="summary-item">
							<span class="summary-title">Czas</span>
							{time / 1000}s
						</div>
						<div class="summary-item">
							<span class="summary-title">Poprawne/s</span>
							{(correctAnswerCount / (time / 1000)).toFixed(2)}
						</div>
					</div>
					<a href="/" class="rounded-lg py-4 px-8">Powrót</a>
				</div>
			</div>
		{/if}
	{/await}
</div>

<style lang="postcss">
	.summary-item {
		@apply flex justify-between bg-black bg-opacity-10 rounded-2xl p-4 my-4 font-bold;
	}
	.summary-title {
	}
</style>
