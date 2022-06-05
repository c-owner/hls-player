# 도전과제 :: youtube-video-player-V2
```
auth: corner
date: 2022-06-02
```

## 설명
> 기존의 Youtube-video-player는 HTML5/CSS/JS 문법과 ffmpeg을 사용하였습니다.
> 
> 해당 버전에서는 HLS 영상처리 작업 처리와 Nuxt를 활용하여 스타일 처리들을 더 심화한 버전으로 변경하였습니다.



---


## 퀘스트

- 기존의 Youtube-Video-Player 완성도 향상시키고 컴포넌트화 할 것
- API 주소를 받아 영상들 리스트화 

[//]: # "- [Only Watch me]&#40;https://eatalk.live24.app/api/vod/json/list?row_count=15&page_no=1&order_col=no&shuffle=true&#41;"
- 스크롤 내렸을 때 화면 상단에 영상이 맞춰지면 자동재생
- Hls를 이용하여 재생한다.
- #### [HLS에 관하여..](https://iu-corner.tistory.com/entry/%EB%8F%99%EC%98%81%EC%83%81-HLS%EB%9E%80-%ED%8A%B9%EC%A7%95)

---
🌱 06-01 
- youtube-video-player v1 마무리 작업


🌱 06-02, 06-03
- youtube-video-player v2 프로젝트 세팅
- api 구조 세팅
- vuex 상태관리 구조 세팅
- vue page API 통신 
- 컴포넌트 props 데이터 전달
- video list
- hls 영상 재생
- play/pause 버그 해결



**TODO**

- Lazyloading 방식으로 추가 영상 개수 로드



## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```



## HLS 영상 재생

Hls 영상은 일반적으로 src url만 넣는다고 재생이 되지 않습니다. hls.js라는 support 모듈이라는 것을 사용합니다.

hls 모듈 설치

`npm i hls.js`



```js
var hls = new Hls();
hls.loadSource(this.videoData.play_url.hls['1080p']);
hls.attachMedia(this.$refs.video);
```

각 `hls.`코드 안에 인자값은 아래와 같습니다.

`hls.loadSource(url)` 

`hls.attachMedia(video)` 
