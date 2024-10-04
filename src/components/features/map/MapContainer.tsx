import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";
import FilterButtons from "../../common/FilterButtons";
import ReSearchButton from "../../common/ReSearchButton";
import CurrentMoveButton from "../../common/CurrentMoveButton";
import FavoriteButton from "../../common/FavoriteButton";
import { useAppStore } from "../../../stores/AppStore";
import useMap from "../../../hooks/useMap";
import { useEffect, useMemo } from "react";
import Marker from "./Marker";

const StyledMapContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 100vh;

    @media (min-width: 1024px) {
        height: 100vh;
    }
`;

const MapContainer = () => {
    const { mapCenter, parkingData, mapLevel, setMapCenter, activeFilters } =
        useAppStore();
    const { showParkingDataByLocation } = useMap();

    useEffect(() => {
        showParkingDataByLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 필터링된 주차장 데이터 메모이제이션
    const filteredParkingData = useMemo(() => {
        return parkingData.filter((parking) => {
            const filterConditions = [];

            if (activeFilters.paid) {
                filterConditions.push(parking.PAY_YN === "Y");
            }
            if (activeFilters.free) {
                filterConditions.push(parking.PAY_YN === "N");
            }
            if (activeFilters.onStreet) {
                filterConditions.push(parking.PRK_TYPE_NM.includes("노상"));
            }
            if (activeFilters.offStreet) {
                filterConditions.push(parking.PRK_TYPE_NM.includes("노외"));
            }
            if (activeFilters.available) {
                filterConditions.push(parking.NOW_PRK_VHCL_CNT > 0);
            }

            return filterConditions.every((filteringData) => filteringData);
        });
    }, [parkingData, activeFilters]);

    // 현 위치 이동을 위해 지도 중심 좌표를 저장
    const updateMapCenter = (map: kakao.maps.Map) => {
        const latlng = map.getCenter();
        setMapCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
    };

    return (
        <StyledMapContainer>
            <FilterButtons />
            <Map
                center={mapCenter || { lat: 37.5665, lng: 126.978 }} // 기본값 (서울시청)
                style={{ width: "100%", height: "100vh" }} // 지도의 크기 설정
                level={mapLevel} // 확대 수준 설정
                isPanto={true} // 부드럽게 이동
                onCenterChanged={updateMapCenter}
            >
                {filteredParkingData.map((parking, idx) => (
                    <Marker
                        key={idx}
                        position={{ lat: parking.LAT, lng: parking.LOT }}
                        parking={parking}
                    ></Marker>
                ))}
            </Map>
            <FavoriteButton />
            <CurrentMoveButton />
            <ReSearchButton />
        </StyledMapContainer>
    );
};

export default MapContainer;
