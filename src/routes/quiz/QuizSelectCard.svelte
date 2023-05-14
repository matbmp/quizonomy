<script lang="ts">
	import QuestionMark from 'virtual:icons/mdi/help-circle-outline';
	import Check from 'virtual:icons/mdi/check';
	import type { QuizData } from '../../network/lib/quiz';
	export let quiz: QuizData
</script>

<div class="border-2 bg-white bg-opacity-0 hover:bg-opacity-25 border-slate-300 p-2 rounded-2xl shadow-lg">
    <div class="grid grid-cols-8 h-full">
        <div
            class="col-span-3 xl:col-span-2 bg-gradient-to-r from-rose-400 to-violet-400 rounded flex items-center justify-center"
        >
            {#if quiz.imageUrl !== undefined}
                <img src={quiz.imageUrl} alt="" />
            {:else}
                <QuestionMark class="text-8xl text-white" />
            {/if}
        </div>
        <div class="col-span-5 xl:col-span-6 p-3 flex flex-col">
            <div>
                <span class="text-2xl font-semibold">{quiz.name}</span>
            </div>
            <div class="text-slate-500 text-xl">
                {quiz.author}
            </div>
            <div class="mb-auto flex">
                <div class="italic">
                    <Check class="inline-block" />done <span class='font-bold'>{quiz.timesFinished}</span> times 
                </div>
                <div class="ms-auto" >Best score: {quiz.bestCorrectToTimeRatio} CA/s</div>
            </div>
        </div>
    </div>
</div>