const BASE = "?auto=compress&cs=tinysrgb&w=1200";
const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg${BASE}`;

const gallery = [
	{ title: "Chefchaouen Blue Alleys",        image: px(210478)   },
	{ title: "Blue Architecture",              image: px(33481464) },
	{ title: "Staircase in the Blue City",     image: px(5472522)  },
	{ title: "Medina Narrow Alley",            image: px(3061496)  },
	{ title: "Blue Courtyard",                 image: px(13582998) },
	{ title: "Blue City Buildings",            image: px(25070502) },
	{ title: "Port of Tangier",                image: px(13142301) },
	{ title: "Street in Asilah",               image: px(30131848) },
	{ title: "Whitewashed Alley in Asilah",    image: px(28536923) },
	{ title: "Asilah Blue and White Walls",    image: px(25254989) },
	{ title: "Fès Medina Tanner",              image: px(30283799) },
	{ title: "Al-Attarine Madrasa, Fès",       image: px(19190380) },
];

export default gallery;
