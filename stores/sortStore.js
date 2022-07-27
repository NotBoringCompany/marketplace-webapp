import create from "zustand";

export const useSortStore = create((set, get) => ({
	sortingDetails: { typeSort: "ID", btnSort: "down" },
	pageSettings: { show: 12, current: 1, totalPage: null },

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
	setPageSettings: (pageData) => {
		set((state) => ({
			pageSettings: { ...state.pageSettings, ...pageData },
		}));
	},
}));

export const useSortMarketplaceStore = create((set, get) => ({
	sortingDetails: { typeSort: "Date Added", btnSort: "down" },
	pageSettings: { show: 12, current: 1, totalPage: null },

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
	setPageSettings: (pageData) => {
		set((state) => ({
			pageSettings: { ...state.pageSettings, ...pageData },
		}));
	},
}));
