# 주차자리요 🚗

**주차자리요** 는 서울시 공영 주차장 정보를 제공하는 웹 애플리케이션입니다. </br>
자치구별로 주차장 정보를 조회하고, 즐겨찾기 기능을 통해 자주 사용하는 주차장을 저장할 수 있습니다.

<br>

## 주요 기능

### 1. 자치구별 주차장 정보 조회

-   [서울시 공공 데이터 API](https://data.seoul.go.kr/dataList/OA-21709/S/1/datasetView.do) 를 통해 자치구별 공영 주차장 정보를 제공합니다.
-   각 주차장의 기본 정보(주소, 요금, 실시간 주차 가능 여부 등)를 확인할 수 있습니다.

### 2. 즐겨찾기 기능

-   자주 이용하는 주차장을 즐겨찾기로 저장할 수 있습니다.
-   즐겨찾기 목록에서 바로 주차장 정보를 확인하거나 지도에서 위치를 찾을 수 있습니다.
-   LocalStorage 를 이용해 즐겨찾기 목록을 관리합니다.

### 3. 검색 기능

-   **주차장 검색** : 자치구를 입력하여 공영 주차장 정보를 검색할 수 있습니다.
-   **즐겨찾기 검색** : 저장된 즐겨찾기 목록에서 검색합니다.

### 4. 반응형 디자인

-   모바일과 데스크탑에서 모두 사용할 수 있는 반응형 웹 애플리케이션입니다.

<br>

## 설치 및 실행

1. 레포지토리 클론

    ```bash
    git clone https://github.com/ayoung26/seoul-parking-connect-API.git
    ```

2. 패키지 설치

    ```bash
    npm install
    ```

3. 환경 변수 설정
   프로젝트 루트에 `.env` 파일을 생성하고, 아래와 같이 설정

    ```bash
    VITE_API_BASE_URL = "http://openapi.seoul.go.kr:8088"
    VITE_API_KEY = "YOUR_API_KEY"
    ```

4. 프로젝트 실행

    ```bash
    npm run dev
    ```

5. Vercel 배포 설정
   `vercel.json` 파일을 사용해 API 프록시 설정을 추가

    ```json
    {
        "rewrites": [
            {
                "source": "/api/:path*",
                "destination": "http://openapi.seoul.go.kr:8088/:path*"
            }
        ]
    }
    ```

<br>

## 환경 변수

-   **VITE_API_BASE_URL** : 서울시 공공 API 기본 URL
-   **VITE_API_KEY** : 서울시 공공 API 키

<br>

## 기술 스택

-   빌드 도구 : Vite
-   프론트엔드 : React, TypeScript, Styled-components, Zustand
-   지도 API : Kakao Maps API, React KakaoMap SDK
-   API 통신 : Seoul OpenAPI
-   배포 : Vercel

<br>

## 배포 URL

[https://seoul-parking-connect-api.vercel.app/](https://seoul-parking-connect-api.vercel.app/)
