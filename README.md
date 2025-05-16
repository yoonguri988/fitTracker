# fitTracker

ToyProject: 나만의 홈트 &amp; 건강 모니터링 웹 앱

문서: https://amusing-split-4ee.notion.site/FitTracker-1f2038944be7805fbed6fe497661be10

# 👩🏻‍💻 개발 진행 순서

### 🦝 프로젝트 초기 세팅

◼️ Vite + React + JavaScript 로 프로젝트 생성하고 실행환경 준비
️◼️ TailwindCSS를 설치해 스타일링할 수 있는 환경 생성
️◼️ Zustand로 간단한 상태관리(/store)를 할 수 있도록 설정

### 🦝 라우팅 구조 만들기

◼️ React Router를 사용해 여러 페이지를 오갈 수 있도록 설정 (/home, /routine, /record 등)
️◼️ /dashboard, /routine, /stats, /record, /settings 같은 URL로 접근할 수 있게 함.

### 🦝 기본 페이지 컴포넌트 구성

◼️ 각 페이지 파일을 만들고 간단한 제목이나 더미 내용을 넣어 라우팅이 잘 되는지 확인합니다.
▪️ DashboardPage.jsx, RoutinePage.jsx 등
