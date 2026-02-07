<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<html lang="fr" />
	<link rel="icon" href={favicon} />
	<meta name="description" content="Découvrez vos vraies chances de gagner au loto et comparez avec d'autres investissements. Calculez combien vous pourriez gagner en investissant intelligemment." />
	<meta property="og:title" content="Statistiques Loto - Calculez vos vraies chances" />
	<meta property="og:description" content="Découvrez vos vraies chances de gagner au loto et comparez avec d'autres investissements." />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="bg-white shadow-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<h1 class="text-2xl font-bold text-gray-900">Et si on faisait les comptes ?</h1>
			<p class="text-gray-600 text-sm mt-1">Découvrez la vérité sur vos chances de gagner au loto</p>
		</div>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="bg-gray-800 text-white py-6 mt-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
			<p class="mb-2">Les calculs sont basés sur des probabilités théoriques et des données publiques.</p>
			<p class="text-gray-400">Ceci n'est pas un conseil financier. Les rendements passés ne garantissent pas les rendements futurs.</p>
		</div>
	</footer>
</div>
