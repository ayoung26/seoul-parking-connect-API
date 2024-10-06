import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../../../stores/AppStore";
import SearchBar from "../../common/SearchBar";

const FavoritesContainer = styled.div`
    position: relative;
    z-index: 100;
    background-color: #fff;
    margin-top: -50px;

    @media (min-width: 1024px) {
        margin-top: 0;
    }
`;

const ListContainer = styled.div<{ $isOpen: boolean }>`
    /* 상태에 따라 보이거나 숨김 */
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    z-index: 100;
    padding: 15px;
    overflow-y: auto;
    height: calc(100vh - 108px);

    @media (min-width: 1024px) {
        position: relative;
        display: block; /* 웹에서는 항상 노출 */
        height: calc(100vh - 125px);
    }

    /* 스크롤바 디자인 */
    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d5d5d5;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }
`;
const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;

    @media (min-width: 1024px) {
        font-size: 1.2rem;
    }
`;
const ClearButton = styled.button`
    color: #666;
    font-size: 0.9rem;
    cursor: pointer;
    text-align: right;

    &:hover {
        color: #f13c3c;
    }

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;
const RemoveButton = styled.img`
    width: 10px;
    height: 10px;
    cursor: pointer;

    @media (min-width: 1024px) {
        width: 10px;
        height: 10px;
    }
`;
const ListItem = styled.div`
    border-top: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    @media (min-width: 1024px) {
        padding: 20px 0;
    }
`;
const ListItemContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: 1024px) {
        gap: 0.8rem;
    }
`;
const Title = styled.h2`
    font-size: 1rem;
    color: #4395f6;
    margin-bottom: 10px;

    @media (min-width: 1024px) {
        font-size: 1.2rem;
    }
`;
const Description = styled.p`
    font-size: 0.8rem;
    color: #666;

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;
const DetailLink = styled.span`
    font-size: 0.7rem;
    color: #4395f6;

    @media (min-width: 1024px) {
        font-size: 0.9rem;
    }
`;

const NoListMessage = styled.p`
    text-align: center;
    font-size: 0.9rem;
    color: #999;
    margin-top: 20px;

    @media (min-width: 1024px) {
        font-size: 1rem;
        margin-top: 30px;
    }
`;

// const Spinner = styled.div`
//     margin: 20px auto;
//     width: 30px;
//     height: 30px;
//     border: 5px solid lightgray;
//     border-top: 5px solid #4395f6;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;

//     @keyframes spin {
//         0% {
//             transform: rotate(0deg);
//         }
//         100% {
//             transform: rotate(360deg);
//         }
//     }
// `;

const Favorites = () => {
    const {
        isFavoriteOpen,
        favoritesParkingData,
        removeFavoritesParkingData,
        clearFavoritesParkingData,
        setMapCenter,
        setMapLevel,
    } = useAppStore();

    // 검색 결과 상태 관리
    const [filteredFavorites, setFilteredFavorites] =
        useState(favoritesParkingData);

    // 검색 필터링 처리
    const handleSearch = (searchTerm: string) => {
        if (!searchTerm) {
            setFilteredFavorites(favoritesParkingData);
        } else {
            const filteredData = favoritesParkingData.filter(
                (parking) =>
                    parking.PKLT_NM.includes(searchTerm) ||
                    parking.ADDR.includes(searchTerm)
            );
            setFilteredFavorites(filteredData);
        }
    };

    // 주차장명 ㄱㄴㄷ 순으로 정렬
    const sortParkingData = filteredFavorites.sort((a, b) => {
        return a.PKLT_NM.localeCompare(b.PKLT_NM);
    });

    // 리스트 항목 클릭 시 지도 포커싱
    const handleListClick = (lat: number, lng: number) => {
        setMapCenter({ lat, lng });
        const markerZoomLevel = useAppStore.getState().markerZoomLevel;
        setMapLevel(markerZoomLevel);
    };

    return (
        <FavoritesContainer>
            <SearchBar context='favorites' onSearch={handleSearch} />
            <ListContainer as='section' $isOpen={isFavoriteOpen}>
                <ListHeader>
                    즐겨찾기
                    <ClearButton onClick={clearFavoritesParkingData}>
                        비우기
                    </ClearButton>
                </ListHeader>

                {/* 즐겨찾기 데이터가 없는 경우 */}
                {favoritesParkingData.length === 0 ? (
                    <NoListMessage>즐겨찾기가 없습니다.</NoListMessage>
                ) : /* 즐겨찾기 데이터는 있지만, 검색 결과가 없는 경우 */
                sortParkingData.length === 0 ? (
                    <NoListMessage>검색 결과가 없습니다.</NoListMessage>
                ) : (
                    sortParkingData.map((parking) => (
                        <ListItem
                            key={parking.PKLT_CD}
                            onClick={() =>
                                handleListClick(parking.LAT, parking.LOT)
                            }
                        >
                            <ListItemContent>
                                <Title>{parking.PKLT_NM}</Title>
                                <Description>
                                    {parking.ADDR} / {parking.PRK_TYPE_NM} /{" "}
                                    {parking.PAY_YN_NM} /{" "}
                                    {parking.BSC_PRK_CRG.toLocaleString()}원
                                </Description>
                                <Link to={`/detail/${parking.PKLT_CD}`}>
                                    <DetailLink>상세보기</DetailLink>
                                </Link>
                            </ListItemContent>
                            <RemoveButton
                                src='/closeIcon.png'
                                onClick={() =>
                                    removeFavoritesParkingData(parking.PKLT_CD)
                                }
                            />
                        </ListItem>
                    ))
                )}
                {/* {isLoading && <Spinner />} */}
            </ListContainer>
        </FavoritesContainer>
    );
};

export default Favorites;
