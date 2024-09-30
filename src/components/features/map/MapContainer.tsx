import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";
import FilterButtons from "../../common/FilterButtons";

const StyledMapContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;

    background-color: lightblue;
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
        </StyledMapContainer>
    );
};

export default MapContainer;
