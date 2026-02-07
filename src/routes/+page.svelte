<script lang="ts">
	import { onMount } from 'svelte';
	import { simulationStore } from '$lib/stores';
	import { preferencesStore } from '$lib/stores';
	import { copy } from '$lib/content/copy';
	import { formatCurrency, formatProbability } from '$lib/services/investment-calculator';

	import GameSelector from '$lib/components/controls/GameSelector.svelte';
	import FrequencySelector from '$lib/components/controls/FrequencySelector.svelte';
	import DurationSelector from '$lib/components/controls/DurationSelector.svelte';
	import InvestmentSelector from '$lib/components/controls/InvestmentSelector.svelte';

	import StatCard from '$lib/components/stats/StatCard.svelte';
	import FactBox from '$lib/components/stats/FactBox.svelte';
	import InvestmentComparison from '$lib/components/stats/InvestmentComparison.svelte';

	import CumulativeReturnChart from '$lib/components/charts/CumulativeReturnChart.svelte';

	// Load preferences on mount
	onMount(() => {
		const prefs = preferencesStore.get();
		if (prefs.lastGameId) simulationStore.setGame(prefs.lastGameId);
		if (prefs.lastPlaysPerWeek) simulationStore.setPlaysPerWeek(prefs.lastPlaysPerWeek);
		if (prefs.lastDurationYears) simulationStore.setDuration(prefs.lastDurationYears);
		if (prefs.lastInvestmentId !== undefined)
			simulationStore.setInvestment(prefs.lastInvestmentId);
	});

	// Save preferences when they change
	$effect(() => {
		preferencesStore.save({
			lastGameId: simulationStore.gameId,
			lastPlaysPerWeek: simulationStore.playsPerWeek,
			lastDurationYears: simulationStore.durationYears,
			lastInvestmentId: simulationStore.comparisonInvestmentId
		});
	});

	// Get random fact
	const randomFact = copy.facts[Math.floor(Math.random() * copy.facts.length)];
</script>

<svelte:head>
	<title>Statistiques Loto - Calculez vos vraies chances de gagner</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
	<!-- Hero Section -->
	<section class="text-center py-12">
		<h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{copy.hero.title}</h2>
		<p class="text-xl text-gray-600 mb-2">{copy.hero.subtitle}</p>
		<p class="text-gray-500">{copy.hero.description}</p>
	</section>

	<!-- Random Fact -->
	<section>
		<FactBox fact={randomFact} />
	</section>

	<!-- Game Selection -->
	<section class="space-y-6">
		<h3 class="text-2xl font-bold text-gray-900">{copy.sections.parameters.title}</h3>
		<GameSelector
			selectedGameId={simulationStore.gameId}
			onSelect={(id) => simulationStore.setGame(id)}
		/>
	</section>

	<!-- Frequency and Duration -->
	{#if simulationStore.game}
		<section class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div class="bg-white rounded-lg shadow-md p-6">
				<FrequencySelector
					playsPerWeek={simulationStore.playsPerWeek}
					ticketPrice={simulationStore.game.ticketPrice}
					onChange={(value) => simulationStore.setPlaysPerWeek(value)}
				/>
			</div>
			<div class="bg-white rounded-lg shadow-md p-6">
				<DurationSelector
					durationYears={simulationStore.durationYears}
					onChange={(value) => simulationStore.setDuration(value)}
				/>
			</div>
		</section>

		<!-- Probabilities Section -->
		<section class="space-y-6">
			<div class="text-center">
				<h3 class="text-3xl font-bold text-gray-900 mb-2">{copy.sections.probabilities.title}</h3>
				<p class="text-gray-600">
					{copy.sections.probabilities.intro(
						simulationStore.playsPerWeek,
						simulationStore.durationYears
					)}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					title={copy.sections.probabilities.jackpot.title}
					value={formatProbability(simulationStore.result.jackpotProbability)}
					description={copy.sections.probabilities.jackpot.description}
					variant="danger"
				/>
				<StatCard
					title={copy.sections.probabilities.anyWin.title}
					value={formatProbability(simulationStore.result.anyWinProbability)}
					description={copy.sections.probabilities.anyWin.description}
					variant="neutral"
				/>
				<StatCard
					title={copy.sections.probabilities.netPositive.title}
					value={formatProbability(simulationStore.result.netPositiveProbability)}
					description={copy.sections.probabilities.netPositive.description}
					variant="danger"
				/>
				<StatCard
					title={copy.sections.probabilities.millionaire.title}
					value={formatProbability(simulationStore.result.millionaireProbability)}
					description={copy.sections.probabilities.millionaire.description}
					variant="danger"
				/>
			</div>
		</section>

		<!-- Investment Comparison Section -->
		<section class="space-y-6">
			<div class="text-center">
				<h3 class="text-3xl font-bold text-gray-900 mb-2">{copy.sections.investment.title}</h3>
				<p class="text-gray-600">
					{copy.sections.investment.intro(formatCurrency(simulationStore.result.totalSpent))}
				</p>
			</div>

			<div class="bg-white rounded-lg shadow-md p-6">
				<InvestmentSelector
					selectedInvestmentId={simulationStore.comparisonInvestmentId}
					onSelect={(id) => simulationStore.setInvestment(id)}
				/>
			</div>

			<InvestmentComparison
				totalSpent={simulationStore.result.totalSpent}
				expectedReturn={simulationStore.result.expectedReturn}
				comparisonValue={simulationStore.result.comparisonValue}
			/>
		</section>

		<!-- Chart Section -->
		{#if simulationStore.yearlyData.length > 0}
			<section class="space-y-6">
				<div class="text-center">
					<h3 class="text-3xl font-bold text-gray-900 mb-2">
						Évolution sur {simulationStore.durationYears} ans
					</h3>
					<p class="text-gray-600">
						Voici comment évolue votre argent selon que vous jouez au loto ou que vous
						l'investissez.
					</p>
				</div>

				<CumulativeReturnChart
					data={simulationStore.yearlyData}
					showComparison={simulationStore.comparisonInvestmentId !== undefined}
				/>
			</section>
		{/if}

		<!-- Conclusion -->
		<section class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
			<h3 class="text-3xl font-bold mb-4">{copy.sections.conclusion.title}</h3>
			<p class="text-lg mb-6 opacity-90">{copy.sections.conclusion.message}</p>
			{#if simulationStore.result.comparisonValue}
				<div class="bg-white/20 rounded-lg p-6 max-w-2xl mx-auto">
					<p class="text-sm mb-2">En investissant au lieu de jouer, vous auriez :</p>
					<p class="text-4xl font-bold">
						{formatCurrency(simulationStore.result.comparisonDifference || 0)}
					</p>
					<p class="text-sm mt-2 opacity-75">de plus dans votre poche</p>
				</div>
			{/if}
		</section>
	{/if}
</div>
