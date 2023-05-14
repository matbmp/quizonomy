<script lang="ts">
	import { submitQuiz } from '../../../network/lib/quiz';
	import type { QuizData } from '../../../network/lib/quiz';
	import { State } from '../enums';
	import QuizQuestion from './QuizQuestion.svelte';

	export let quiz: QuizData;
	export let state: State;
	export let answers: (boolean | undefined)[] = Array(quiz.questions.length).fill(undefined);
	let answerCount: number;
	export let correctAnswerCount: number;
	let currentQuestion: number = 0;
	let currentAnswer: boolean | undefined = undefined;
	let time: Date;

	$: answerCount = answers.reduce((partial, value) => partial + (value !== undefined ? 1 : 0), 0);
	$: correctAnswerCount = answers.reduce((partial, value) => partial + (value === true ? 1 : 0), 0);

	$: if(state == State.Started){
		time = new Date();
	} else if(state == State.Finished){
		submitQuiz({correctCount: correctAnswerCount, time: time, quizId: quiz.id })
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
</script>

{#if currentQuestion < quiz.questions.length}
	<div class="h-full flex flex-col">
		<div class="px-6 py-4">
			<div class="h-8 rounded-lg bg-green-200">
				<div
					class="h-full rounded-lg bg-green-500"
					style:width="{(answerCount / answers.length) * 100}%"
				/>
			</div>
		</div>
		<div class='min-h-0'>
			<QuizQuestion quiz={quiz.questions[currentQuestion]} bind:userAnswer={currentAnswer} />
		</div>
	</div>
{/if}
