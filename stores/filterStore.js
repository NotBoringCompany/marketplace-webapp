import create from "zustand";

export const useFilterStore = create((set, get) => ({
	availableFilters: {
		gender: ["male", "female"],
	},
	selectedFilters: {},
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
	addFilter: (data) => {
		const { prop, item } = data;
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
		const itemExistsInFilter = item in get().selectedFilters[prop];
		if (prop.toString() in get().selectedFilters && itemExistsInFilter) {
			delete get().selectedFilters[prop][item];
			if (Object.keys(get().selectedFilters[prop]) === 0)
				delete get().selectedFilters[prop];
			set((state) => ({
				selectedFilters: {
					...state.selectedFilters,
					[prop]: get().selectedFilters[prop],
				},
			}));
		}
	},
	clearFilter: () => {
		set({ selectedFilters: {} });
	},
}));
