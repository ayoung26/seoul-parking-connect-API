import styled from "styled-components";
import FilterButtons from "../../common/FilterButtons";
import SearchButton from "../../common/SearchButton";
import LocationButton from "../../common/LocationButton";
import FavoriteButton from "../../common/FavoriteButton";

const StyledMapContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 118px);

    background-color: lightblue;

    @media (min-width: 1024px) {
        height: 100vh;
    }
`;

const MapContainer = () => {
    return (
        <StyledMapContainer>
            <FilterButtons />
            <FavoriteButton />
            <LocationButton />
            <SearchButton />
        </StyledMapContainer>
    );
};

export default MapContainer;
