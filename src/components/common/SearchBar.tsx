import { useState } from "react";
import styled from "styled-components";
import useMap from "../../hooks/useMap";
import { useAppStore } from "../../stores/AppStore";
import regions from "../../../public/json/regions.json";

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 10px;
    margin: 0 15px 10px 15px;
    border: 1px solid #4395f6;

    @media (min-width: 1024px) {
        padding: 10px;
        margin: 0 15px;
    }
`;
const SearchIcon = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 10px;

    @media (min-width: 1024px) {
        width: 20px;
        height: 20px;
    }
`;
const SearchInput = styled.input`
    flex: 1; /* 가로로 전체 너비 차지 */
    border: none;
    outline: none;
    font-size: 0.9rem;
    background-color: transparent;
    color: #333;

    &::placeholder {
        color: #999;
    }

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.8rem;
    padding: 0 15px;
    margin: 5px 0 10px 0;

    @media (min-width: 1024px) {
        font-size: 1rem;
        margin: 5px 0;
    }
`;

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState(""); // 검색어
    const [errorMessage, setErrorMessage] = useState(""); // 에러메세지
    const { setParkingDataByRegion, setMapCenterRegion } = useMap();
    const { setParkingData, setRegionInfo, setIsListOpen, setMapLevel } =
        useAppStore();

    // 유효성 체크
    const validateSearchTerm = () => {
        return regions.includes(searchTerm);
    };

    // 검색 처리 (API 데이터 가져와서 리스트 반환 & 중심구로 지도 이동)
    const handleKeyDownSearch = async (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            if (validateSearchTerm()) {
                setErrorMessage("");

                // 지도 정보
                setMapCenterRegion(searchTerm);
                setRegionInfo(searchTerm);

                // 지도 확대 초기화
                const initialMapLevel = useAppStore.getState().initialMapLevel;
                setMapLevel(initialMapLevel);

                // 주차장 정보
                const parkingData = await setParkingDataByRegion(searchTerm);
                setParkingData(parkingData);

                // 모바일전용 : 리스트 오픈
                setIsListOpen(true);
            } else {
                setErrorMessage("자치구명을 올바르게 입력해주세요.");
            }
        }
    };

    return (
        <>
            <SearchContainer>
                <SearchIcon src='/searchIcon.png' alt='Search Icon' />
                <SearchInput
                    placeholder='자치구를 입력해주세요 (예) 강남구, 도봉구'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDownSearch}
                />
            </SearchContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </>
    );
};

export default SearchBar;
