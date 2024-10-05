export const fetchParkingData = async (
    startIdx: number,
    endIdx: number,
    addr?: string
) => {
    try {
        // (선택) 자치구명 검색
        const addrParam = addr ? `/${encodeURIComponent(addr)}` : "";

        const apiUrl =
            process.env.NODE_ENV === "development"
                ? import.meta.env.VITE_API_BASE_URL // 로컬 환경
                : "/api"; // Vercel 환경에서는 프록시된 /api 경로 사용
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
