export interface SimulationParams {
	gameId: string;
	playsPerWeek: number;
	durationYears: number;
	comparisonInvestmentId?: string;
}

export interface SimulationResult {
	// Coûts
	totalSpent: number;
	totalPlays: number;

	// Probabilités
	jackpotProbability: number; // probabilité de gagner au moins 1 fois le jackpot
	anyWinProbability: number; // probabilité de gagner au moins une fois
	netPositiveProbability: number; // probabilité d'être gagnant net
	millionaireProbability: number; // probabilité de devenir millionnaire

	// Gains espérés
	expectedReturn: number; // gain espéré (généralement négatif)
	expectedNetResult: number; // résultat net espéré (dépenses - gains)

	// Comparaison investissement
	comparisonValue?: number; // valeur si l'argent avait été investi ailleurs
	comparisonDifference?: number; // différence avec l'investissement alternatif
}

export interface YearlyData {
	year: number;
	totalSpent: number;
	expectedReturn: number;
	comparisonValue?: number;
	jackpotProbability: number;
}
