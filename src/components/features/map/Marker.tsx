import { Link } from "react-router-dom";
import { CustomOverlayMap, MapMarker, useMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { ParkingData } from "../../../stores/parkingDataTypes";
import { useAppStore } from "../../../stores/AppStore";

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
    cursor: auto;

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
    isOpen,
    setOpenMarkerId,
}: {
    position: { lat: number; lng: number };
    parking: ParkingData;
    isOpen: boolean;
    setOpenMarkerId: (id: string | null) => void;
}) => {
    const map = useMap(); // 지도객체 가져오기

    const {
        favoritesParkingData,
        addFavoritesParkingData,
        removeFavoritesParkingData,
    } = useAppStore();

    // 즐겨찾기 여부 확인
    const isFavorite = favoritesParkingData.some(
        (item) => item.PKLT_CD === parking.PKLT_CD
    );

    // 즐겨찾기 버튼 클릭 핸들러
    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavoritesParkingData(parking.PKLT_CD); // 즐겨찾기 해제
        } else {
            addFavoritesParkingData(parking); // 즐겨찾기 추가
        }
    };

    // 오버레이 클릭 핸들러
    const handleOverlayClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // 오버레이 내부 클릭 시 닫힘 방지
    };

    // 마커 클릭 핸들러
    const handleMarkerClick = (marker: kakao.maps.Marker) => {
        setOpenMarkerId(isOpen ? null : `${parking.LAT}-${parking.LOT}`); // 오버레이 제어
        map.panTo(marker.getPosition()); // 마커 위치로 지도 이동
    };

    return (
        <>
            <MapMarker
                position={position}
                clickable={true}
                onClick={handleMarkerClick}
                image={{
                    src: "/markerIcon.png", // 마커 아이콘
                    size: { width: 30, height: 38 },
                }}
            />
            {isOpen && ( // isOpen이 true일 때만 CustomOverlayMap 렌더링
                <CustomOverlayMap
                    position={position}
                    zIndex={100}
                    xAnchor={0.5}
                    yAnchor={1.25}
                >
                    {/* 오버레이 클릭 시 닫힘 */}
                    <StyledOverlay onClick={() => setOpenMarkerId(null)}>
                        <div onClick={handleOverlayClick}>
                            <h3>{parking.PKLT_NM}</h3>
                            <FavoriteButton onClick={handleFavoriteClick}>
                                <img
                                    src={
                                        isFavorite
                                            ? "/favorite-active.png"
                                            : "/favorite-non-active.png"
                                    }
                                    alt='즐겨찾기'
                                />
                            </FavoriteButton>
                        </div>
                        <p>{parking.ADDR}</p>
                        <p>현재 주차 가능 {parking.NOW_PRK_VHCL_CNT}대</p>
                        <p>
                            {parking.PRK_TYPE_NM} / 기본요금{" "}
                            {parking.BSC_PRK_CRG.toLocaleString()}원
                        </p>
                        <Link to={`/detail/${parking.PKLT_CD}`}>
                            <span>상세보기</span>
                        </Link>
                    </StyledOverlay>
                </CustomOverlayMap>
            )}
        </>
    );
};

export default Marker;
