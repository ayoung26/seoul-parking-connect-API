import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../../stores/AppStore";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 60px;

    @media (min-width: 1024px) {
        position: static;
        height: 80px;
        padding: 0 20px;
    }
`;

const LogoWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 30px;
    height: auto;
    margin-right: 10px;

    @media (min-width: 1024px) {
        width: 40px;
    }
`;

const Title = styled.h1`
    font-size: 1.2rem;
    font-weight: bold;
    color: #666;

    @media (min-width: 1024px) {
        font-size: 1.5rem;
    }
`;

const MapIcon = styled.img`
    display: block;
    width: 20px;
    height: auto;
`;

const Header = () => {
    const { isListOpen, toggleList } = useAppStore();
    const location = useLocation();
    const showMapIcon = isListOpen || location.pathname === "/detail"; // 상세 페이지

    return (
        <HeaderContainer>
            <LogoWrap>
                <Logo src='/public/logo.png' alt='Logo' />
                <Title>주차자리요</Title>
            </LogoWrap>
            {showMapIcon && (
                <MapIcon
                    src='/public/mapIcon.png'
                    alt='mapIcon'
                    onClick={toggleList}
                />
            )}
        </HeaderContainer>
    );
};

export default Header;
