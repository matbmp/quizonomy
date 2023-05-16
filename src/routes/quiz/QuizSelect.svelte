<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import QuizSelectCard from './QuizSelectCard.svelte';
	import type { QuizData } from '../../network/lib/quiz';
	export let quizzes: QuizData[];
</script>

<div class="overflow-y-auto grow flex flex-col gap-4 px-2">
	{#each quizzes as quiz}
		<a href="quiz/{quiz.id}">
			<QuizSelectCard {quiz} />
		</a>
	{/each}
</div>
