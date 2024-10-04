import { useAppStore } from "../stores/AppStore";
import { getParkingData } from "../services/parkingService";

export default function useMap() {
    const { setCurrentLocation, setRegionInfo, setParkingData, setMapCenter } =
        useAppStore();

    // 자치구 기준으로 API 데이터 가져오기
    const setParkingDataByRegion = async (regionInfo: string) => {
        const parkingData = await getParkingData(1, 100, regionInfo);
        return parkingData;
    };

    // 현재 위치 가져오기
    const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({
                            lat: Number(latitude),
                            lng: Number(longitude),
                        });
                        resolve({ lat: latitude, lng: longitude });
                    },
                    (error) => {
                        console.error(
                            "현재 위치를 가져오는 중 오류 발생:",
                            error
                        );
                        reject(error);
                    }
                );
            } else {
                reject(new Error("현재 위치를 받아올 수 없습니다."));
            }
        });
    };

    // 좌표로 자치구 정보 얻고 주차장 데이터 가져오기
    interface RegionCodeResult {
        region_1depth_name: string; // 시/도 이름
        region_2depth_name: string; // 구 이름
        region_3depth_name?: string; // 동 이름
        code: string; // 행정 코드
    }
    const fetchRegionAndParkingData = async (lat: number, lng: number) => {
        const geocoder = new kakao.maps.services.Geocoder();

        try {
            // 자치구 정보 가져오기
            const result = await new Promise<RegionCodeResult[]>(
                (resolve, reject) => {
                    geocoder.coord2RegionCode(lng, lat, (result, status) => {
                        if (
                            status === kakao.maps.services.Status.OK &&
                            result.length > 0
                        ) {
                            resolve(result);
                        } else {
                            reject(
                                new Error("geocoder.coord2RegionCode Error")
                            );
                        }
                    });
                }
            );

            const regionInfo = result[0]!.region_2depth_name;
            setRegionInfo(regionInfo);

            // 중심지 설정
            setMapCenterRegion(regionInfo);

            // API 데이터 가져오기
            const parkingData = await setParkingDataByRegion(regionInfo);
            if (parkingData) {
                setParkingData(parkingData);
            }
        } catch (error) {
            console.error("주차장 데이터 가져오는 중 오류 발생:", error);
        }
    };

    // 자치구 중심 위치로 지도 중심 설정하는 함수
    const setMapCenterRegion = (regionInfo: string) => {
        const geocoder = new kakao.maps.services.Geocoder();

        // 자치구 이름으로 주소 검색
        geocoder.addressSearch(`서울특별시 ${regionInfo}`, (result, status) => {
            if (status === kakao.maps.services.Status.OK && result.length > 0) {
                const lat = result[0]?.y; // 위도
                const lng = result[0]?.x; // 경도

                // 지도 중심을 자치구 중심으로 업데이트
                setMapCenter({ lat: Number(lat), lng: Number(lng) });
            }
        });
    };

    // 현재 위치한 자치구 내 주차장 정보 표시
    const showParkingDataByLocation = async () => {
        try {
            const { lat, lng } = await getCurrentLocation();
            await fetchRegionAndParkingData(lat, lng);
        } catch (error) {
            console.error("주차장 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    return {
        setParkingDataByRegion,
        getCurrentLocation,
        fetchRegionAndParkingData,
        setMapCenterRegion,
        showParkingDataByLocation,
    };
}
