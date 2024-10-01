import styled from "styled-components";

const StyledLocationButton = styled.button`
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

    @media (min-width: 1024px) {
        width: 45px;
        height: 45px;
        bottom: 25px;
        left: 25px;
    }
`;

const LocationButton = () => {
    return (
        <StyledLocationButton>
            <img src='/public/locationIcon.png' alt='현위치로 이동' />
        </StyledLocationButton>
    );
};

export default LocationButton;
