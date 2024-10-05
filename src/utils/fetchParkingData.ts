export const fetchParkingData = async (
    startIdx: number,
    endIdx: number,
    addr?: string
) => {
    try {
        // (선택) 자치구명 검색
        const addrParam = addr ? `/${encodeURIComponent(addr)}` : "";

        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const apiKey = import.meta.env.VITE_API_KEY;

        if (!apiUrl || !apiKey) {
            throw new Error("API URL 또는 API KEY가 설정되지 않았습니다.");
        }

        const requestUrl = `${apiUrl}/${apiKey}/json/GetParkingInfo/${startIdx}/${endIdx}${addrParam}`;

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
