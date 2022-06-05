<template>
    <div>
        <div v-for="(item, idx) in videoData" :key="idx">
            <div style="padding: 5px;"> - </div>
        </div>
        <br />
        <infinite-loading
            v-if="videoData.length"
            @infinite="scrolling"
        ></infinite-loading>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "InfiniteList",
    data() {
        return {
            videoData: [],

            page: 1,
        };
    },
    computed: {
        url() {
            // free fake api 사용
            return "https://jsonplaceholder.typicode.com/posts?_page=" + this.page;
        },
    },
    created() {
        this.fetchData();
    },

    methods: {
        async fetchData() {

            let params = JSON.parse(JSON.stringify(this.listApiParamSet));
            const response = await this.$store.dispatch("get_video", params);
            this.videoData = response.data;
        },
        scrolling($state) {
            // 스크롤이 페이지 하단에 위치해도 약간의 딜레이를 주고 데이터를 가져옴
            setTimeout(async () => {
                this.page++;
                const response = await axios.get(this.url);
                if (response && response.data.length > 1) {
                    response.data.forEach((item) => this.videoData.push(item));
                    $state.loaded();
                } else {
                    $state.complete();
                }
            }, 500);
        },
    },
};
</script>
