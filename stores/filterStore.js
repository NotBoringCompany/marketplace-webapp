import create from "zustand";

export const useFilterStore = create((set) => ({
	filters: new Map(),
}));
