import type { Game } from '../types/games';
import type { SimulationParams, SimulationResult, YearlyData } from '../types/simulation';
import { getGameById } from '../data/games.data';

/**
 * Calcule la probabilité de gagner au moins une fois sur n tentatives
 * Formule: 1 - (1 - p)^n
 */
export function calculateJackpotProbability(totalPlays: number, jackpotOdds: number): number {
	const probabilityPerPlay = 1 / jackpotOdds;
	const probabilityNever = Math.pow(1 - probabilityPerPlay, totalPlays);
	return 1 - probabilityNever;
}

/**
 * Calcule la probabilité de gagner au moins une fois n'importe quel lot
 */
export function calculateAnyWinProbability(game: Game, totalPlays: number): number {
	// Somme de toutes les probabilités de gagner (tous rangs)
	const totalWinProbabilityPerPlay =
		1 / game.jackpotOdds + game.smallWins.reduce((sum, tier) => sum + tier.odds, 0);

	const probabilityNever = Math.pow(1 - totalWinProbabilityPerPlay, totalPlays);
	return 1 - probabilityNever;
}

/**
 * Calcule le gain espéré sur toutes les parties
 */
export function calculateExpectedReturn(game: Game, totalPlays: number): number {
	// Gain espéré du jackpot
	const jackpotExpectedValue = (game.averageJackpot / game.jackpotOdds) * totalPlays;

	// Gain espéré des petits lots
	const smallWinsExpectedValue = game.smallWins.reduce((sum, tier) => {
		return sum + tier.odds * tier.averageAmount * totalPlays;
	}, 0);

	return jackpotExpectedValue + smallWinsExpectedValue;
}

/**
 * Calcule la probabilité d'être gagnant net (gains > dépenses)
 * C'est une estimation basée sur la distribution des gains
 */
export function calculateNetPositiveProbability(game: Game, totalPlays: number): number {
	const totalSpent = totalPlays * game.ticketPrice;
	const expectedReturn = calculateExpectedReturn(game, totalPlays);

	// Probabilité très faible - on utilise une approximation
	// En réalité, il faudrait gagner plusieurs petits lots ou un gros lot
	// On estime que c'est environ 10x moins probable que de gagner au moins une fois
	const anyWinProb = calculateAnyWinProbability(game, totalPlays);

	// Pour être gagnant net, il faut gagner assez pour couvrir les dépenses
	// C'est très rare - on utilise une fraction de la probabilité de gagner
	const netPositiveProb = anyWinProb * (expectedReturn / totalSpent) * 0.1;

	return Math.min(netPositiveProb, 1);
}

/**
 * Calcule la probabilité de devenir millionnaire
 */
export function calculateMillionaireProbability(game: Game, totalPlays: number): number {
	// On peut devenir millionnaire de deux façons:
	// 1. Gagner le jackpot (le plus probable)
	// 2. Gagner plusieurs gros lots de rang 2 (quasi impossible)

	const jackpotProb = calculateJackpotProbability(totalPlays, game.jackpotOdds);

	// Cherche les lots > 100k€
	const bigWins = game.smallWins.filter((tier) => tier.averageAmount >= 100000);
	let bigWinProb = 0;

	bigWins.forEach((tier) => {
		const probWinOnce = calculateJackpotProbability(totalPlays, 1 / tier.odds);
		bigWinProb += probWinOnce * 0.1; // Pondéré car il faudrait gagner plusieurs fois
	});

	return Math.min(jackpotProb + bigWinProb, 1);
}

/**
 * Génère les données année par année pour les graphiques
 */
export function generateYearlyData(params: SimulationParams): YearlyData[] {
	const game = getGameById(params.gameId);
	if (!game) return [];

	const data: YearlyData[] = [];
	const playsPerYear = params.playsPerWeek * 52;

	for (let year = 1; year <= params.durationYears; year++) {
		const totalPlays = playsPerYear * year;
		const totalSpent = totalPlays * game.ticketPrice;
		const expectedReturn = calculateExpectedReturn(game, totalPlays);
		const jackpotProbability = calculateJackpotProbability(totalPlays, game.jackpotOdds);

		data.push({
			year,
			totalSpent,
			expectedReturn,
			jackpotProbability
		});
	}

	return data;
}

/**
 * Fonction principale de simulation
 */
export function simulateLottery(params: SimulationParams): SimulationResult {
	const game = getGameById(params.gameId);
	if (!game) {
		throw new Error(`Game not found: ${params.gameId}`);
	}

	const totalPlays = params.playsPerWeek * 52 * params.durationYears;
	const totalSpent = totalPlays * game.ticketPrice;

	// Calculs de probabilités
	const jackpotProbability = calculateJackpotProbability(totalPlays, game.jackpotOdds);
	const anyWinProbability = calculateAnyWinProbability(game, totalPlays);
	const netPositiveProbability = calculateNetPositiveProbability(game, totalPlays);
	const millionaireProbability = calculateMillionaireProbability(game, totalPlays);

	// Calculs de gains
	const expectedReturn = calculateExpectedReturn(game, totalPlays);
	const expectedNetResult = totalSpent - expectedReturn; // Toujours négatif

	return {
		totalSpent,
		totalPlays,
		jackpotProbability,
		anyWinProbability,
		netPositiveProbability,
		millionaireProbability,
		expectedReturn,
		expectedNetResult
	};
}
