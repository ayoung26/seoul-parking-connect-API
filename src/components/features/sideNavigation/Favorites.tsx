import styled from "styled-components";
import { useAppStore } from "../../../stores/AppStore";

const ListContainer = styled.div<{ $isOpen: boolean }>`
    /* 상태에 따라 보이거나 숨김 */
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    padding: 15px;
    overflow-y: auto;

    @media (min-width: 1024px) {
        display: block; /* 웹에서는 항상 노출 */
    }
`;
const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;

    @media (min-width: 1024px) {
        font-size: 1.2rem;
    }
`;
const ClearButton = styled.button`
    color: #666;
    font-size: 0.9rem;
    cursor: pointer;
    text-align: right;

    &:hover {
        color: red;
    }

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;
const RemoveButton = styled.button`
    color: #666;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        color: red;
    }

    @media (min-width: 1024px) {
        font-size: 1.5rem;
    }
`;
const ListItem = styled.div`
    border-top: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    @media (min-width: 1024px) {
        padding: 20px 0;
    }
`;
const ListItemContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: 1024px) {
        gap: 0.8rem;
    }
`;
const Title = styled.h2`
    font-size: 1rem;
    color: #4395f6;
    margin-bottom: 10px;

    @media (min-width: 1024px) {
        font-size: 1.2rem;
    }
`;
const Description = styled.p`
    font-size: 0.8rem;
    color: #666;

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;
const DetailLink = styled.a`
    font-size: 0.7rem;
    color: #4395f6;

    @media (min-width: 1024px) {
        font-size: 0.9rem;
    }
`;
const Spinner = styled.div`
    margin: 20px auto;
    width: 30px;
    height: 30px;
    border: 5px solid lightgray;
    border-top: 5px solid #4395f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
const Favorites = () => {
    const isListOpen = useAppStore((state) => state.isListOpen);

    // 예시 데이터
    const items = [
        {
            id: 1,
            title: "효원빌딩주차장",
            description: "서울 송파구 가락동 / 노상 / 기본요금 9000원",
            link: "#",
        },
        {
            id: 2,
            title: "가락ID타워 주차장",
            description: "서울 송파구 가락동 / 노상 / 무료 / 야간",
            link: "#",
        },
        {
            id: 3,
            title: "효원빌딩주차장",
            description: "서울 송파구 가락동 / 노상 / 기본요금 9000원",
            link: "#",
        },
        {
            id: 4,
            title: "가락ID타워 주차장",
            description: "서울 송파구 가락동 / 노상 / 무료 / 야간",
            link: "#",
        },
    ];

    const handleRemoveItem = (id: number) => {
        // 아이템 삭제 로직 구현
        console.log(id);
    };

    const handleClearList = () => {
        // 즐겨찾기 비우기 로직 구현
    };

    return (
        <ListContainer as='section' $isOpen={isListOpen}>
            <ListHeader>
                즐겨찾기
                <ClearButton onClick={handleClearList}>비우기</ClearButton>
            </ListHeader>

            {items.map((item) => (
                <ListItem key={item.id}>
                    <ListItemContent>
                        <Title>{item.title}</Title>
                        <Description>{item.description}</Description>
                        <DetailLink href={item.link}>상세보기</DetailLink>
                    </ListItemContent>
                    <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                        ×
                    </RemoveButton>
                </ListItem>
            ))}

            {/* {isLoading && <Spinner />} */}
            <Spinner />
        </ListContainer>
    );
};

export default Favorites;
