import create from "zustand";

export const useSortStore = create((set, get) => ({
	sortingDetails: { typeSort: "ID", btnSort: "down" },

	changeSortType: (data) => {
		set((state) => ({
			sortingDetails: { ...state.sortingDetails, typeSort: data },
		}));
	},
	changeSortDirection: (data) => {
		set((state) => ({
			sortingDetails: { ...state.sortingDetails, btnSort: data },
		}));
	},
}));
