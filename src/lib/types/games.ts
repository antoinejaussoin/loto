export interface Game {
	id: string;
	name: string;
	ticketPrice: number;
	jackpotOdds: number; // ex: 19068840 pour 1 sur 19,068,840
	averageJackpot: number;
	smallWins: WinTier[];
	description: string;
}

export interface WinTier {
	name: string;
	odds: number; // probabilité de gagner (ex: 0.0001 = 0.01%)
	averageAmount: number; // gain moyen en euros
}
