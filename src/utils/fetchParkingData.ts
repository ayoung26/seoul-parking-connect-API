import { API_BASE_URL, API_KEY } from "../constants/apiConstants";

export const fetchParkingData = async (
    startIdx: number,
    endIdx: number,
    addr?: string
) => {
    try {
        // (선택) 자치구명 검색
        const addrParam = addr ? `/${encodeURIComponent(addr)}` : "";

        const requestUrl = `${API_BASE_URL}/${API_KEY}/json/GetParkingInfo/${startIdx}/${endIdx}${addrParam}`;

        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new Error("API 요청이 실패했습니다.");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        return null;
    }
};

export default fetchParkingData;
