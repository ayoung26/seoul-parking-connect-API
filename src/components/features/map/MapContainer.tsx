import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";
import FilterButtons from "../../common/FilterButtons";
import SearchButton from "../../common/SearchButton";
import CurrentMoveButton from "../../common/CurrentMoveButton";
import FavoriteButton from "../../common/FavoriteButton";
import { useAppStore } from "../../../stores/AppStore";
import useMap from "../../../hooks/useMap";
import { useEffect } from "react";
import Marker from "./Marker";

const StyledMapContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 100vh;

    background-color: lightblue;

    @media (min-width: 1024px) {
        height: 100vh;
    }
`;

const MapContainer = () => {
    const { mapCenter, parkingData, mapLevel, setMapCenter } = useAppStore();
    const { showParkingDataByLocation } = useMap();

    useEffect(() => {
        showParkingDataByLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                {parkingData.map((parking, idx) => (
                    <Marker
                        key={idx}
                        position={{ lat: parking.LAT, lng: parking.LOT }}
                        parking={parking}
                    ></Marker>
                ))}
            </Map>
            <FavoriteButton />
            <CurrentMoveButton />
            <SearchButton />
        </StyledMapContainer>
    );
};

export default MapContainer;
