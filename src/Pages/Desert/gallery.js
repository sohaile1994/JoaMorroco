const BASE = "?auto=compress&cs=tinysrgb&w=1200";
const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg${BASE}`;

const gallery = [
	{ title: "Saharan Dunes at Sunset",        image: px(30757346) },
	{ title: "Camel Caravan in the Dunes",     image: px(34187460) },
	{ title: "Golden Dunes at Sunrise",        image: px(30710164) },
	{ title: "Merzouga Dune Field",            image: px(9726809)  },
	{ title: "Camel Caravan at Dusk",          image: px(30158465) },
	{ title: "Hassan II Mosque",               image: px(2404046)  },
	{ title: "Aerial View of Fès",             image: px(30283794) },
	{ title: "Desert Camp in the Sahara",      image: px(30757368) },
	{ title: "Sahara Camp at Sunset",          image: px(35976808) },
	{ title: "Golden Desert Dunes",            image: px(28829635) },
	{ title: "Camel in the Desert",            image: px(998639)   },
	{ title: "Jemaa el-Fnaa at Sunset",        image: px(15360680) },
];

export default gallery;
