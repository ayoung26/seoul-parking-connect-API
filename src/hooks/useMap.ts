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
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // 현재 위치 저장
                    setCurrentLocation({
                        lat: Number(latitude),
                        lng: Number(longitude),
                    });
                },
                (error) => {
                    console.error("현재 위치를 가져오는 중 오류 발생:", error);
                }
            );
        } else {
            console.error("현재 위치를 받아올 수 없습니다.");
        }
    };

    // 좌표로 자치구 정보 가져오기
    const getRegionInfo = (lat: number, lng: number) => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(lng, lat, (result, status) => {
            if (status === kakao.maps.services.Status.OK && result.length > 0) {
                const regionInfo = result[0]!.region_2depth_name;
                setRegionInfo(regionInfo);
            } else {
                console.error("자치구 정보를 가져오는 중 오류 발생");
            }
        });
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

    // TODO 중복코드 개선
    // 현재 위치한 자치구 내 주차장 정보 표시
    const showParkingDataByLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // 현재 위치 저장
                    setCurrentLocation({ lat: latitude, lng: longitude });

                    // 자치구 정보 가져오기
                    const geocoder = new kakao.maps.services.Geocoder();
                    geocoder.coord2RegionCode(
                        longitude,
                        latitude,
                        async (result, status) => {
                            if (
                                status === kakao.maps.services.Status.OK &&
                                result.length > 0
                            ) {
                                const regionInfo =
                                    result[0]!.region_2depth_name;
                                setRegionInfo(regionInfo);

                                // 중심지 설정
                                setMapCenterRegion(regionInfo);

                                // API 데이터 가져오기
                                const parkingData =
                                    await setParkingDataByRegion(regionInfo);
                                if (parkingData) {
                                    setParkingData(parkingData);
                                }
                            } else {
                                console.error(
                                    "행정구역 정보를 가져오는 중 오류 발생"
                                );
                            }
                        }
                    );
                },
                (error) => {
                    console.error("현재 위치를 가져오는 중 오류 발생:", error);
                }
            );
        } else {
            console.error("현재 위치를 받아올 수 없습니다.");
        }
    };

    return {
        setParkingDataByRegion,
        getCurrentLocation,
        getRegionInfo,
        setMapCenterRegion,
        showParkingDataByLocation,
    };
}
