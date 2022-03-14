# lemon_twitter_toolbox_backend

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://www.chromatic.com/builds?appId=61f0008b4e5f6e003a32bd2a)

React를 사용한 Lemon toolbox의 프론트엔드 서버입니다.

### 주요 기능들은 다음과 같습니다.

1. Mui와 Grid를 바탕으로, 유저 디바이스 (Pc/Tablet/Mobile)에 관계없는 완전 반응형 UI/UX 제공
2. 통일된 Material Design 제공
3. Localstorage를 바탕으로 JWT Token을 저장, 로그인 유지 기능 제공
4. 로그인/비로그인 로직을 구분, 비로그인시에도 페이지 탐사 가능

* 번외 : Storybook 이용하여 Component 기반 테스팅

### 사용된 기술 및 라이브러리는 다음과 같습니다.

- React
- Typescript
- MUI (반응형 서비스 제공 및 디자인 통일성 유지)
- recoil.js (전역 상태관리)
- Storybook (컴포넌트 고립 테스트 및 CDD 연습)
- React Query (Server State 관리)
