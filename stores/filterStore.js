import create from "zustand";

export const useFilterStore = create((set, get) => ({
	availableFilters: {
		species: ["origin", "hybrid", "wild"],
		gender: ["male", "female"],

		rarity: ["common", "uncommon", "rare", "epic", "legendary", "mythical"],
		mutation: ["mutated", "not mutated"],
	},
	availableFiltersWithImage: {
		genus: [
			{
				name: "Lamox",
				id: "lamox",
			},
			{
				name: "Licorine",
				id: "licorine",
			},
			{
				name: "Unicorn",
				id: "unicorn",
			},
			{
				name: "Dranexx",
				id: "dranexx",
			},
			{
				name: "Milnas",
				id: "milnas",
			},
			{
				name: "Todillo",
				id: "todillo",
			},
			{
				name: "Birvo",
				id: "birvo",
			},
			{
				name: "Pongu",
				id: "pongu",
			},
			{
				name: "Darrakan",
				id: "darrakan",
			},
			{
				name: "Kirin",
				id: "kirin",
			},
			{
				name: "Heree",
				id: "heree",
			},
			{
				name: "Spherno",
				id: "spherno",
			},
			{
				name: "Sworffle",
				id: "sworffle",
			},
			{
				name: "Pfufu",
				id: "Pfufu",
			},
			{
				name: "Prawdek",
				id: "prawdek",
			},
			{
				name: "Roggo",
				id: "roggo",
			},
			{
				name: "Schoggi",
				id: "schoggi",
			},
			{
				name: "Fairwoole",
				id: "fairwoole",
			},
		],
		types: [
			{
				name: "Brawler",
				id: "brawler",
			},
			{
				name: "Crystal",
				id: "crystal",
			},
			{
				name: "Earth",
				id: "earth",
			},
			{
				name: "Electric",
				id: "electric",
			},
			{
				name: "Fire",
				id: "fire",
			},
			{
				name: "Frost",
				id: "frost",
			},
			{
				name: "Magic",
				id: "magic",
			},
			{
				name: "Nature",
				id: "nature",
			},
			{
				name: "Ordinary",
				id: "ordinary",
			},
			{
				name: "Psychic",
				id: "psychic",
			},
			{
				name: "Reptile",
				id: "reptile",
			},
			{
				name: "Spirit",
				id: "spirit",
			},
			{
				name: "Toxic",
				id: "toxic",
			},
			{
				name: "Water",
				id: "water",
			},
			{
				name: "Wind",
				id: "wind",
			},
		],
	},
	/*
		selectedFilters' shape example is like this
	
		{
		gender: {
			male: true	
		},
		genus: {
			Lamox: true,
			Licorine: true
		}
		etc..
	}
	*/
	selectedFilters: {},
	rangeFilters: {
		fertility: {
			currentMin: 0,
			currentMax: 3000,
		},
	},
	price: {
		currentMin: 0,
		currentMax: 10000,
	},
	clearing: false,

	addFilter: (data) => {
		const { prop, item } = data;
		//from the example above, item is "male", and prop is "gender"
		!(prop.toString() in get().selectedFilters) &&
			set((state) => ({
				selectedFilters: { ...state.selectedFilters, [prop]: [] },
			}));

		const itemExistsInFilter = item in get().selectedFilters[prop];
		!itemExistsInFilter &&
			set((state) => ({
				selectedFilters: {
					...state.selectedFilters,
					[prop]: { ...state.selectedFilters[prop], [item]: true },
				},
			}));
	},
	removeFilter: (data) => {
		const { prop, item } = data;
		const propAndItemExist =
			prop.toString() in get().selectedFilters &&
			item in get().selectedFilters[prop];
		if (propAndItemExist) {
			delete get().selectedFilters[prop][item]; // delete the actual item
			if (Object.keys(get().selectedFilters[prop]).length === 0) {
				// if that prop is empty e.g gender: {}
				delete get().selectedFilters[prop]; // delete that prop itself
				//asdas
				set((state) => ({
					selectedFilters: {
						...state.selectedFilters, // and reapply state
					},
				}));
			} else {
				set((state) => ({
					selectedFilters: {
						...state.selectedFilters,
						[prop]: get().selectedFilters[prop], // reapply state using the remaining items for that prop
					},
				}));
			}
		}
	},
	setRangeFilter: (data) => {
		const { prop, max, min } = data;
		set((state) => ({
			rangeFilters: {
				...state.rangeFilters,
				[prop]: { currentMin: min, currentMax: max },
			},
		}));
	},
	setPriceRange: (data) => {
		const { max, min } = data;
		set(() => ({
			price: {
				currentMin: min,
				currentMax: max,
			},
		}));
	},
	clearFilter: () => {
		set((state) => ({
			...state,
			selectedFilters: {},
			rangeFilters: {
				fertility: {
					currentMin: 0,
					currentMax: 3000,
				},
			},
			price: {
				currentMin: 0,
				currentMax: 10000,
			},
			clearing: !state.clearing,
		}));
	},
}));
