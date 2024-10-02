import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { ParkingData } from "../../../stores/parkingDataTypes";

const StyledOverlay = styled.div`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    padding: 25px 20px;
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
        /* word-wrap: break-word; */
        white-space: normal;

        @media (min-width: 1024px) {
            font-size: 1.1rem;
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
        width: 15px;
        height: 15px;

        @media (min-width: 1024px) {
            width: 20px;
            height: 20px;
        }
    }
`;

const Marker = ({
    position,
    parking,
}: {
    position: { lat: number; lng: number };
    parking: ParkingData;
}) => {
    const [isOpen, setIsOpen] = useState(false); // 상태 추가

    return (
        <>
            <MapMarker
                position={position}
                clickable={true} // 클릭 가능 여부
                onClick={() => setIsOpen(!isOpen)} // 클릭 시 상태 변경
                image={{
                    src: "/public/markerIcon.png", // 마커 아이콘
                    size: { width: 24, height: 35 },
                }}
            />
            {isOpen && ( // isOpen이 true일 때만 CustomOverlayMap 렌더링
                <CustomOverlayMap
                    position={position}
                    zIndex={100}
                    xAnchor={0.5}
                    yAnchor={1.25}
                >
                    <StyledOverlay>
                        <img
                            alt='close'
                            width='10'
                            height='10'
                            src='/public/closeIcon.png'
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "10px",
                                cursor: "pointer",
                            }}
                            onClick={() => setIsOpen(false)} // 닫기 버튼 클릭 시 오버레이 닫힘
                        />
                        <div>
                            <h3>{parking.PKLT_NM}</h3>
                            <FavoriteButton>
                                <img
                                    src='/public/favorite-active.png'
                                    alt='즐겨찾기'
                                />
                            </FavoriteButton>
                        </div>
                        <p>{parking.ADDR}</p>
                        <p>현재 주차 가능 {parking.NOW_PRK_VHCL_CNT}대</p>
                        <p>
                            {parking.PRK_TYPE_NM} / 기본요금{" "}
                            {parking.BSC_PRK_CRG}원
                        </p>
                        <span>상세보기</span>
                    </StyledOverlay>
                </CustomOverlayMap>
            )}
        </>
    );
};

export default Marker;
