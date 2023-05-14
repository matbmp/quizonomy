<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import Quiz from './Quiz.svelte';
	import { State } from '../enums';
	import { getQuiz } from '../../../network/lib/quiz';

	let state: State = State.Intro;
	let correctAnswerCount: number;
	export let data;
	let quizPromise = getQuiz(data.slug);
</script>

{#await quizPromise then quiz}
	{#if state === State.Intro}
		<div class="h-full flex flex-col justify-evenly p-4">
			<button
				class="bg-gradient-to-r from-green-400 to-lime-300 hover:from-green-500 hover:to-lime-400 shadow-lg rounded-lg self-center py-4 px-8 text-3xl"
				on:click={() => {
					state = State.Started;
				}}>Start</button
			>
			<div class="h-1/3 overflow-y-auto">
				<Table striped color="green">
					<TableHead>
						<TableHeadCell>user</TableHeadCell>
						<TableHeadCell>correct</TableHeadCell>
						<TableHeadCell>time</TableHeadCell>
						<TableHeadCell>score(CA/s)</TableHeadCell>
					</TableHead>
					<!--
					<TableBody>
						{#each quiz.records as record}
							<TableBodyRow>
								<TableBodyCell>{record.user}</TableBodyCell>
								<TableBodyCell>{record.correctCount}</TableBodyCell>
								
<TableBodyCell>{record.time.getSeconds()}:{record.time.getMilliseconds()}</TableBodyCell>
					<TableBodyCell>{record.correctCount/(record.time.getSeconds()+0.001*record.time.getMilliseconds())}</TableBodyCell>
					
							</TableBodyRow>
						{/each}
					</TableBody>
					-->
				</Table>
			</div>
		</div>
	{:else if state === State.Started && quiz !== undefined}
		<Quiz quiz={quiz} bind:state bind:correctAnswerCount />
	{:else if state === State.Finished}
		<div class="h-full flex flex-col justify-evenly items-center p-4">
			<div class="text-4xl px-8 py-4 bg-slate-300">{quiz?.name}</div>
			<div class="w-fit text-4xl">
				<div class="p-4">Score:</div>

				<div class="bg-amber-500 text-white rounded-lg py-4 px-8 text-center">
					{correctAnswerCount}/{quiz?.questions.length}
				</div>
			</div>
			<a href="/" class="bg-sky-300 hover:bg-amber-400 rounded-lg py-4 px-8">Back to quizzes</a>
		</div>
	{/if}
{/await}
