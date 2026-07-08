const BASE = "?auto=compress&cs=tinysrgb&w=1200";
const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg${BASE}`;

const gallery = [
	{ title: "Jemaa el-Fnaa at Sunset",        image: px(15360680) },
	{ title: "Marrakech Souk Textiles",         image: px(31576064) },
	{ title: "Sunlit Alley in the Souk",        image: px(29038454) },
	{ title: "Hassan II Mosque",                image: px(2404046)  },
	{ title: "Majorelle Garden",                image: px(25791913) },
	{ title: "Bahia Palace Courtyard",          image: px(36599126) },
	{ title: "Bahia Palace Archway",            image: px(32013503) },
	{ title: "Ait Benhaddou from the Air",      image: px(5541277)  },
	{ title: "Aerial View of Fès",              image: px(30283794) },
	{ title: "Chefchaouen Blue Alleys",         image: px(210478)   },
	{ title: "Staircase in the Blue City",      image: px(5472522)  },
	{ title: "Port of Tangier",                 image: px(13142301) },
];

export default gallery;
