// API 통신을 위한 서비스 로직
import { fetchParkingData } from "./../utils/fetchParkingData";

// 주차장 데이터 가져오기
export const getParkingData = async (
    startIdx: number,
    endIdx: number,
    addr?: string
) => {
    try {
        const data = await fetchParkingData(startIdx, endIdx, addr);

        if (data.RESULT && data.RESULT.CODE === "INFO-200") {
            console.error(data.RESULT.MESSAGE);
            return [];
        }

        const rowData = data ? data.GetParkingInfo.row : null;

        return rowData;
    } catch (error) {
        console.error("주차장 데이터를 가져오는 중 오류 발생:", error);
        return null;
    }
};
