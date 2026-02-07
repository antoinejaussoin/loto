<script lang="ts">
	import { formatCurrency } from '$lib/services/investment-calculator';

	interface Props {
		playsPerWeek: number;
		ticketPrice: number;
		onChange: (value: number) => void;
	}

	let { playsPerWeek, ticketPrice, onChange }: Props = $props();

	const costPerWeek = $derived(playsPerWeek * ticketPrice);
	const costPerYear = $derived(costPerWeek * 52);

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		onChange(Number(target.value));
	}
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<label class="text-sm font-semibold text-gray-700">Combien de fois jouez-vous par semaine ?</label>
		<span class="text-2xl font-bold text-primary-600">{playsPerWeek}</span>
	</div>

	<input
		type="range"
		min="0.5"
		max="20"
		step="0.5"
		value={playsPerWeek}
		oninput={handleInput}
		class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
	/>

	<div class="grid grid-cols-2 gap-4 text-sm">
		<div class="bg-gray-50 p-3 rounded-lg">
			<p class="text-gray-600 mb-1">Coût par semaine</p>
			<p class="text-lg font-bold text-gray-900">{formatCurrency(costPerWeek)}</p>
		</div>
		<div class="bg-gray-50 p-3 rounded-lg">
			<p class="text-gray-600 mb-1">Coût par an</p>
			<p class="text-lg font-bold text-gray-900">{formatCurrency(costPerYear)}</p>
		</div>
	</div>
</div>
