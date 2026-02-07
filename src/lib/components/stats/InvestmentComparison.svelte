<script lang="ts">
	import { formatCurrency } from '$lib/services/investment-calculator';

	interface Props {
		totalSpent: number;
		expectedReturn: number;
		comparisonValue?: number;
	}

	let { totalSpent, expectedReturn, comparisonValue }: Props = $props();

	const netLoss = totalSpent - expectedReturn;
	const difference = comparisonValue ? comparisonValue + netLoss : 0;
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden">
	<table class="w-full">
		<thead class="bg-gray-100">
			<tr>
				<th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Catégorie</th>
				<th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Montant</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200">
			<tr class="hover:bg-gray-50">
				<td class="px-6 py-4 text-sm text-gray-900">Dépensé au loto</td>
				<td class="px-6 py-4 text-sm text-right font-semibold text-danger-600">
					{formatCurrency(totalSpent)}
				</td>
			</tr>
			<tr class="hover:bg-gray-50">
				<td class="px-6 py-4 text-sm text-gray-900">Gain espéré (loto)</td>
				<td class="px-6 py-4 text-sm text-right font-semibold text-gray-600">
					{formatCurrency(expectedReturn)}
				</td>
			</tr>
			<tr class="hover:bg-gray-50 bg-danger-50">
				<td class="px-6 py-4 text-sm font-semibold text-gray-900">Perte nette (loto)</td>
				<td class="px-6 py-4 text-sm text-right font-bold text-danger-700">
					-{formatCurrency(netLoss)}
				</td>
			</tr>
			{#if comparisonValue}
				<tr class="hover:bg-gray-50 bg-success-50">
					<td class="px-6 py-4 text-sm font-semibold text-gray-900">Valeur si investi</td>
					<td class="px-6 py-4 text-sm text-right font-bold text-success-700">
						{formatCurrency(comparisonValue)}
					</td>
				</tr>
				<tr class="bg-primary-100 hover:bg-primary-200">
					<td class="px-6 py-4 text-base font-bold text-gray-900">Différence totale</td>
					<td class="px-6 py-4 text-base text-right font-bold text-primary-700">
						{formatCurrency(difference)}
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
