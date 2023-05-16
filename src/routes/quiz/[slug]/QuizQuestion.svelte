<script lang="ts">
	import type { QuestionData } from "../../../network/lib/quiz";

	export let userAnswer: boolean | undefined = undefined;
	export let quiz: QuestionData
</script>

<div class="h-1/2 p-6">
	<div class="flex flex-col items-center justify-center h-full p-8">
		{#if quiz.imageUrl !== undefined}
			<div class="min-h-0">
				<img alt="" class="object-cover h-full" src={quiz.imageUrl} />
			</div>
		{/if}
		<p class="text-center text-2xl md:text-3xl lg:text-5xl py-2">
			{quiz.questionText}
		</p>
	</div>
</div>

<div class="h-1/2 flex flex-col justify-evenly mt-auto">
	{#each quiz.answers as answer, i}
		<button
			class="text-start text-2xl p-4 my-2 mx-8 rounded-lg bg-cream hover:bg-amber-200"
			on:click={() => {
				userAnswer = quiz.correctAnswer === i;
			}}>{answer}</button
		>
	{/each}
</div>
