import styled from "styled-components";
import Header from "../components/layout/Header";
import DetailContainer from "../components/features/detail/DetailContainer";
import MapSingle from "../components/features/map/MapSingle";
import { useParams } from "react-router-dom";
import { useAppStore } from "../stores/AppStore";

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    height: calc(100vh - 60px);

    @media (min-width: 1024px) {
        height: calc(100vh - 80px);
        max-width: 900px;
        margin: auto;
    }
`;

const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: calc(100vh - 60px);

    @media (min-width: 1024px) {
        height: calc(100vh - 80px);
    }
`;

const NotFoundMessage = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    @media (min-width: 1024px) {
        width: 100%;
    }
`;

const NotFoundTitle = styled.h2`
    font-size: 1rem;
    font-weight: bold;
    color: #666;
    margin-bottom: 10px;

    @media (min-width: 1024px) {
        font-size: 1.3rem;
    }
`;

const NotFoundDescription = styled.p`
    font-size: 0.8rem;
    color: #999;

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;

const NotFoundButton = styled.button`
    background-color: #4395f6;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 0.8rem;
    cursor: pointer;
    margin-top: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    @media (min-width: 1024px) {
        font-size: 1rem;
    }

    &:hover {
        background-color: #337ecf;
    }
`;

const DetailPage = () => {
    const { parkingId } = useParams();
    const { parkingData } = useAppStore();

    // 해당 주차장 정보 가져오기
    const parking = parkingData.find((data) => data.PKLT_CD === parkingId);

    // 주차장 찾을 수 없는 경우
    if (!parking) {
        return (
            <div>
                <Header />
                <NotFoundContainer>
                    <NotFoundMessage>
                        <NotFoundTitle>
                            주차장 정보를 찾을 수 없습니다.
                        </NotFoundTitle>
                        <NotFoundDescription>
                            다른 주차장을 선택해주세요.
                        </NotFoundDescription>
                        <NotFoundButton onClick={() => window.history.back()}>
                            돌아가기
                        </NotFoundButton>
                    </NotFoundMessage>
                </NotFoundContainer>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <LayoutContainer>
                <MapSingle lat={parking.LAT} lng={parking.LOT} />
                <DetailContainer parking={parking} />
            </LayoutContainer>
        </div>
    );
};

export default DetailPage;
