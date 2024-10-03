import styled from "styled-components";

const StyledFavoriteButton = styled.button`
    position: absolute;
    top: 60px;
    right: 10px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;

    @media (min-width: 1024px) {
        width: 45px;
        height: 45px;
        top: 25px;
        right: 25px;
    }

    img {
        width: 20px;
        height: 20px;
        @media (min-width: 1024px) {
            width: 25px;
            height: 25px;
        }
    }
`;

const FavoriteButton = () => {
    return (
        <StyledFavoriteButton>
            <img src='/public/favorite-active.png' alt='즐겨찾기' />
        </StyledFavoriteButton>
    );
};

export default FavoriteButton;
