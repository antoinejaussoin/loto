import { browser } from '$app/environment';

const STORAGE_KEY = 'loto-preferences';

interface Preferences {
	lastGameId?: string;
	lastPlaysPerWeek?: number;
	lastDurationYears?: number;
	lastInvestmentId?: string;
}

// Charge les préférences depuis localStorage
function load(): Preferences {
	if (!browser) return {};

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (error) {
		console.error('Erreur lors du chargement des préférences:', error);
	}
	return {};
}

// Sauvegarde les préférences dans localStorage
function save(prefs: Preferences) {
	if (!browser) return;

	try {
		const current = load();
		const updated = { ...current, ...prefs };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	} catch (error) {
		console.error('Erreur lors de la sauvegarde des préférences:', error);
	}
}

// Récupère les préférences
function get(): Preferences {
	return load();
}

// Efface les préférences
function clear() {
	if (!browser) return;

	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch (error) {
		console.error('Erreur lors de la suppression des préférences:', error);
	}
}

// Export des fonctions
export const preferencesStore = {
	load,
	save,
	get,
	clear
};
