import styled from "styled-components";

const StyledSearchButton = styled.button`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    color: #0875f5;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    padding: 7px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (min-width: 1024px) {
        bottom: 25px;
        padding: 10px 20px;
    }

    img {
        width: 25px;
        margin-right: 10px;
    }
    span {
        font-size: 0.9rem;
        font-weight: bold;

        @media (min-width: 1024px) {
            font-size: 1rem;
        }
    }
`;

const SearchButton = () => {
    return (
        <StyledSearchButton>
            <img src='/public/refrechIcon.png' alt='지도 검색' />
            <span>현 지도에서 검색</span>
        </StyledSearchButton>
    );
};

export default SearchButton;
