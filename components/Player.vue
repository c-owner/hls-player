<template>
    <div>
        <div>
            <h2 class="text-center">
                [{{videoData.no}}] {{ videoData.title}}
            </h2>
        </div>
        <div class="video-container" data-volume-level="high"
             :class="[{'paused' : paused && !playState}, {'theater' : theaterMode},
         {'full-screen': fullscreen}, {'muted': volume === 0},
         { scrubbing: isScrubbing }]"
             ref="video_container">
            <div class="video-controls-container">
                <div class="timeline-container" ref="timelineContainer">
                    <div class="timeline" @mousemove="handleTimelineUpdate($event)"
                         @mousedown="toggleScrubbing($event)">
                        <img class="preview-img" :src="previewImg" alt="" ref="previewImg"/>
                        <div class="thumb-indicator"></div>
                    </div>
                </div>
                <div class="controls">
                    <button class="play-pause-btn" @click="togglePlay()">
                        <svg class="play-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                        </svg>
                        <svg class="pause-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z"/>
                        </svg>
                    </button>

                    <div class="volume-container">
                        <button class="mute-btn" ref="muteBtn" @click="toggleMute">
                            <svg class="volume-high-icon" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
                            </svg>
                            <svg class="volume-low-icon" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"/>
                            </svg>
                            <svg class="volume-muted-icon" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"/>
                            </svg>
                        </button>
                        <input class="volume-slider" ref="volumeSlider" v-model="volume" @change="volumeChange($event)"
                               type="range" min="0" max="1" step="any" value="1"/>
                    </div>
                    <div class="duration-container" ref="videoDuration">
                        <div class="current-time">{{ currentTime }}</div>
                        /
                        <div class="total-time">{{ totalTime }}</div>
                    </div>
                    <button class="speed-btn wide-btn" @click="changePlaybackSpeed">
                        {{ speed }}x
                    </button>
                    <button class="mini-player-btn" ref="mini" @click="toggleMiniMode">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
                        </svg>
                    </button>
                    <button class="theater-btn" ref="theater" @click="toggleTheater">
                        <svg class="tall" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
                        </svg>
                        <svg class="wide" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
                        </svg>
                    </button>
                    <button class="full-screen-btn" ref="fullscreen" @click="toggleFullScreen">
                        <svg class="open" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                        </svg>
                        <svg class="close" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                        </svg>
                    </button>

                </div>
            </div>
            <video id="video" ref="video" @click="togglePlay"
                   preload="auto"
                   playsinline
                   :autoplay="playState">
            </video>
        </div>
    </div>
</template>

<script>
import Hls from 'hls.js';

