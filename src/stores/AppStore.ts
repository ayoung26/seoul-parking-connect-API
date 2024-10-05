import { create } from "zustand";
import { ParkingData } from "./parkingDataTypes";

type FilterKey = "paid" | "free" | "onStreet" | "offStreet" | "available";

interface AppState {
    // 모바일 상태 관리
    isListOpen: boolean;
    setIsListOpen: (open: boolean) => void;
    toggleListOpen: () => void;

    isFavoriteOpen: boolean;
    setIsFavoriteOpen: (open: boolean) => void;
    toggleFavoriteOpen: () => void;

    // 웹 상태 관리
    isListView: boolean;
    toggleListView: () => void;

    isFavoriteView: boolean;
    setIsFavoriteView: (view: boolean) => void;
    toggleFavoriteView: () => void;

    // 공통 상태 관리
    activeFilters: Record<FilterKey, boolean>;
    toggleFilter: (filter: FilterKey) => void;

    currentLocation: { lat: number; lng: number } | null;
    setCurrentLocation: (location: { lat: number; lng: number }) => void;

    mapCenter: { lat: number; lng: number } | null;
    setMapCenter: (location: { lat: number; lng: number }) => void;

    mapLevel: number;
    setMapLevel: (level: number) => void;
    initialMapLevel: number;
    markerZoomLevel: number;

    regionInfo: string | null;
    setRegionInfo: (info: string) => void;

    parkingData: ParkingData[];
    setParkingData: (data: ParkingData[]) => void;

    filteredParkingData: ParkingData[];
    setFilteredParkingData: (data: ParkingData[]) => void;

    favoritesParkingData: ParkingData[];
    addFavoritesParkingData: (parking: ParkingData) => void;
    removeFavoritesParkingData: (parkingCode: string) => void;
    clearFavoritesParkingData: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    // 리스트 열림/닫힘 상태
    isListOpen: false,
    setIsListOpen: (open: boolean) => set({ isListOpen: open }),
    toggleListOpen: () => set((state) => ({ isListOpen: !state.isListOpen })),

    // 즐겨찾기 열림/닫힘 상태
    isFavoriteOpen: false,
    setIsFavoriteOpen: (open: boolean) => set({ isFavoriteOpen: open }),
    toggleFavoriteOpen: () =>
        set((state) => ({ isFavoriteOpen: !state.isFavoriteOpen })),

    // 리스트 뷰 열림/닫힘 상태
    isListView: true,
    toggleListView: () => set((state) => ({ isListView: !state.isListView })),

    // 즐겨찾기 뷰 열림/닫힘 상태
    isFavoriteView: false,
    setIsFavoriteView: (view: boolean) => set({ isFavoriteView: view }),
    toggleFavoriteView: () =>
        set((state) => ({ isFavoriteView: !state.isFavoriteView })),

    // 필터 상태 및 토글 함수
    activeFilters: {
        paid: false,
        free: false,
        onStreet: false,
        offStreet: false,
        available: false,
    },
    toggleFilter: (filter: FilterKey) =>
        set((state) => ({
            activeFilters: {
                ...state.activeFilters,
                [filter]: !state.activeFilters[filter],
            },
        })),

    // 현재 위치 및 지도 중심 상태
    currentLocation: null,
    setCurrentLocation: (location: { lat: number; lng: number }) =>
        set({ currentLocation: location }),

    mapCenter: null,
    setMapCenter: (location: { lat: number; lng: number }) =>
        set({ mapCenter: location }),

    // 지도 확대/축소 레벨 관리
    mapLevel: 5,
    setMapLevel: (level: number) => set({ mapLevel: level }),
    initialMapLevel: 5,
    markerZoomLevel: 3,

    // 행정구역 정보
    regionInfo: null,
    setRegionInfo: (Info: string) => set({ regionInfo: Info }),

    // 주차장 데이터 관리
    parkingData: [],
    setParkingData: (data: ParkingData[]) => set({ parkingData: data }),

    // 필터링된 주차장 데이터 관리
    filteredParkingData: [],
    setFilteredParkingData: (data) => set({ filteredParkingData: data }),

    // 즐겨찾기 주차장 데이터 관리
    favoritesParkingData: JSON.parse(localStorage.getItem("favorites") || "[]"),
    addFavoritesParkingData: (parking: ParkingData) =>
        set((state) => {
            const updatedFavorites = [...state.favoritesParkingData, parking];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return { favoritesParkingData: updatedFavorites };
        }),
    removeFavoritesParkingData: (parkingCode: string) =>
        set((state) => {
            const updatedFavorites = state.favoritesParkingData.filter(
                (item) => item.PKLT_CD !== parkingCode
            );
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return { favoritesParkingData: updatedFavorites };
        }),
    clearFavoritesParkingData: () => {
        localStorage.removeItem("favorites");
        set({ favoritesParkingData: [] });
    },
}));
