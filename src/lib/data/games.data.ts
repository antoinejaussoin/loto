import type { Game } from '../types/games';

// Données officielles FDJ pour les jeux de hasard français
export const games: Record<string, Game> = {
	loto: {
		id: 'loto',
		name: 'Loto',
		ticketPrice: 2.20,
		jackpotOdds: 19068840, // 1 sur 19 068 840
		averageJackpot: 5000000,
		description: '5 numéros + 1 numéro Chance',
		smallWins: [
			{ name: 'Rang 2 (5 bons numéros)', odds: 1 / 2118760, averageAmount: 100000 },
			{ name: 'Rang 3 (4 bons + Chance)', odds: 1 / 88677, averageAmount: 1000 },
			{ name: 'Rang 4 (4 bons numéros)', odds: 1 / 9631, averageAmount: 50 },
			{ name: 'Rang 5 (3 bons + Chance)', odds: 1 / 1936, averageAmount: 20 },
			{ name: 'Rang 6 (3 bons numéros)', odds: 1 / 224, averageAmount: 5 },
			{ name: 'Rang 7 (2 bons + Chance)', odds: 1 / 144, averageAmount: 4 },
			{ name: 'Rang 8 (2 bons numéros)', odds: 1 / 18, averageAmount: 2.50 }
		]
	},
	euromillions: {
		id: 'euromillions',
		name: 'EuroMillions',
		ticketPrice: 2.50,
		jackpotOdds: 139838160, // 1 sur 139 838 160
		averageJackpot: 25000000,
		description: '5 numéros + 2 étoiles',
		smallWins: [
			{ name: 'Rang 2 (5 bons + 1 étoile)', odds: 1 / 6991908, averageAmount: 200000 },
			{ name: 'Rang 3 (5 bons numéros)', odds: 1 / 3107515, averageAmount: 30000 },
			{ name: 'Rang 4 (4 bons + 2 étoiles)', odds: 1 / 621503, averageAmount: 2000 },
			{ name: 'Rang 5 (4 bons + 1 étoile)', odds: 1 / 31075, averageAmount: 150 },
			{ name: 'Rang 6 (3 bons + 2 étoiles)', odds: 1 / 14125, averageAmount: 50 },
			{ name: 'Rang 7 (4 bons numéros)', odds: 1 / 13811, averageAmount: 40 },
			{ name: 'Rang 8 (2 bons + 2 étoiles)', odds: 1 / 985, averageAmount: 15 },
			{ name: 'Rang 9 (3 bons + 1 étoile)', odds: 1 / 706, averageAmount: 12 },
			{ name: 'Rang 10 (3 bons numéros)', odds: 1 / 314, averageAmount: 10 },
			{ name: 'Rang 11 (1 bon + 2 étoiles)', odds: 1 / 188, averageAmount: 8 },
			{ name: 'Rang 12 (2 bons + 1 étoile)', odds: 1 / 49, averageAmount: 5 },
			{ name: 'Rang 13 (2 bons numéros)', odds: 1 / 22, averageAmount: 3.50 }
		]
	},
	keno: {
		id: 'keno',
		name: 'Keno',
		ticketPrice: 2.00,
		jackpotOdds: 2147573, // 1 sur 2 147 573 (pour 10 bons numéros)
		averageJackpot: 200000,
		description: 'Jusqu\'à 10 numéros',
		smallWins: [
			{ name: '9 bons numéros', odds: 1 / 163381, averageAmount: 20000 },
			{ name: '8 bons numéros', odds: 1 / 20347, averageAmount: 2000 },
			{ name: '7 bons numéros', odds: 1 / 3907, averageAmount: 100 },
			{ name: '6 bons numéros', odds: 1 / 1116, averageAmount: 15 },
			{ name: '5 bons numéros', odds: 1 / 464, averageAmount: 3 },
			{ name: '0 bon numéro', odds: 1 / 22, averageAmount: 2 }
		]
	}
};

export const gameList = Object.values(games);

// Fonction helper pour obtenir un jeu par ID
export function getGameById(id: string): Game | undefined {
	return games[id];
}
