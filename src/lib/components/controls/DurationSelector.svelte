<script lang="ts">
	interface Props {
		durationYears: number;
		onChange: (value: number) => void;
	}

	let { durationYears, onChange }: Props = $props();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		onChange(Number(target.value));
	}
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<label class="text-sm font-semibold text-gray-700">Sur combien d'années ?</label>
		<span class="text-2xl font-bold text-primary-600">{durationYears} ans</span>
	</div>

	<input
		type="range"
		min="1"
		max="50"
		step="1"
		value={durationYears}
		oninput={handleInput}
		class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
	/>

	<div class="flex justify-between text-xs text-gray-500">
		<span>1 an</span>
		<span>25 ans</span>
		<span>50 ans</span>
	</div>
</div>
