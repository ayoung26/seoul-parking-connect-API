import Header from "../components/layout/Header";
import styled from "styled-components";
import SearchBar from "../components/common/SearchBar";
import { List } from "../components/features/sideNavigation";
import MapContainer from "./../components/features/map/MapContainer";

// 전체 레이아웃 컨테이너 - PC와 모바일에서 다른 레이아웃 적용
const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    @media (min-width: 1024px) {
        flex-direction: row;
    }
`;
// 좌측 리스트 영역 (pc전용)
const LeftContainer = styled.div`
    @media (min-width: 1024px) {
        width: 650px;
        height: 100%;
    }
`;

const HomePage = () => {
    return (
        <LayoutContainer>
            <LeftContainer>
                <Header />
                <SearchBar />
                <List />
                {/* <Favorites /> */}
            </LeftContainer>

            <MapContainer />
        </LayoutContainer>
    );
};

export default HomePage;
