# MediDoc v2.0 : 건강검진 중개 플랫폼 서비스
 ![MediDoc 로고](https://github.com/HJNYJ/mediDoc-v2.0/blob/dev/src/assets/images/banner.png)

## MediDoc v2.0
> **내일배움캠프 React 4기 최종 프로젝트**   
> <개발 기간>   
> MediDoc v1.0 : 2024.03.26 ~ 2024.04.22   
> MediDov v2.0 : 2024.04.23 ~


## Service Link
[https://medi-doc-v2-0.vercel.app/](https://medi-doc-v2-0.vercel.app/)


## 팀 소개
* 홍승찬   
  Frontend, 팀장   
  맡은 부분 : 소셜 로그인, 마이페이지, 건강테스트, 퍼블리싱, supabase 구축, 성능 개선   
  <https://github.com/hongppa324/>

* 남지현   
  Frontend, 부팀장   
  맡은 부분 : 예약페이지, 퍼블리싱 총괄, 성능 개선   
  <https://github.com/jihyun-N>

* 정보연   
  Frontend, 팀원   
  맡은 부분 : 실시간 상담, 병원 리뷰, 퍼블리싱, 성능 개선   
  <https://github.com/developeryeon>

* 서소희   
  Designer, 팀원   
  맡은 부분 : 와이어프레임, 디자인 시안, 랜딩페이지   
  <https://drive.google.com/file/d/12AXjNaM1uc_wc93Sm-Ylzxn1sjrycn7p/view?usp=drivesdk>


## 프로젝트 소개
### 프로젝트 개요
사용자들이 더 간편하게 합리적인 건강검진을 예약하고 건강 상태를 체크할 수 있는 모바일 어플리케이션

### 주요 기능
* 제휴 병원 목록 제공 (전체, 지역별) 
* 병원 위치 제공
* 건강검진 예약 서비스 
* 유저들의 후기를 통한 병원 비교  
* 병원 관계자와의 의료 상담 
* 유저가 실시하는 건강 테스트

### 프로젝트 브로셔 노션 링크
 <https://peppermint-flag-a3a.notion.site/mediDoc-32889e2e27864a549153729ec3c908b7?pvs=4>   
 **기능, 기술적 의사결정 과정, 트러블 슈팅 등 자세한 내용은 브로셔를 참고해주세요!**

## 시작 가이드
**Requirements** 

For building and runnig the application you need:
* Node.js v18.19.1
* Npm 9.2.0
* yarn 1.22.21  
  
**Installation**
```
$ git clone https://github.com/HJNYJ/mediDoc-v2.0.git
$ cd mediDoc-v2.0
$ yarn
```

**Run**
```bash
yarn dev
# or
yarn build
yarn start
```

## Service Architecture
![아키텍처](https://github.com/HJNYJ/mediDoc-v2.0/blob/dev/src/assets/images/architecture.png)
