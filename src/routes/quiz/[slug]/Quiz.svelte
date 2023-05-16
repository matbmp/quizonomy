<script lang="ts">
	import { onMount } from 'svelte';
	import { submitQuiz } from '../../../network/lib/quiz';
	import type { QuizData } from '../../../network/lib/quiz';
	import { State } from '../enums';
	import QuizQuestion from './QuizQuestion.svelte';

	export let quiz: QuizData;
	export let state: State;
	export let answers: (boolean | undefined)[] = Array(quiz.questions.length).fill(undefined);
	export let correctAnswerCount: number;
	let currentQuestion: number = 0;
	let currentAnswer: boolean | undefined = undefined;
	export let time: number = 0;

	let measuredTime: Date = new Date();
	$: miliseconds = measuredTime.getMilliseconds();
	$: seconds = measuredTime.getSeconds();

	$: answerCount = answers.reduce((partial, value) => partial + (value !== undefined ? 1 : 0), 0);
	$: correctAnswerCount = answers.reduce((partial, value) => partial + (value === true ? 1 : 0), 0);

	$: if (state == State.Started) {
		time = Date.now();
	} else if (state == State.Finished) {
		time = Date.now() - time;
		submitQuiz({ correctCount: correctAnswerCount, timeMilliseconds: time, quizId: quiz.id });
	}

	$: if (currentAnswer !== undefined) {
		answers[currentQuestion] = currentAnswer;
		answers = [...answers];
		currentQuestion = currentQuestion + 1;
		currentAnswer = undefined;
		if (currentQuestion === quiz.questions.length) {
			state = State.Finished;
		}
	}

	onMount(() => {
		const interval = setInterval(() => {
			measuredTime = new Date(Date.now() - time);
		}, 1);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if currentQuestion < quiz.questions.length}
	<div class="h-full flex flex-col  text-2xl">
		<div class="px-6 py-4 flex items-center">
			<div class="grow h-8 rounded-lg bg-cream">
				<div
					class="h-full rounded-lg bg-green-400"
					style:width="{((answerCount + 1) / answers.length) * 100}%"
				/>
			</div>
			<div class='px-2'>{currentQuestion+1}/{quiz.questions.length}</div>
		</div>
		<div class='self-center'>{String(seconds).padStart(3, '0')}:{String(miliseconds).padStart(3, '0')}</div>
		
		<QuizQuestion quiz={quiz.questions[currentQuestion]} bind:userAnswer={currentAnswer} />
	</div>
{/if}

