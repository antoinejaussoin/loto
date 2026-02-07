import { writable, derived, get } from 'svelte/store';
import { simulateLottery, generateYearlyData } from '../services/lottery-calculator';
import {
	calculateLotteryAsInvestment,
	generateInvestmentYearlyData
} from '../services/investment-calculator';
import { getGameById } from '../data/games.data';
import { getInvestmentById } from '../data/investments.data';
import type { SimulationParams, SimulationResult, YearlyData } from '../types/simulation';

// Paramètres par défaut
const DEFAULT_PARAMS: SimulationParams = {
	gameId: 'loto',
	playsPerWeek: 2,
	durationYears: 10,
	comparisonInvestmentId: 'stocks'
};

// Stores writables pour les paramètres
export const gameId = writable<string>(DEFAULT_PARAMS.gameId);
export const playsPerWeek = writable<number>(DEFAULT_PARAMS.playsPerWeek);
export const durationYears = writable<number>(DEFAULT_PARAMS.durationYears);
export const comparisonInvestmentId = writable<string | undefined>(
	DEFAULT_PARAMS.comparisonInvestmentId
);

// Store dérivé pour les paramètres complets
export const params = derived(
	[gameId, playsPerWeek, durationYears, comparisonInvestmentId],
	([$gameId, $playsPerWeek, $durationYears, $comparisonInvestmentId]) => ({
		gameId: $gameId,
		playsPerWeek: $playsPerWeek,
		durationYears: $durationYears,
		comparisonInvestmentId: $comparisonInvestmentId
	})
);

// Store dérivé pour le jeu actuel
export const game = derived(gameId, ($gameId) => getGameById($gameId));

// Store dérivé pour l'investissement de comparaison
export const investment = derived(comparisonInvestmentId, ($comparisonInvestmentId) =>
	$comparisonInvestmentId ? getInvestmentById($comparisonInvestmentId) : undefined
);

// Store dérivé pour le résultat de la simulation
export const result = derived(
	[params, game, investment, playsPerWeek, durationYears],
	([$params, $game, $investment, $playsPerWeek, $durationYears]) => {
		const baseResult = simulateLottery($params);

		if ($investment && $game) {
			const weeklySpending = $playsPerWeek * $game.ticketPrice;
			const comparisonValue = calculateLotteryAsInvestment(
				weeklySpending,
				$investment,
				$durationYears
			);
			const comparisonDifference = comparisonValue + Math.abs(baseResult.expectedNetResult);

			return {
				...baseResult,
				comparisonValue,
				comparisonDifference
			};
		}

		return baseResult;
	}
);

// Store dérivé pour les données annuelles
export const yearlyData = derived(
	[params, game, investment, playsPerWeek, durationYears],
	([$params, $game, $investment, $playsPerWeek, $durationYears]) => {
		const lotteryData = generateYearlyData($params);

		if ($investment && $game) {
			const weeklySpending = $playsPerWeek * $game.ticketPrice;
			const investmentData = generateInvestmentYearlyData(
				weeklySpending,
				$investment,
				$durationYears
			);

			// Fusionne les deux datasets
			return lotteryData.map((lottery, index) => ({
				...lottery,
				comparisonValue: investmentData[index].comparisonValue
			}));
		}

		return lotteryData;
	}
);

// Fonctions d'aide pour mettre à jour les stores
export const setGame = (id: string) => {
	gameId.set(id);
};

export const setPlaysPerWeek = (plays: number) => {
	playsPerWeek.set(Math.max(0.5, Math.min(20, plays)));
};

export const setDuration = (years: number) => {
	durationYears.set(Math.max(1, Math.min(50, years)));
};

export const setInvestment = (investmentId: string | undefined) => {
	comparisonInvestmentId.set(investmentId);
};

export const reset = () => {
	gameId.set(DEFAULT_PARAMS.gameId);
	playsPerWeek.set(DEFAULT_PARAMS.playsPerWeek);
	durationYears.set(DEFAULT_PARAMS.durationYears);
	comparisonInvestmentId.set(DEFAULT_PARAMS.comparisonInvestmentId);
};

// Export d'un objet pour un usage plus simple
export const simulationStore = {
	gameId,
	playsPerWeek,
	durationYears,
	comparisonInvestmentId,
	params,
	game,
	investment,
	result,
	yearlyData,
	setGame,
	setPlaysPerWeek,
	setDuration,
	setInvestment,
	reset
};
