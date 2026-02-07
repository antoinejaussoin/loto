export interface Investment {
	id: string;
	name: string;
	annualReturn: number; // ex: 0.07 pour 7%
	volatility: number; // écart-type annuel (ex: 0.15 pour 15%)
	risk: 'low' | 'medium' | 'high';
	description: string;
	color: string; // couleur pour les graphiques
}

export type InvestmentType = 'stocks' | 'etf' | 'bonds' | 'crypto' | 'savings';
