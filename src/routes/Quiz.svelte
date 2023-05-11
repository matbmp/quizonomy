<script lang="ts">
	import QuizQuestion from './QuizQuestion.svelte';

	export const questions: QuestionData[] = [
		{
			question: 'What is your name?',
			answers: ['You', 'Me', 'We', 'Thee'],
			correctAnswer: 1,
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg'
		},
		{
			question: 'What is your name?',
			answers: ['Foo', 'Me', 'We', 'Thee'],
			correctAnswer: 1,
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg'
		}
	];
	let answers: (boolean | undefined)[] = Array(questions.length).fill(undefined);
	let currentQuestion: number = 0;
	let currentAnswer: boolean | undefined = undefined;

	$: if (currentAnswer !== undefined) {
		answers[currentQuestion] = currentAnswer;
        answers = [...answers];
		currentQuestion = currentQuestion + 1;
        currentAnswer = undefined;
	}
</script>

{#if currentQuestion < questions.length}
    <QuizQuestion question={questions[currentQuestion]} bind:userAnswer={currentAnswer} />
{:else}
    Koniec quizu! Wynik: {((answers.reduce((partial, value) => partial + ((value === true) ? 1 : 0), 0) / answers.length)*100).toFixed(0)}%
{/if}

