import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

const StyledMapSingle = styled.div`
    background-color: aliceblue;
    height: 200px;

    @media (min-width: 1024px) {
        height: 250px;
    }
`;

const MapSingle = ({ lat, lng }: { lat: number; lng: number }) => {
    return (
        <StyledMapSingle>
            <Map
                center={{ lat, lng }}
                style={{ width: "100%", height: "100%" }}
            >
                <MapMarker
                    position={{ lat, lng }}
                    clickable={true} // 클릭 가능 여부
                    image={{
                        src: "/markerIcon.png", // 마커 아이콘
                        size: { width: 30, height: 38 },
                    }}
                />
            </Map>
        </StyledMapSingle>
    );
};

export default MapSingle;
