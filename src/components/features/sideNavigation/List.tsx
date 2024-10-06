import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppStore } from "../../../stores/AppStore";
import SearchBar from "../../common/SearchBar";

const ListContainer = styled.div<{ $isListOpen: boolean }>`
    display: ${({ $isListOpen }) => ($isListOpen ? "block" : "none")};
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;

    @media (min-width: 1024px) {
        font-size: 1.2rem;
    }
`;

const ListItem = styled.div`
    border-top: 1px solid #d9d9d9;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 15px 0;

    @media (max-width: 1024px) {
        pointer-events: none; /* 모바일에서는 클릭 비활성화 */
    }

    @media (min-width: 1024px) {
        gap: 0.8rem;
        padding: 20px 0;
        cursor: pointer;
        pointer-events: auto; /* 데스크탑에서 클릭 활성화 */
    }

    &:last-child {
        border-bottom: none;
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
    pointer-events: auto;

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

const List = () => {
    const {
        isListOpen,
        regionInfo,
        filteredParkingData,
        setMapCenter,
        setMapLevel,
    } = useAppStore();

    // 주차장 코드 기준으로 그룹핑
    const groupParkingData = Array.from(
        new Map(
            filteredParkingData.map((item) => [item.PKLT_CD, item])
        ).values()
    );

    // 주차장명 ㄱㄴㄷ 순으로 정렬
    const sortParkingData = groupParkingData.sort((a, b) => {
        return a.PKLT_NM.localeCompare(b.PKLT_NM);
    });

    // 리스트 항목 클릭 시 지도 포커싱
    const handleListClick = (lat: number, lng: number) => {
        setMapCenter({ lat, lng });
        const markerZoomLevel = useAppStore.getState().markerZoomLevel;
        setMapLevel(markerZoomLevel);
    };

    return (
        <>
            <SearchBar context='list' />
            <ListContainer as='section' $isListOpen={isListOpen}>
                <ListHeader>{regionInfo} 근처 주차장이에요.</ListHeader>

                {/* 주차장 데이터가 없는 경우 */}
                {sortParkingData.length === 0 ? (
                    <NoListMessage>주차장 정보가 없습니다.</NoListMessage>
                ) : (
                    sortParkingData.map((parking, idx) => (
                        <ListItem
                            key={idx}
                            onClick={() =>
                                handleListClick(parking.LAT, parking.LOT)
                            }
                        >
                            <Title>{parking.PKLT_NM}</Title>
                            <Description>
                                {parking.ADDR} / {parking.PRK_TYPE_NM} /{" "}
                                {parking.PAY_YN_NM} /{" "}
                                {parking.BSC_PRK_CRG.toLocaleString()}원
                            </Description>
                            <Link to={`/detail/${parking.PKLT_CD}`}>
                                <DetailLink>상세보기</DetailLink>
                            </Link>
                        </ListItem>
                    ))
                )}

                {/* {isLoading && <Spinner />} */}
            </ListContainer>
        </>
    );
};

export default List;
