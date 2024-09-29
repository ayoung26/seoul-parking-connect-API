import Header from "../components/layout/Header";
import styled from "styled-components";
import SearchBar from "../components/common/SearchBar";
import { List } from "../components/features/sideNavigation";
import MapContainer from "./../components/features/map/MapContainer";

// 전체 레이아웃 컨테이너 - PC와 모바일에서 다른 레이아웃 적용
const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
        flex-direction: row;
        height: 100vh;
    }
`;
// 좌측 리스트 영역 (PC 전용)
const LeftContainer = styled.div`
    @media (min-width: 1024px) {
        width: 500px;
        height: 100%;
    }
`;

// const MapContainer = styled.div``;

const HomePage = () => {
    const location = "송파구";

    return (
        <LayoutContainer>
            <LeftContainer>
                <Header />
                <SearchBar />
                <List location={location} />
                {/* <Favorites /> */}
            </LeftContainer>

            {/* 지도 영역 */}
            <MapContainer />
        </LayoutContainer>
    );
};

export default HomePage;
