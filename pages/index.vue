<template>
    <div style="padding-top: 150px;">
        <div class="text-center">
            <div>
                <h1>Video List HLS Player</h1>
                total: {{ total }}
            </div>
        </div>

        <hr/>
        <div class="list-group" >
            <div v-for="(video, index) in videoData" :key="`${video.no}`" class="list-box">
                <Player :key="video.no" :index="index" :videoData="video" />
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
}
</script>

