import type { Investment } from '../types/investments';

// Données de rendement simplifiées basées sur des moyennes historiques (30-50 ans)
export const investments: Record<string, Investment> = {
	stocks: {
		id: 'stocks',
		name: 'Actions (CAC 40 / S&P 500)',
		annualReturn: 0.08, // 8% par an (moyenne historique)
		volatility: 0.15, // 15% d'écart-type
		risk: 'medium',
		description: 'Investissement en actions via les indices boursiers majeurs. Rendement moyen de 8% par an sur le long terme.',
		color: '#0ea5e9' // primary-500
	},
	etf: {
		id: 'etf',
		name: 'ETF Diversifié (World)',
		annualReturn: 0.07, // 7% par an
		volatility: 0.12, // 12% d'écart-type
		risk: 'medium',
		description: 'Fonds indiciel diversifié sur l\'économie mondiale. Bon compromis risque/rendement.',
		color: '#06b6d4' // cyan-500
	},
	bonds: {
		id: 'bonds',
		name: 'Obligations',
		annualReturn: 0.04, // 4% par an
		volatility: 0.05, // 5% d'écart-type
		risk: 'low',
		description: 'Obligations d\'État et d\'entreprises. Rendement stable et risque faible.',
		color: '#10b981' // green-500
	},
	crypto: {
		id: 'crypto',
		name: 'Crypto (Bitcoin)',
		annualReturn: 0.20, // 20% par an (très volatile!)
		volatility: 0.60, // 60% d'écart-type
		risk: 'high',
		description: 'Crypto-monnaies comme le Bitcoin. Très volatil, peut générer des rendements élevés mais aussi des pertes importantes.',
		color: '#f59e0b' // amber-500
	},
	savings: {
		id: 'savings',
		name: 'Livret A',
		annualReturn: 0.03, // 3% par an (taux actuel)
		volatility: 0, // Aucun risque
		risk: 'low',
		description: 'Compte épargne réglementé, sans risque. Le placement le plus sûr mais avec un rendement limité.',
		color: '#22c55e' // success-500
	}
};

export const investmentList = Object.values(investments);

// Fonction helper pour obtenir un investissement par ID
export function getInvestmentById(id: string): Investment | undefined {
	return investments[id];
}

// Comparaison texte pour UI
export const investmentComparisons: Record<string, string> = {
	stocks: 'En investissant dans les actions, votre argent aurait rapporté en moyenne 8% par an.',
	etf: 'Avec un ETF World diversifié, vous auriez profité d\'une croissance stable de 7% par an.',
	bonds: 'Les obligations vous auraient garanti un rendement sûr de 4% par an.',
	crypto: 'Le Bitcoin aurait pu multiplier votre investissement, mais attention à la volatilité!',
	savings: 'Même un simple Livret A vous aurait rapporté 3% par an, sans risque.'
};
