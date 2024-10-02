export interface ParkingData {
    PKLT_CD: string; //주차장코드
    PKLT_NM: string; //주차장명
    ADDR: string; //주소
    PKLT_TYPE: string; //주차장 종류
    PRK_TYPE_NM: string; //주차장 종류명
    OPER_SE: string; //운영구분
    OPER_SE_NM: string; //운영구분명
    TELNO: string; //전화번호
    PRK_STTS_YN: string; //주차현황 정보 제공여부
    PRK_STTS_NM: string; //주차현황 정보 제공여부명
    TPKCT: number; //총 주차면
    NOW_PRK_VHCL_CNT: number; //현재 주차 차량수
    NOW_PRK_VHCL_UPDT_TM: string; //현재 주차 차량수 업데이트 시간
    PAY_YN: string; //유무료구분
    PAY_YN_NM: string; //유무료구분명
    NGHT_PAY_YN: string; //야간무료개방여부
    NGHT_PAY_YN_NM: string; //야간무료개방여부명
    WD_OPER_BGNG_TM: string; //평일 운영 시작시각
    WD_OPER_END_TM: string; //평일 운영 종료시각
    WE_OPER_BGNG_TM: string; //주말 운영 시작시각
    WE_OPER_END_TM: string; //주말 운영 종료시각
    LHLDY_OPER_BGNG_TM: string; //공휴일 운영 시작시각
    LHLDY_OPER_END_TM: string; //공휴일 운영 종료시각
    SAT_CHGD_FREE_SE: string; //토요일 유무료 구분
    SAT_CHGD_FREE_NM: string; //토요일 유무료 구분명
    LHLDY_CHGD_FREE_SE: string; //공휴일 유무료 구분
    LHLDY_CHGD_FREE_SE_NAME: string; //공휴일 유무료 구분명
    PRD_AMT: string; //월 정기권 금액
    STRT_PKLT_MNG_NO: string; //노상 주차장 관리그룹번호
    BSC_PRK_CRG: number; //기본 주차 요금
    BSC_PRK_HR: number; //기본 주차 시간(분 단위)
    ADD_PRK_CRG: number; //추가 단위 요금
    ADD_PRK_HR: number; //추가 다위 시간(분 단위)
    BUS_BSC_PRK_CRG: number; //버스 기본 주차 요금
    BUS_BSC_PRK_HR: number; //버스 기본 주차 시간(분 단위)
    BUS_ADD_PRK_HR: number; //버스 추가 단위 요금
    BUS_ADD_PRK_CRG: number; //버스 추가 단위 시간(분 단위)
    DAY_MAX_CRG: number; //일 최대 요금
    LAT: number; //주차장 위치 좌표 위도
    LOT: number; //주차장 위치 좌표 경도
    SHRN_PKLT_MNG_NM: string; //공유 주차장 관리업체명
    SHRN_PKLT_MNG_URL: string; //공유 주차장 관리업체 링크
    SHRN_PKLT_YN: string; //공유 주차장 여부
    SHRN_PKLT_ETC: string; //공유 주차장 기타사항 (Y:공유주차장 N:공유주차장 아님)
}
