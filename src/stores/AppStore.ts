import { create } from "zustand";
import { ParkingData } from "./parkingDataTypes";

type FilterKey = "paid" | "free" | "onStreet" | "offStreet" | "available";

interface AppState {
    isListOpen: boolean; // 리스트 열림/닫힘 상태
    toggleList: () => void; // 리스트 노출 토글하는 함수

    activeFilters: Record<FilterKey, boolean>; // 필터 상태 (유료, 무료 등)
    toggleFilter: (filter: FilterKey) => void; // 필터 토글 함수

    // TODO 미사용하면 REMOVE
    currentLocation: { lat: number; lng: number } | null; // 현재 위치 상태
    setCurrentLocation: (location: { lat: number; lng: number }) => void; // 현재 위치 설정 함수

    mapCenter: { lat: number; lng: number } | null; // 지도중심지
    setMapCenter: (location: { lat: number; lng: number }) => void; // 지도중심지 설정 함수

    regionInfo: string | null; // 행정구역명
    setRegionInfo: (info: string) => void; // 행정구역명 설정 함수

    parkingData: ParkingData[]; // 주차장 데이터 상태
    setParkingData: (data: ParkingData[]) => void; // 주차장 데이터 설정 함수
}

export const useAppStore = create<AppState>((set) => ({
    // 리스트 상태
    isListOpen: false,
    // 리스트 노출 토글 함수
    toggleList: () => set((state) => ({ isListOpen: !state.isListOpen })),

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

    // 현재 위치 상태
    currentLocation: null,
    // 현재 위치 설정 함수
    setCurrentLocation: (location: { lat: number; lng: number }) =>
        set({ currentLocation: location }),

    // 지도중심지
    mapCenter: null,
    // 지도중심지 설정 함수
    setMapCenter: (location: { lat: number; lng: number }) =>
        set({ mapCenter: location }),

    // 행정구역명
    regionInfo: null,
    // 행정구역명 설정 함수
    setRegionInfo: (Info: string) => set({ regionInfo: Info }),

    // 주차장 데이터 상태
    parkingData: [],
    // 주차장 데이터 설정 함수
    setParkingData: (data: ParkingData[]) => set({ parkingData: data }),
}));
