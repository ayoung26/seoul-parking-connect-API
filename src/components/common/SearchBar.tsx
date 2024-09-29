import styled from "styled-components";

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 15px;
    border: 1px solid #4395f6;

    @media (min-width: 1024px) {
        padding: 10px;
        margin: 10px 15px;
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

const SearchBar = () => {
    return (
        <SearchContainer>
            <SearchIcon src='/public/searchIcon.png' alt='Search Icon' />
            <SearchInput placeholder='자치구를 입력해주세요 (예) 강남구, 도봉구' />
        </SearchContainer>
    );
};

export default SearchBar;
