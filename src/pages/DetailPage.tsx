import styled from "styled-components";
import Header from "../components/layout/Header";
import DetailContainer from "../components/features/detail/DetailContainer";
import MapSingle from "../components/features/map/MapSingle";

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;

    @media (min-width: 1024px) {
        max-width: 900px;
        margin: auto;
    }
`;

const DetailPage = () => {
    return (
        <div>
            <Header />
            <LayoutContainer>
                <MapSingle />
                <DetailContainer />
            </LayoutContainer>
        </div>
    );
};

export default DetailPage;
