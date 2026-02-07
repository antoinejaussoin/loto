<script lang="ts">
	import { investmentList } from '$lib/data/investments.data';

	interface Props {
		selectedInvestmentId?: string;
		onSelect: (investmentId: string | undefined) => void;
	}

	let { selectedInvestmentId, onSelect }: Props = $props();

	const riskBadgeColors = {
		low: 'bg-green-100 text-green-800',
		medium: 'bg-amber-100 text-amber-800',
		high: 'bg-red-100 text-red-800'
	};

	const riskLabels = {
		low: 'Risque faible',
		medium: 'Risque modéré',
		high: 'Risque élevé'
	};
</script>

<div class="space-y-4">
	<label class="text-sm font-semibold text-gray-700">Comparez avec un autre placement :</label>

	<div class="space-y-3">
		<button
			class="w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md {selectedInvestmentId === undefined
				? 'border-gray-400 bg-gray-100'
				: 'border-gray-200 bg-white hover:border-gray-300'}"
			onclick={() => onSelect(undefined)}
		>
			<p class="font-semibold text-gray-900">Aucune comparaison</p>
		</button>

		{#each investmentList as investment}
			<button
				class="w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md {selectedInvestmentId === investment.id
					? 'border-primary-500 bg-primary-50'
					: 'border-gray-200 bg-white hover:border-gray-300'}"
				onclick={() => onSelect(investment.id)}
			>
				<div class="flex items-start justify-between mb-2">
					<div class="flex-grow">
						<h4
							class="font-semibold mb-1 {selectedInvestmentId === investment.id
								? 'text-primary-700'
								: 'text-gray-900'}"
						>
							{investment.name}
						</h4>
						<span class="inline-block px-2 py-1 text-xs font-medium rounded {riskBadgeColors[investment.risk]}">
							{riskLabels[investment.risk]}
						</span>
					</div>
					<div class="text-right ml-4">
						<p class="text-2xl font-bold text-success-600">
							+{(investment.annualReturn * 100).toFixed(1)}%
						</p>
						<p class="text-xs text-gray-500">par an</p>
					</div>
				</div>
				<p class="text-sm text-gray-600">{investment.description}</p>
			</button>
		{/each}
	</div>
</div>
