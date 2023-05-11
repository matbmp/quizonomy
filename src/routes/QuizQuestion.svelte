<script lang="ts">
    export let userAnswer: (boolean | undefined) = undefined;
	
	export let question: QuestionData;
</script>

<div class="bg-slate-300" style:height="100svh">
	<div class="md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white h-full mx-auto">
		<div class="h-1/2 p-6">
			<div class="flex flex-col items-center bg-sky-100 h-full p-8 ">
				{#if question.imageUrl !== undefined}
					<div class='min-h-0'>
						<img alt="" class="object-cover h-full" src={question.imageUrl} />
					</div>
				{/if}
				<p class='text-center text-2xl md:text-3xl lg:text-5xl py-2'>
					{question.question}
				</p>
			</div>
		</div>

		<div class="h-1/2 flex flex-col justify-evenly">
			{#each question.answers as answer, i}
				<button
					class="bg-sky-300 hover:bg-amber-300 text-start text-2xl p-4 my-2 mx-8 rounded-lg shadow-lg"
                    on:click={() => {
                        userAnswer = question.correctAnswer === i;
                    }}
					>{answer}</button
				>
			{/each}
		</div>
	</div>
</div>
