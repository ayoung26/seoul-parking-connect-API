import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
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
    width: 20px;
    height: auto;
    cursor: pointer;
`;

const IconButtonWrapper = styled.div`
    display: none;
    user-select: none;

    @media (min-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    img {
        width: 15px;
        height: auto;
    }
    span {
        font-size: 0.9rem;
        color: #666;
        margin-top: 5px;
    }
`;

const Header = () => {
    const {
        isListOpen,
        isListView,
        isFavoriteOpen,
        isFavoriteView,
        setIsListOpen,
        setIsFavoriteOpen,
        toggleListView,
        toggleFavoriteView,
    } = useAppStore();

    const navigate = useNavigate();

    // 모바일 환경 감지
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        // 초기 로드 시 모바일 여부 확인
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const location = useLocation();
    // 리스트/즐겨찾기 아이콘 노출
    const showListOrFavoriteIcon =
        (isListView || isFavoriteView) &&
        !location.pathname.includes("/detail");

    // 리스트/즐겨찾기 아이콘 클릭 시 처리
    const handleHeadIconClick = () => {
        toggleFavoriteView();
        toggleListView();
    };

    // 지도 아이콘 클릭 시 처리
    const handleMapIconClick = () => {
        if (location.pathname.includes("/detail")) {
            navigate("/");
            navigate("/", { state: { fromDetail: true } });
        } else if (isListOpen) {
            setIsListOpen(false);
        } else if (isFavoriteOpen) {
            setIsFavoriteOpen(false);
            toggleFavoriteView(); // 모바일 처리용
        }
    };

    // 지도 아이콘 노출
    const showMapIcon =
        location.pathname.includes("/detail") || // 상세페이지
        (isMobile && (isListOpen || isFavoriteOpen)); // 모바일환경에서 리스트나 즐겨찾기 오픈한 경우

    return (
        <HeaderContainer>
            <LogoWrap>
                <Link to={`/`}>
                    <Logo src='/logo.png' alt='Logo' />
                </Link>
                <Title>주차자리요</Title>
            </LogoWrap>

            {showListOrFavoriteIcon && (
                <IconButtonWrapper onClick={handleHeadIconClick}>
                    <img
                        src={
                            isListView
                                ? "/favorite-active.png" // 리스트가 열려 있으면 즐겨찾기 아이콘
                                : "/listIcon.png" // 즐겨찾기가 열려 있으면 리스트 아이콘
                        }
                    />
                    <span>{isListView ? "즐겨찾기" : "리스트"}</span>
                </IconButtonWrapper>
            )}

            {showMapIcon && (
                <MapIcon
                    src='/mapIcon.png'
                    alt='mapIcon'
                    onClick={handleMapIconClick}
                />
            )}
        </HeaderContainer>
    );
};

export default Header;
