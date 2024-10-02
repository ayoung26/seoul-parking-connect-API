import styled from "styled-components";
import { useAppStore } from "../../../stores/AppStore";

const ListContainer = styled.div<{ $isOpen: boolean }>`
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    padding: 15px;
    overflow-y: auto;
    max-height: 80vh;

    @media (min-width: 1024px) {
        display: block; /* 웹에서는 항상 노출 */
    }
`;
const ListHeader = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;

    @media (min-width: 1024px) {
        font-size: 1.2rem;
    }
`;

const ListItem = styled.div`
    border-top: 1px solid #d9d9d9;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 15px 0;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    @media (min-width: 1024px) {
        gap: 0.8rem;
        padding: 20px 0;
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
// const Spinner = styled.div`
//     margin: 20px auto;
//     width: 30px;
//     height: 30px;
//     border: 5px solid lightgray;
//     border-top: 5px solid #4395f6;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;

//     @keyframes spin {
//         0% {
//             transform: rotate(0deg);
//         }
//         100% {
//             transform: rotate(360deg);
//         }
//     }
// `;

const List = () => {
    const isListOpen = useAppStore((state) => state.isListOpen);
    const { regionInfo, parkingData } = useAppStore();

    // 주차장 코드 기준으로 그룹핑
    const groupParkingData = Array.from(
        new Map(parkingData.map((item) => [item.PKLT_CD, item])).values()
    );

    // 주차장명 ㄱㄴㄷ 순으로 정렬
    const sortParkingData = groupParkingData.sort((a, b) => {
        return a.PKLT_NM.localeCompare(b.PKLT_NM);
    });

    return (
        <ListContainer as='section' $isOpen={isListOpen}>
            <ListHeader>{regionInfo} 근처 주차장이에요.</ListHeader>

            {sortParkingData.map((parking, idx) => (
                <ListItem key={idx}>
                    <Title>{parking.PKLT_NM}</Title>
                    <Description>
                        {parking.ADDR} / {parking.PRK_TYPE_NM} /{" "}
                        {parking.PAY_YN_NM} / {parking.BSC_PRK_CRG}원
                    </Description>
                    <DetailLink href={"#"}>상세보기</DetailLink>
                </ListItem>
            ))}

            {/* {isLoading && <Spinner />} */}
        </ListContainer>
    );
};

export default List;
