import create from "zustand";

export const useFilterStore = create((set, get) => ({
	availableFilters: {
		species: ["origin", "hybrid", "wild"],
		gender: ["male", "female"],
		rarity: ["common", "uncommon", "rare", "epic", "legendary", "mythical"],
		mutation: ["mutated", "not_mutated"],
	},
	/*
		selectedFilters' shape example is like this
	
		{
		gender: {
			male: true	
		},
		genera: {
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
			currentMax: 1500,
		},
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
	clearFilter: () => {
		set((state) => ({
			selectedFilters: {},
			rangeFilters: {
				fertility: {
					currentMin: 0,
					currentMax: 1500,
				},
			},
			clearing: !state.clearing,
		}));
	},
}));