export default {
    name: 'Player',
    props: ['videoData', 'index', 'viewport'],
    data() {
        return {
            playState: false,
            paused: true,
            theaterMode: false,
            fullscreen: false,
            miniMode: false,
            volume: 1,
            currentTime: '0:00',
            totalTime: '',
            speed: 1,
            captions: {
                'mode': 'hidden',
            },
            previewImg: '',
            thumbnailImg: '',
            isScrubbing: false,
            videoScroll: 0,

            nowTime: new Date(),
            scrollPoint: null,
            count: 0,
        }
    },
    mounted() {
        // hls 초기화
        this.init();
        // this.playUrl = this.videoData.play_url.mp4['720p'];
        // this.playUrl = require('@/assets/my_video.mp4');
        this.updateNow();
        this.videoScroll = 0.1;
        this.scrollPoint = null;
        setInterval(this.updateNow.bind(this) , 1000);


        document.addEventListener("fullscreenchange", () => {
            this.$refs.video_container.classList.toggle('full-screen');
        });

        this.$refs.video.addEventListener('enterpictureinpicture', () => {
            this.$refs.video_container.classList.add("mini-player");
        });
        this.$refs.video.addEventListener('leavepictureinpicture', () => {
            this.$refs.video_container.classList.remove("mini-player");
        });

        this.$refs.video.addEventListener('loadeddata', () => {
            this.totalTime = this.formatDuration(this.$refs.video.duration);
        });
        this.$refs.video.addEventListener('timeupdate', () => {
            this.currentTime = this.formatDuration(this.$refs.video.currentTime);
            const percent = this.$refs.video.currentTime / this.$refs.video.duration;
            this.$refs.timelineContainer.style.setProperty("--progress-position", percent)
        });
        document.addEventListener("mouseup", e => {
            if (this.isScrubbing) {
                this.toggleScrubbing(e);
            }
        });
        document.addEventListener("mousemove", e => {
            if (this.isScrubbing) {
                this.handleTimelineUpdate(e);
            }
        });

        /*if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            console.log(" page reload ");
            // page가 reload 되었을 때 재생되어야하는데, 모든 영상이 재생되면 곤란함..
            if (this.$refs.video.paused && this.playState) {
                this.paused = false;
                this.playState = true;
                this.$refs.video.play();
            } else {
                this.paused = true;
                this.playState = false;
                this.$refs.video.pause();
            }
        }*/
        document.addEventListener('scroll', () =>{
            this.videoScroll = this.$refs.video.getBoundingClientRect().top;
            this.scrollPoint = new Date();
            this.scrollPoint.setSeconds(this.scrollPoint.getSeconds() + 2);
            if (this.videoScroll > -100 && this.videoScroll < 100) {

            } else {
                this.player_pause();
            }
        });
/*        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                this.videoScroll = this.$refs.video.getBoundingClientRect().top;
                this.scrollPoint = new Date();
                this.scrollPoint.setSeconds(this.scrollPoint.getSeconds() + 2);
                if (this.videoScroll < -100 && this.videoScroll > 100) {
                    this.player_pause();
                }
            })
        })
        console.log("io--------------")
        console.log(io)
        console.log("------end--------")
        // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
        setTimeout(() => {
            const data = this.nowTime;
            io.observe(data);
        }, 1000);*/
    },
    beforeDestroy() {
        // this.$nuxt.$off('video_viewport_play');
    },
    methods: {
        updateNow() {
            this.nowTime = new Date();
        },
        video_viewport() {
            console.log("?????????", this.viewport)
            if (this.viewport) {
                if (this.hls.type !== 'play') {
                    this.play_setting();
                console.log("setup")
                }
                console.log("play")
                this.paused = false;
                this.playState = true;
                this.$refs.video.play();
            } else if (!this.viewport && this.hls.type === 'play') {
                console.log("pause")
                this.paused = true;
                this.playState = false;
                this.$refs.video.pause();
            } else {
                console.log("return")
                return false;
            }
        },
        async play_setting() {
            this.hls.type = 'play';
            await this.hls.loadSource(this.videoData.play_url.hls['720p']);
            await this.hls.attachMedia(this.$refs.video);
            this.muted = false;
        },
        async thumb_setting() {
            this.hls.type = 'thumb';
            await this.hls.loadSource(this.videoData.play_url.hls['thumb']);
            await this.hls.attachMedia(this.$refs.video);
            this.muted = true;
        },
        init() {
            this.playState = false;
            this.hls = new Hls();
            this.hls.type = 'none';
            this.$refs.video.src = '';
            this.$refs.video.poster = this.videoData.thumb_url;
            this.$refs.video.currentTime = 0;
        },
        toggleScrubbing(e) {
            const rect = this.$refs.timelineContainer.getBoundingClientRect();
            const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
            this.isScrubbing = (e.buttons & 1) === 1;
            this.$refs.video_container.classList.toggle("scrubbing", this.isScrubbing);
            if (this.isScrubbing && this.$refs.video.paused) {
                this.$refs.video.pause();
            } else {
                this.$refs.video.currentTime = percent * this.$refs.video.duration;
                if (!this.$refs.video.paused) {
                    this.$refs.video.play();
                }
            }

            this.handleTimelineUpdate(e);
        },
        handleTimelineUpdate(e) {
            let timeline = this.$refs.timelineContainer;
            const rect = timeline.getBoundingClientRect();
            const percent =
                Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
            // const previewImgNumber = Math.max(1, Math.floor((percent * this.$refs.video.duration) / 10));
            // this.previewImg = require(`assets/previewImgs/preview${previewImgNumber}.jpg`);
            let previewImgNumber = this.videoData.thumb_small;
            this.previewImg = previewImgNumber[Math.max(1, Math.floor((percent * this.$refs.video.duration) / 10))];
            timeline.style.setProperty('--preview-position', percent);

            if (this.isScrubbing) {
                e.preventDefault();
                this.thumbnailImg = this.previewImg;
                timeline.style.setProperty('--progress-position', percent)
            }
        },
        changePlaybackSpeed() {
            let newPlaybackRate = this.$refs.video.playbackRate + 0.25;
            if (newPlaybackRate > 2) {
                newPlaybackRate = 0.25;
            }
            this.$refs.video.playbackRate = newPlaybackRate;
            this.speed = newPlaybackRate;
        },
        skip(duration) {
            this.$refs.video.currentTime += duration;
        },
        formatDuration(time) {
            const seconds = Math.floor(time % 60);
            const minutes = Math.floor(time / 60) % 60;
            const hours = Math.floor(time / 3600);
            const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
                minimumIntegerDigits: 2,
            });
            if (hours === 0) {
                return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
            } else {
                return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`;
            }
        },
        player_play() {
            if (this.hls.type !== 'play') {
                this.play_setting();
            }
            this.paused = false;
            this.muted = true;
            this.playState = true;
            this.$refs.video.play();
        },
        player_pause() {
            this.paused = true;
            this.muted = false;
            this.playState = false;
            this.$refs.video.pause();
            this.$refs.video.currentTime = 0;
            this.currentTime = '0:00';
        },
        togglePlay() {
            if (this.hls.type !== 'play') {
                this.play_setting();
            }
            if (this.$refs.video.paused) {
                this.paused = false;
                this.playState = true;
                this.$refs.video.play();
            } else {
                this.paused = true;
                this.playState = false;
                this.$refs.video.pause();
            }
        },
        // volume control
        toggleMute() {
            const videoContainer = this.$refs.video_container;
            const video = this.$refs.video;
            if (!video.muted) {
                this.volume = 0;
                videoContainer.dataset.volumeLevel = 'muted';
            } else {
                this.volume = video.volume;
                if (video.volume > .5) {
                    videoContainer.dataset.volumeLevel = 'high';
                } else {
                    videoContainer.dataset.volumeLevel = 'low';
                }
            }
            this.$refs.video.muted = !this.$refs.video.muted;
        },
        volumeChange(e) {
            const video = this.$refs.video;
            if (this.volume < 0 && e === -0.1) {
                this.volume = 0;
            } else if (e === 0.1 && this.volume > 1) {
                this.volume = 1;
            } else if (e === 0.1 || e === -0.1) {
                this.volume = this.volume + e;
            } else {
                this.volume = e.target.value;
            }
            video.volume = this.volume;
            video.muted = this.volume === 0;
            this.$refs.volumeSlider.value = video.volume;
            let volumeLevel;
            if (video.muted || video.volume === 0) {
                this.$refs.volumeSlider.value = 0;
                volumeLevel = "muted";
            } else if (video.volume > .5) {
                volumeLevel = "high";
            } else {
                volumeLevel = "low";
            }

            this.$refs.video_container.dataset.volumeLevel = volumeLevel;

        },
        // view Mode
        toggleTheater() {
            this.$refs.video_container.classList.toggle('theater');
        },
        toggleFullScreen() {
            if (document.fullscreenElement == null) {
                this.$refs.video_container.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        },
        toggleMiniMode() {
            if (this.$refs.video_container.classList.contains('mini-player')) {
                document.exitPictureInPicture();
            } else {
                this.$refs.video.requestPictureInPicture();
            }
        },
        timeEquals() {
            if (this.scrollPoint === null ) {
                return;
            }
            if (this.nowTime.getTime() === this.scrollPoint.getTime()) {
                // console.log("??????11")
                this.player_play();
            }
        },
    },
    watch: {
        'viewport': function (val, oldVal) {
            if (val !== oldVal) {
                this.video_viewport(val);
            }
        },
        'nowTime': function (val, oldVal) {
            if (this.scrollPoint === null ) {
                return;
            }
            if (val.getSeconds() == this.scrollPoint.getSeconds()) {
                // console.log("111111")
               if (this.videoScroll > -100 && this.videoScroll < 100) {
                // console.log("2222222")
                   this.player_play();
               }
            }
        },
        'videoScroll': function (val, oldVal) {
            if (this.videoScroll > -100 && this.videoScroll < 100) {
                setInterval(this.timeEquals.bind(this), 1000);
                // console.log("nowTime :::::: " + this.nowTime);
                // console.log("scrollPoint :::::::::: " + this.scrollPoint);

            }
        }
    },
}
</script>

