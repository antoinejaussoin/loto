export const copy = {
	hero: {
		title: 'Et si on faisait les comptes ?',
		subtitle: "Découvrez la vérité sur vos chances de gagner au loto",
		description:
			"Combien dépensez-vous chaque semaine au loto ? Et si vous investissiez cet argent autrement ?"
	},

	sections: {
		parameters: {
			title: 'Vos habitudes de jeu',
			gameLabel: 'Choisissez votre jeu',
			frequencyLabel: 'Combien de fois jouez-vous par semaine ?',
			frequencySuffix: 'fois/semaine',
			durationLabel: "Sur combien d'années ?",
			durationSuffix: 'ans',
			costPerPlay: 'Coût par partie',
			costPerWeek: 'Coût par semaine',
			costPerYear: 'Coût par an'
		},

		probabilities: {
			title: 'Vos vraies chances de gagner',
			intro: (plays: number, years: number) =>
				`En jouant ${plays} fois par semaine pendant ${years} ans, voici vos probabilités :`,
			jackpot: {
				title: 'Gagner le jackpot',
				description: 'Probabilité de remporter le gros lot au moins une fois'
			},
			anyWin: {
				title: 'Gagner un lot',
				description: "Probabilité de gagner n'importe quel montant"
			},
			netPositive: {
				title: 'Être gagnant net',
				description: 'Probabilité que vos gains dépassent vos dépenses'
			},
			millionaire: {
				title: 'Devenir millionnaire',
				description: "Probabilité de gagner au moins 1 million d'euros"
			}
		},

		investment: {
			title: 'Et si vous aviez investi ailleurs ?',
			intro: (spent: string) =>
				`Au lieu de dépenser ${spent} au loto, vous auriez pu investir cet argent.`,
			selectLabel: 'Comparez avec un autre placement :',
			comparison: {
				spent: 'Dépensé au loto',
				expected: 'Gain espéré',
				invested: "Valeur de l'investissement",
				difference: 'Différence'
			}
		},

		evolution: {
			title: 'Évolution sur {years} ans',
			description:
				"Voici comment évolue votre argent selon que vous jouez au loto ou que vous l'investissez."
		},

		conclusion: {
			title: 'Alors, convaincu ?',
			message:
				"Les jeux de hasard peuvent être amusants avec modération, mais ils ne constituent pas un investissement intelligent pour votre avenir financier.",
			cta: 'Investissez intelligemment'
		}
	},

	facts: [
		"Vous avez 10× plus de chances d'être frappé par la foudre que de gagner au loto",
		'Il faudrait jouer pendant 36 742 ans pour avoir 50% de chances de gagner le jackpot',
		'En moyenne, seulement 50% des mises sont redistribuées aux joueurs',
		"L'espérance de gain est toujours négative : vous perdez en moyenne 50% de votre mise",
		'1 français sur 2 joue régulièrement, pour un budget moyen de 300€ par an',
		"Les jeux d'argent rapportent plus de 10 milliards d'euros à l'État chaque année"
	],

	labels: {
		probability: 'Probabilité',
		amount: 'Montant',
		year: 'Année',
		years: 'ans',
		euros: '€',
		perWeek: 'par semaine',
		perYear: 'par an',
		total: 'Total'
	}
};

// Messages d'erreur
export const errors = {
	gameNotFound: 'Jeu non trouvé',
	investmentNotFound: 'Investissement non trouvé',
	invalidParams: 'Paramètres invalides'
};
