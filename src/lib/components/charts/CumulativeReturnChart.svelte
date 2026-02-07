<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Title,
		Tooltip,
		Legend,
		Filler
	} from 'chart.js';
	import type { YearlyData } from '$lib/types/simulation';
	import { formatCurrency } from '$lib/services/investment-calculator';

	// Register Chart.js components
	Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler);

	interface Props {
		data: YearlyData[];
		showComparison: boolean;
	}

	let { data, showComparison }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	onMount(() => {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: data.map((d) => `Année ${d.year}`),
				datasets: [
					{
						label: 'Dépensé au loto',
						data: data.map((d) => d.totalSpent),
						borderColor: 'rgb(239, 68, 68)',
						backgroundColor: 'rgba(239, 68, 68, 0.1)',
						borderWidth: 3,
						tension: 0.1,
						fill: true
					},
					{
						label: 'Gain espéré (loto)',
						data: data.map((d) => d.expectedReturn),
						borderColor: 'rgb(156, 163, 175)',
						backgroundColor: 'rgba(156, 163, 175, 0.1)',
						borderWidth: 2,
						borderDash: [5, 5],
						tension: 0.1,
						fill: false
					},
					...(showComparison
						? [
								{
									label: 'Valeur si investi',
									data: data.map((d) => d.comparisonValue || 0),
									borderColor: 'rgb(34, 197, 94)',
									backgroundColor: 'rgba(34, 197, 94, 0.1)',
									borderWidth: 3,
									tension: 0.1,
									fill: true
								}
							]
						: [])
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					mode: 'index',
					intersect: false
				},
				plugins: {
					legend: {
						display: true,
						position: 'top'
					},
					title: {
						display: true,
						text: 'Évolution de votre argent',
						font: {
							size: 16,
							weight: 'bold'
						}
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								let label = context.dataset.label || '';
								if (label) {
									label += ': ';
								}
								if (context.parsed.y !== null) {
									label += formatCurrency(context.parsed.y);
								}
								return label;
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							callback: function (value) {
								return formatCurrency(Number(value));
							}
						}
					}
				}
			}
		});

		return () => {
			chart?.destroy();
		};
	});

	// Update chart when data changes
	$effect(() => {
		if (!chart) return;

		chart.data.labels = data.map((d) => `Année ${d.year}`);
		chart.data.datasets[0].data = data.map((d) => d.totalSpent);
		chart.data.datasets[1].data = data.map((d) => d.expectedReturn);

		if (showComparison && chart.data.datasets[2]) {
			chart.data.datasets[2].data = data.map((d) => d.comparisonValue || 0);
		} else if (showComparison && !chart.data.datasets[2]) {
			chart.data.datasets.push({
				label: 'Valeur si investi',
				data: data.map((d) => d.comparisonValue || 0),
				borderColor: 'rgb(34, 197, 94)',
				backgroundColor: 'rgba(34, 197, 94, 0.1)',
				borderWidth: 3,
				tension: 0.1,
				fill: true
			});
		} else if (!showComparison && chart.data.datasets.length > 2) {
			chart.data.datasets.pop();
		}

		chart.update();
	});
</script>

<div class="bg-white rounded-lg shadow-md p-6">
	<div class="h-80 md:h-96">
		<canvas bind:this={canvas}></canvas>
	</div>
</div>
