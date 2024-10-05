import styled from "styled-components";
import { ParkingData } from "../../../stores/parkingDataTypes";
import { useAppStore } from "../../../stores/AppStore";

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
    border-radius: 50%;
    background-color: #fff;
    width: 30px;
    height: 30px;

    @media (min-width: 1024px) {
        width: 40px;
        height: 40px;
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

const DetailContainer = ({ parking }: { parking: ParkingData }) => {
    const {
        favoritesParkingData,
        addFavoritesParkingData,
        removeFavoritesParkingData,
    } = useAppStore();

    // 즐겨찾기 여부 확인
    const isFavorite = favoritesParkingData.some(
        (item) => item.PKLT_CD === parking.PKLT_CD
    );

    // 즐겨찾기 버튼 클릭 핸들러
    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavoritesParkingData(parking.PKLT_CD); // 즐겨찾기 해제
        } else {
            addFavoritesParkingData(parking); // 즐겨찾기 추가
        }
    };

    // 시간 형식 변경
    const formatTime = (time: string) => {
        const timeString = time.padStart(4, "0");
        const hours = timeString.slice(0, 2);
        const minutes = timeString.slice(2, 4);

        return `${hours}:${minutes}`;
    };
    // 정기권 빈값 변경
    const formattedPRD_AMT = parking.PRD_AMT
        ? Number(parking.PRD_AMT).toLocaleString()
        : "0";

    return (
        <InfoContainer>
            <InfoTitle>
                <h2>{parking.PKLT_NM}</h2>
                <FavoriteButton onClick={handleFavoriteClick}>
                    <img
                        src={
                            isFavorite
                                ? "/public/favorite-active.png"
                                : "/public/favorite-non-active.png"
                        }
                        alt='즐겨찾기'
                    />
                </FavoriteButton>
            </InfoTitle>
            <UpdateInfo>
                정보 업데이트 <span>{parking.NOW_PRK_VHCL_UPDT_TM}</span>
            </UpdateInfo>

            {/* 주차장 상세 정보 */}
            <InfoSection>
                <InfoRow>
                    <InfoLabel>종류</InfoLabel>
                    <InfoValue>{parking.PRK_TYPE_NM}</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>주소</InfoLabel>
                    <InfoValue>{parking.ADDR}</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>전화번호</InfoLabel>
                    <InfoValue>{parking.TELNO}</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>요금 정보</InfoLabel>
                    <InfoValue>{parking.PAY_YN_NM}</InfoValue>
                </InfoRow>
                {/* 유료인 경우에만 FeeTable 노출 */}
                {parking.PAY_YN === "Y" && (
                    <FeeTable>
                        <FeeRow>
                            <span>기본 금액</span>
                            <InfoValue>
                                {parking.BSC_PRK_CRG.toLocaleString()}원
                            </InfoValue>
                        </FeeRow>
                        <FeeRow>
                            <span>추가 금액</span>
                            <InfoValue>
                                {parking.ADD_PRK_CRG.toLocaleString()}원
                            </InfoValue>
                        </FeeRow>
                        <FeeRow>
                            <span>일 최대 금액</span>
                            <InfoValue>
                                {parking.DAY_MAX_CRG.toLocaleString()}원
                            </InfoValue>
                        </FeeRow>
                    </FeeTable>
                )}
                {(parking.SAT_CHGD_FREE_NM === "무료" ||
                    parking.LHLDY_CHGD_FREE_SE_NAME === "무료") && (
                    <FreeNotice>
                        * 토요일 {parking.SAT_CHGD_FREE_NM} / 공휴일{" "}
                        {parking.LHLDY_CHGD_FREE_SE_NAME}
                    </FreeNotice>
                )}
                <InfoRow>
                    <InfoLabel>정기권 금액</InfoLabel>
                    <InfoValue>{formattedPRD_AMT}원</InfoValue>
                </InfoRow>

                <InfoLabel>운영 시간</InfoLabel>
                <TimeSection>
                    <TimeRow>
                        <span>평일</span>
                        <InfoValue>
                            {formatTime(parking.WD_OPER_BGNG_TM)} ~{" "}
                            {formatTime(parking.WD_OPER_END_TM)}
                        </InfoValue>
                    </TimeRow>
                    <TimeRow>
                        <span>주말</span>
                        <InfoValue>
                            {formatTime(parking.WE_OPER_BGNG_TM)} ~{" "}
                            {formatTime(parking.WE_OPER_END_TM)}
                        </InfoValue>
                    </TimeRow>
                    <TimeRow>
                        <span>공휴일</span>
                        <InfoValue>
                            {formatTime(parking.LHLDY_OPER_BGNG_TM)} ~{" "}
                            {formatTime(parking.LHLDY_OPER_END_TM)}
                        </InfoValue>
                    </TimeRow>
                </TimeSection>
            </InfoSection>
        </InfoContainer>
    );
};

export default DetailContainer;
