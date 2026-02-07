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

class SimulationStore {
	gameId = $state(DEFAULT_PARAMS.gameId);
	playsPerWeek = $state(DEFAULT_PARAMS.playsPerWeek);
	durationYears = $state(DEFAULT_PARAMS.durationYears);
	comparisonInvestmentId = $state<string | undefined>(DEFAULT_PARAMS.comparisonInvestmentId);

	// Données calculées (derived state)
	params = $derived<SimulationParams>({
		gameId: this.gameId,
		playsPerWeek: this.playsPerWeek,
		durationYears: this.durationYears,
		comparisonInvestmentId: this.comparisonInvestmentId
	});

	game = $derived(getGameById(this.gameId));

	investment = $derived(
		this.comparisonInvestmentId ? getInvestmentById(this.comparisonInvestmentId) : undefined
	);

	// Résultat de la simulation
	result = $derived.by(() => {
		const baseResult = simulateLottery(this.params);

		if (this.investment && this.game) {
			const weeklySpending = this.playsPerWeek * this.game.ticketPrice;
			const comparisonValue = calculateLotteryAsInvestment(
				weeklySpending,
				this.investment,
				this.durationYears
			);
			const comparisonDifference = comparisonValue + Math.abs(baseResult.expectedNetResult);

			return {
				...baseResult,
				comparisonValue,
				comparisonDifference
			};
		}

		return baseResult;
	});

	// Données annuelles pour graphiques
	yearlyData = $derived.by(() => {
		const lotteryData = generateYearlyData(this.params);

		if (this.investment && this.game) {
			const weeklySpending = this.playsPerWeek * this.game.ticketPrice;
			const investmentData = generateInvestmentYearlyData(
				weeklySpending,
				this.investment,
				this.durationYears
			);

			// Fusionne les deux datasets
			return lotteryData.map((lottery, index) => ({
				...lottery,
				comparisonValue: investmentData[index].comparisonValue
			}));
		}

		return lotteryData;
	});

	// Méthodes pour mettre à jour les paramètres
	setGame(gameId: string) {
		this.gameId = gameId;
	}

	setPlaysPerWeek(plays: number) {
		this.playsPerWeek = Math.max(0.5, Math.min(20, plays));
	}

	setDuration(years: number) {
		this.durationYears = Math.max(1, Math.min(50, years));
	}

	setInvestment(investmentId: string | undefined) {
		this.comparisonInvestmentId = investmentId;
	}

	// Reset aux valeurs par défaut
	reset() {
		this.gameId = DEFAULT_PARAMS.gameId;
		this.playsPerWeek = DEFAULT_PARAMS.playsPerWeek;
		this.durationYears = DEFAULT_PARAMS.durationYears;
		this.comparisonInvestmentId = DEFAULT_PARAMS.comparisonInvestmentId;
	}
}

// Instance unique (singleton)
export const simulationStore = new SimulationStore();
