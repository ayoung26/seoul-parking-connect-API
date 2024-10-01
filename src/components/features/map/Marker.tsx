import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";

const StyledMarker = styled.div`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    padding: 20px;
    font-size: 0.9rem;
    color: #666;
    max-width: 500px;
    width: 250px;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    position: relative;

    @media (min-width: 1024px) {
        width: 300px;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 10px;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
        filter: drop-shadow(-3px 3px 5px rgba(0, 0, 0, 0.3));
    }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h3 {
        font-size: 1rem;
        font-weight: bold;
        color: #4395f6;

        @media (min-width: 1024px) {
            font-size: 1.2rem;
        }
    }

    p {
        font-size: 0.8rem;

        @media (min-width: 1024px) {
            font-size: 1rem;
        }

        &:nth-of-type(2) {
            color: #4395f6;
            font-weight: bold;
        }
        &:last-of-type {
            font-size: 0.7rem;
            @media (min-width: 1024px) {
                font-size: 0.9rem;
            }
        }
    }

    span {
        font-size: 0.75rem;
        color: #4395f6;
        cursor: pointer;
        align-self: flex-end;
        @media (min-width: 1024px) {
            font-size: 0.9rem;
        }
    }
`;

const FavoriteButton = styled.button`
    cursor: pointer;
    img {
        width: 25px;
        height: 25px;

        @media (min-width: 1024px) {
            width: 35px;
            height: 35px;
        }
    }
`;

const Marker = () => {
    return (
        <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
            <StyledMarker>
                <div>
                    <h3>가락타워 주차장</h3>
                    <FavoriteButton>
                        <img src='/public/favoriteIcon.png' alt='즐겨찾기' />
                    </FavoriteButton>
                </div>
                <p>서울 송파구 가락동</p>
                <p>현재 주차 가능 6대</p>
                <p>노상 / 기본요금 9000원</p>
                <span>상세보기</span>
            </StyledMarker>
        </CustomOverlayMap>
    );
};

export default Marker;
