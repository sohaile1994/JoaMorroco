const tourPlan = [
	{
		day: 1,
		title: "Arrival in Casablanca — Oualidia",
		description: "Begin with Morocco's most iconic mosque, then escape to a tranquil Atlantic lagoon.",
		activities: [
			"Morning: Arrive in Casablanca and enjoy breakfast at the hotel.",
			"Mid-morning: Visit the Hassan II Mosque — one of the largest in the world, with its minaret rising 210m above the sea.",
			"Afternoon: Drive to Oualidia, a peaceful coastal town. Boat ride through the flamingo lagoon.",
			"Lunch: Fresh seafood at the water's edge.",
			"Evening: Spend the night at a charming hotel.",
		],
	},
	{
		day: 2,
		title: "Essaouira — Wind City on the Atlantic",
		description: "A UNESCO-listed medina where Moroccan, Portuguese, and sub-Saharan influences meet the sea.",
		activities: [
			"Morning: Breakfast at the hotel.",
			"Mid-morning: Guided tour of Essaouira's old medina — white-and-blue ramparts, narrow alleys, and a working fishing port.",
			"Lunch: Grilled seafood by the harbour.",
			"Afternoon: Horseback ride along the beach at sunset.",
			"Evening: Spend the night in Essaouira.",
		],
	},
	{
		day: 3,
		title: "Marrakech — Arrival in the Red City",
		description: "Morocco's most famous city introduces itself through gardens, palaces, and the great square.",
		activities: [
			"Morning: Breakfast at the hotel, then depart for Marrakech.",
			"Afternoon: Settle in at the riad. Lunch in the medina.",
			"Late afternoon: Majorelle Garden — a serene oasis once owned by Yves Saint Laurent.",
			"Evening: Jemaa el-Fnaa square at night — street performers, food stalls, and the pulse of the city.",
			"Night: Spend the night in Marrakech.",
		],
	},
	{
		day: 4,
		title: "Marrakech — Full Day in the Medina",
		description: "A deep dive into the historic heart of Marrakech's old city.",
		activities: [
			"Morning: Guided walk through Jemaa el-Fnaa as the souks open.",
			"Lunch: Traditional Moroccan meal at Amine's — restaurant of the former Royal Chef of King Hassan II.",
			"Afternoon: Saadian Tombs, Bahia Palace, Badi Palace, and the Ibn Youssef Madrasa.",
			"Evening: Free time to explore or relax.",
		],
	},
	{
		day: 5,
		title: "Ait Benhaddou & Ouarzazate",
		description: "Cross the High Atlas and descend into the dramatic pre-Saharan south.",
		activities: [
			"Morning: Drive via the Tizi n'Tichka pass through the High Atlas Mountains.",
			"Midday: Guided tour of Ait Benhaddou — UNESCO-listed ksar used in dozens of Hollywood films.",
			"Afternoon: Drive to Ouarzazate, the 'Hollywood of Africa', and settle in for the night.",
		],
	},
	{
		day: 6,
		title: "Atlas Studios, Todra Gorge & Sahara",
		description: "From a film city to a canyon, then into the desert as the sun goes down.",
		activities: [
			"Morning: Visit Atlas Film Studios in Ouarzazate, where Gladiator and Game of Thrones were filmed.",
			"Late morning: Drive to the Todra Gorge — sheer orange walls rising 300m from the valley floor.",
			"Afternoon: Continue to Merzouga and the Sahara dunes. Camel trek to camp at sunset.",
			"Evening: Traditional dinner around a campfire under the stars.",
		],
	},
	{
		day: 7,
		title: "Nomadic Life in the Sahara",
		description: "A day with no itinerary — just the dunes, the quiet, and the people who call this home.",
		activities: [
			"Morning: Visit nomadic families and share tea in their tent.",
			"Afternoon: Picnic near the oasis lake, then free time to explore.",
			"Evening: Second night at the desert camp.",
		],
	},
	{
		day: 8,
		title: "Fes — Imperial City of the North",
		description: "Drive north through Ifrane's cedar forests before arriving in Morocco's spiritual capital.",
		activities: [
			"Morning: Breakfast at the camp, then drive north toward Fes.",
			"Midday: Stop at Ifrane — a town in the cedar forest where Barbary macaques roam free.",
			"Afternoon: Arrive in Fes and check into your riad.",
			"Evening: First wander through the lantern-lit alleys of the old city.",
		],
	},
	{
		day: 9,
		title: "Fes — Deep in the Medina",
		description: "A UNESCO World Heritage city that has changed little in a thousand years.",
		activities: [
			"Morning: Guided tour of Al Quaraouiyine University — founded in 859 AD, the world's oldest.",
			"Midday: Chouara Tannery — the ancient leather dyeing pits, a sight and smell unlike any other.",
			"Afternoon: Artisan workshops — woodcarvers, tile-setters, and brass workers in the souks.",
			"Evening: Return to your riad for a quiet night.",
		],
	},
	{
		day: 10,
		title: "Chefchaouen — The Blue City",
		description: "A mountain town painted entirely in shades of blue, tucked into the Rif Mountains.",
		activities: [
			"Morning: Drive to Chefchaouen through the Rif mountain foothills.",
			"Afternoon: First walk through the cobalt alleys and Uta el-Hammam square.",
			"Evening: Hike to the Spanish Mosque above the city for panoramic views at sunset.",
		],
	},
	{
		day: 11,
		title: "Tangier — Where Two Oceans Meet",
		description: "Morocco's northern gateway, where the Atlantic and Mediterranean share a coastline.",
		activities: [
			"Morning: Drive to Tangier along the northern coast.",
			"Midday: Old medina, the Grand Socco, and the Kasbah Museum.",
			"Afternoon: Hercules Cave and Cap Spartel — the tip of Africa where the two seas meet.",
			"Evening: Spend the night in Tangier.",
		],
	},
	{
		day: 12,
		title: "Return to Casablanca — Departure",
		description: "The final morning, and the end of twelve remarkable days across Morocco.",
		activities: [
			"Morning: Farewell breakfast with the group.",
			"Transfer to Casablanca Mohammed V International Airport.",
			"Departure from Casablanca.",
		],
	},
];

export default tourPlan;
