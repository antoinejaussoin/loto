import type { Investment } from '../types/investments';
import type { YearlyData } from '../types/simulation';

/**
 * Calcule la valeur future d'un placement unique
 * Formule: FV = PV * (1 + r)^n
 */
export function calculateFutureValue(
	principal: number,
	annualReturn: number,
	years: number
): number {
	return principal * Math.pow(1 + annualReturn, years);
}

/**
 * Calcule la valeur future avec des versements réguliers
 * Formule: FV = PMT * [((1 + r)^n - 1) / r]
 * où PMT est le montant investi par période
 */
export function calculateFutureValueWithRegularPayments(
	monthlyPayment: number,
	annualReturn: number,
	years: number
): number {
	const monthlyRate = annualReturn / 12;
	const months = years * 12;

	if (monthlyRate === 0) {
		// Si le taux est 0, c'est juste la somme des versements
		return monthlyPayment * months;
	}

	const futureValue =
		monthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

	return futureValue;
}

/**
 * Calcule combien vaudrait l'argent du loto si investi ailleurs
 */
export function calculateLotteryAsInvestment(
	weeklySpending: number,
	investment: Investment,
	years: number
): number {
	// Convertit dépense hebdomadaire en mensuelle
	const monthlyPayment = (weeklySpending * 52) / 12;

	return calculateFutureValueWithRegularPayments(monthlyPayment, investment.annualReturn, years);
}

/**
 * Génère les données comparatives année par année
 */
export function generateInvestmentYearlyData(
	weeklySpending: number,
	investment: Investment,
	durationYears: number
): YearlyData[] {
	const data: YearlyData[] = [];
	const monthlyPayment = (weeklySpending * 52) / 12;

	for (let year = 1; year <= durationYears; year++) {
		const comparisonValue = calculateFutureValueWithRegularPayments(
			monthlyPayment,
			investment.annualReturn,
			year
		);

		data.push({
			year,
			totalSpent: 0, // Sera rempli par le lottery calculator
			expectedReturn: 0, // Sera rempli par le lottery calculator
			comparisonValue,
			jackpotProbability: 0 // Sera rempli par le lottery calculator
		});
	}

	return data;
}

/**
 * Calcule la différence entre le loto et l'investissement
 */
export function calculateOpportunityCost(
	lotteryNetResult: number,
	investmentValue: number
): number {
	// Le coût d'opportunité est la différence entre ce qu'on aurait gagné
	// en investissant et ce qu'on a perdu au loto
	return Math.abs(lotteryNetResult) + investmentValue;
}

/**
 * Formatte un grand nombre en notation lisible (K, M, B)
 */
export function formatLargeNumber(num: number): string {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1) + 'B';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return num.toFixed(0);
}

/**
 * Formatte un pourcentage avec le bon nombre de décimales
 */
export function formatProbability(probability: number): string {
	if (probability >= 0.01) {
		// >= 1%
		return (probability * 100).toFixed(2) + '%';
	} else if (probability >= 0.0001) {
		// >= 0.01%
		return (probability * 100).toFixed(4) + '%';
	} else if (probability > 0) {
		// Très petite probabilité
		const odds = Math.round(1 / probability);
		return `1 sur ${odds.toLocaleString('fr-FR')}`;
	}
	return '< 0.0001%';
}

/**
 * Formatte une valeur monétaire en euros
 */
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}
