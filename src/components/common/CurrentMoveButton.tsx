import styled from "styled-components";
import useMap from "../../hooks/useMap";
import { useAppStore } from "./../../stores/AppStore";

const StyledCurrentMoveButton = styled.button`
    position: absolute;
    left: 20px;
    bottom: 20px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d5d5d5;
    cursor: pointer;
    z-index: 10;

    @media (min-width: 1024px) {
        width: 45px;
        height: 45px;
        bottom: 25px;
        left: 25px;
    }
`;

const CurrentMoveButton = () => {
    const { setMapCenter } = useAppStore();
    const { getCurrentLocation } = useMap();
    const handleCurrentMove = async () => {
        const currentLocation = await getCurrentLocation();
        // 지도 중심을 현재 위치로 설정
        setMapCenter(currentLocation);
    };

    return (
        <StyledCurrentMoveButton onClick={handleCurrentMove}>
            <img src='/public/locationIcon.png' alt='현위치로 이동' />
        </StyledCurrentMoveButton>
    );
};

export default CurrentMoveButton;
