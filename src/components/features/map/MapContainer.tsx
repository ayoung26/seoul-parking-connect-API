import styled from "styled-components";
import FilterButtons from "../../common/FilterButtons";

const StyledMapContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;

    background-color: lightblue;
`;

const MapContainer = () => {
    return (
        <StyledMapContainer>
            <FilterButtons />
        </StyledMapContainer>
    );
};

export default MapContainer;
