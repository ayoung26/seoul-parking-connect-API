import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";
import FilterButtons from "../../common/FilterButtons";
import SearchButton from "../../common/SearchButton";
import LocationButton from "../../common/LocationButton";
import FavoriteButton from "../../common/FavoriteButton";

const StyledMapContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 118px);

    background-color: lightblue;

    @media (min-width: 1024px) {
        height: 100vh;
    }
`;

const MapContainer = () => {
    return (
        <StyledMapContainer>
            <FilterButtons />
            <Map
                center={{ lat: 33.5563, lng: 126.79581 }} // 중심 좌표 설정
                style={{ width: "100%", height: "100%" }} // 지도의 크기 설정
                level={3} // 확대 수준 설정
            ></Map>
            <FavoriteButton />
            <LocationButton />
            <SearchButton />
        </StyledMapContainer>
    );
};

export default MapContainer;
