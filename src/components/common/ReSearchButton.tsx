import styled from "styled-components";
import useMap from "./../../hooks/useMap";
import { useAppStore } from "../../stores/AppStore";

const StyledReSearchButton = styled.button`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    color: #0875f5;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    padding: 7px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;

    @media (min-width: 1024px) {
        bottom: 25px;
        padding: 10px 20px;
    }

    img {
        width: 25px;
        margin-right: 10px;
    }
    span {
        font-size: 0.9rem;
        font-weight: bold;

        @media (min-width: 1024px) {
            font-size: 1rem;
        }
    }
`;

const ReSearchButton = () => {
    const mapCenter = useAppStore((state) => state.mapCenter);
    const { fetchRegionAndParkingData } = useMap();

    const handleReSearch = async () => {
        if (mapCenter)
            await fetchRegionAndParkingData(mapCenter.lat, mapCenter.lng);
    };

    return (
        <StyledReSearchButton onClick={handleReSearch}>
            <img src='/refrechIcon.png' alt='지도 검색' />
            <span>현 지도에서 검색</span>
        </StyledReSearchButton>
    );
};

export default ReSearchButton;
