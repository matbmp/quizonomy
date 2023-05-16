<script lang="ts">
	import Check from 'virtual:icons/mdi/check';
	import type { QuizData } from '../../network/lib/quiz';
	export let quiz: QuizData
</script>

<div class="rounded-2xl bg-opacity-5 bg-black">
    <div class="grid grid-cols-8 h-full">
        <div
            class="col-span-2 xl:col-span-2 rounded-l-2xl flex items-center justify-center bg-gradient-to-tr from-qorange to-qyellow"
        >
            {#if quiz.imageUrl !== undefined}
                <img src={quiz.imageUrl} alt="" />
            {:else}
                <div></div>
            {/if}
        </div>
        <div class="col-span-5 xl:col-span-6 p-2 px-3 flex flex-col rounded-r-2xl">
            <div class='pt-2'>
                <span class="text-3xl font-semibold">{quiz.name}</span>
            </div>
            <div class="pb-6 text-[#F7B060] text-xl">
                {quiz.author.username}
            </div>
            <div>Ilość pytań: {quiz.questions.length}</div>
            <div class="mb-auto flex text-black/50">
                <div class="italic">
                    <Check class="inline-block" />Ukończono <span class='font-bold'>{quiz.attemptCount ?? '?'}</span> razy 
                </div>
                <div class="ms-auto" >Najlepszy wynik: {quiz.bestAttemptScore.toFixed(2) ?? '?'} PO/s</div>
            </div>
        </div>
    </div>
</div>