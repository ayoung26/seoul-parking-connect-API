import { create } from "zustand";

type FilterKey = "paid" | "free" | "onStreet" | "offStreet" | "available";

interface AppState {
    isListOpen: boolean; // 리스트 열림/닫힘 상태
    toggleList: () => void; // 리스트 노출 토글하는 함수
    isLoading: boolean; // 로딩 상태
    activeFilters: Record<FilterKey, boolean>; // 필터 상태 (유료, 무료 등)
    toggleFilter: (filter: FilterKey) => void; // 필터 토글 함수
}

export const useAppStore = create<AppState>((set) => ({
    // 리스트 상태
    isListOpen: false,

    // 리스트 노출 토글 함수
    toggleList: () => set((state) => ({ isListOpen: !state.isListOpen })),

    // 로딩 상태
    isLoading: false,

    // 필터의 초기 상태
    activeFilters: {
        paid: false, // 유료
        free: false, // 무료
        onStreet: false, // 노상
        offStreet: false, // 노외
        available: false, // 현재주차가능
    },

    // 필터 토글 함수
    toggleFilter: (filter: FilterKey) =>
        set((state) => ({
            activeFilters: {
                ...state.activeFilters,
                [filter]: !state.activeFilters[filter],
            },
        })),
}));
