<script lang="ts">
	interface Props {
		fact: string;
		icon?: string;
	}

	let { fact, icon = '💡' }: Props = $props();
</script>

<div
	class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg shadow-sm hover:shadow-md transition-shadow"
>
	<div class="flex items-start gap-3">
		<span class="text-2xl flex-shrink-0">{icon}</span>
		<p class="text-sm text-gray-800 leading-relaxed">{fact}</p>
	</div>
</div>
