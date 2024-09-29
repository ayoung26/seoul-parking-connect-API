import styled from "styled-components";

const InfoContainer = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 1024px) {
        max-width: 900px;
        gap: 1.5rem;
    }
`;
const InfoTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 1.2rem;
        font-weight: bold;
    }

    @media (min-width: 1024px) {
        h2 {
            font-size: 1.5rem;
        }
    }
`;
const FavoriteButton = styled.button`
    cursor: pointer;
    img {
        width: 25px;
        height: 25px;

        @media (min-width: 1024px) {
            width: 35px;
            height: 35px;
        }
    }
`;
const UpdateInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px dotted #666;

    @media (min-width: 1024px) {
        padding-bottom: 20px;
    }
`;

// 정보 섹션
const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (min-width: 1024px) {
        gap: 1.5rem;
    }
`;
const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
`;
const InfoLabel = styled.span`
    font-size: 0.9rem;
    font-weight: bold;

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;
const InfoValue = styled.span`
    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;

// 요금 정보 테이블
const FeeTable = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    font-size: 0.9rem;
    align-items: center;
    text-align: center;
    background-color: #f5f5f5;
    padding: 15px 0;

    @media (min-width: 1024px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;
const FeeRow = styled.div`
    display: contents;
    @media (min-width: 1024px) {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`;
const FreeNotice = styled.div`
    font-size: 0.8rem;
    color: red;
    text-align: right;

    @media (min-width: 1024px) {
        font-size: 0.9rem;
    }
`;

const TimeSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const TimeRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;

const DetailContainer = () => {
    return (
        <InfoContainer>
            <InfoTitle>
                <h2>가락ID타워 주차장</h2>
                <FavoriteButton>
                    <img src='/public/favorite-active.png' alt='즐겨찾기' />
                </FavoriteButton>
            </InfoTitle>
            <UpdateInfo>
                정보 업데이트 <span>2024-09-12 11:01</span>
            </UpdateInfo>

            {/* 주차장 상세 정보 */}
            <InfoSection>
                <InfoRow>
                    <InfoLabel>종류</InfoLabel>
                    <InfoValue>노상</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>주소</InfoLabel>
                    <InfoValue>서울 송파구 중대로 105</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>전화번호</InfoLabel>
                    <InfoValue>02-123-1234</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>요금 정보</InfoLabel>
                    <InfoValue>유료</InfoValue>
                </InfoRow>
                <FeeTable>
                    <FeeRow>
                        <span>기본 금액</span>
                        <InfoValue>30,000원</InfoValue>
                    </FeeRow>
                    <FeeRow>
                        <span>추가 금액</span>
                        <InfoValue>30,000원</InfoValue>
                    </FeeRow>
                    <FeeRow>
                        <span>일 최대 금액</span>
                        <InfoValue>30,000원</InfoValue>
                    </FeeRow>
                </FeeTable>
                <FreeNotice>* 토요일 무료 / 공휴일 무료</FreeNotice>
                <InfoRow>
                    <InfoLabel>정기권 금액</InfoLabel>
                    <InfoValue>98,000원</InfoValue>
                </InfoRow>

                <InfoLabel>운영 시간</InfoLabel>
                <TimeSection>
                    <TimeRow>
                        <span>평일</span>
                        <InfoValue>05:00~23:00</InfoValue>
                    </TimeRow>
                    <TimeRow>
                        <span>토요일</span>
                        <InfoValue>05:00~23:00</InfoValue>
                    </TimeRow>
                    <TimeRow>
                        <span>일요일/공휴일</span>
                        <InfoValue>05:00~23:00</InfoValue>
                    </TimeRow>
                </TimeSection>
            </InfoSection>
        </InfoContainer>
    );
};

export default DetailContainer;
