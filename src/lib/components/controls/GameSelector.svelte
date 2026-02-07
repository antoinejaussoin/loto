<script lang="ts">
	import { gameList } from '$lib/data/games.data';
	import { formatCurrency } from '$lib/services/investment-calculator';

	interface Props {
		selectedGameId: string;
		onSelect: (gameId: string) => void;
	}

	let { selectedGameId, onSelect }: Props = $props();
</script>

<div class="space-y-4">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		{#each gameList as game}
			<button
				class="relative p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg {selectedGameId === game.id
					? 'border-primary-500 bg-primary-50 shadow-md'
					: 'border-gray-200 bg-white hover:border-gray-300'}"
				onclick={() => onSelect(game.id)}
			>
				<div class="flex flex-col h-full">
					<h3
						class="text-xl font-bold mb-2 {selectedGameId === game.id
							? 'text-primary-700'
							: 'text-gray-900'}"
					>
						{game.name}
					</h3>
					<p class="text-sm text-gray-600 mb-3 flex-grow">{game.description}</p>
					<div class="space-y-1">
						<p class="text-sm font-semibold text-gray-900">
							Prix: <span class="text-primary-600">{formatCurrency(game.ticketPrice)}</span>
						</p>
						<p class="text-xs text-gray-500">
							Jackpot: {formatCurrency(game.averageJackpot)}
						</p>
					</div>
				</div>
				{#if selectedGameId === game.id}
					<div class="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
						<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>
