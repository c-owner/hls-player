<template>
    <div style="padding-top: 150px;">
        <div class="text-center">
            <div>
                <h1>Video List HLS Player</h1>
                <h4 style="color: #e5e5e5">지금까지 이런 버그는 없었다.. 이것은 무엇인가</h4>
                total: {{ total }}
            </div>
        </div>

        <hr/>
        <div class="list-group">
            <div v-for="(video, index) in videoData" :key="`${video.no}`" class="list-box"  style="margin-top: 100px;">
                <Player :key="video.no" :index="index" :videoData="video"
                        ref="player"/>
                <div style="margin-bottom: 150px"></div>
            </div>
        </div>
        <infinite-loading
            v-if="videoData.length"
            @infinite="getPlayer"
        ></infinite-loading>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: 'index',
    layout: 'LazyloadingLayout',
    provide() {
        return {
        }
    },
    data() {
        return {
            listApiParamSet: {},
            videoData: [],
            total: '',
        }
    },
    created() {
        this.init();
    },
    async mounted() {
/*        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // 관찰 대상이 viewport 안에 들어온 경우
                console.log(entry.intersectionRatio)
                if (entry.intersectionRatio > 0) {
                    console.log("--------1")
                    // 광역딜 들어가는데,,
                }
                else {
                    console.log("--------2")
                    // this.$nuxt.$emit('video_viewport_play', false);
                }
            })
        })
        console.log("io--------------")
        console.log(io)
        console.log("------end--------")
        // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
        setTimeout(() => {
            const boxElList = document.querySelectorAll('.list-box');
            boxElList.forEach((el) => {
                io.observe(el);
            })
        }, 1000);*/
    },
    destroyed() {
    },
    methods: {
        async init () {
            this.listApiParamSet = {
                row_count: 10,
                page_no: 1,
                order_col: 'no',
            };
            await this.fetchData();
        },
        async fetchData() {
            let params = JSON.parse(JSON.stringify(this.listApiParamSet));
            const response = await this.$store.dispatch("get_video", params);
            this.videoData = response.data;
            this.total = response.total;
        },
        async getPlayer($state) {
            setTimeout(async () => {
                this.listApiParamSet.page_no++;
                try {
                    const res = await this.$store.dispatch("get_video", this.listApiParamSet);
                    if (res && res.data.length > 1) {
                        res.data.forEach((item) => this.videoData.push(item));
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                } catch (e) {
                    console.log(e);
                }
            }, 500);
        },
    },
    watch: {
    },
}
</script>

