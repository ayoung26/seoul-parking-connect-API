import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";
import FilterButtons from "../../common/FilterButtons";
import SearchButton from "../../common/SearchButton";
import LocationButton from "../../common/LocationButton";
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
    const { mapCenter, parkingData, mapLevel } = useAppStore();
    const { getCurrentLocation } = useMap();

    useEffect(() => {
        getCurrentLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledMapContainer>
            <FilterButtons />
            <Map
                center={mapCenter || { lat: 37.5665, lng: 126.978 }} // 기본값 (서울시청)
                style={{ width: "100%", height: "100vh" }} // 지도의 크기 설정
                level={mapLevel} // 확대 수준 설정
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
            <LocationButton />
            <SearchButton />
        </StyledMapContainer>
    );
};

export default MapContainer;
