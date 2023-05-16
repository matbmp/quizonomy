<script>
	import '../app.postcss';
	import { appError } from '../store';
</script>

{#if $appError == undefined}
	<div class="bg-slate-300" style:height="100svh">
		<div class="md:w-2/3 lg:w-1/2 xl:w-1/3 h-full mx-auto text-black bg-background">
			<slot />
		</div>
	</div>
	{:else}
	Error: {$appError}
{/if}
