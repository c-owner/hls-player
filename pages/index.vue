<template>
    <div style="padding-top: 150px;">
        <div class="text-center">
            <div>
                <h1>Video List HLS Player</h1>
                total: {{ total}}
            </div>
        </div>

        <hr/>
        <div class="list-group">
            <div v-for="(video, index) in videoData" :key="`${video.no}`" class="list-box">
                <Player :key="video.no" :index="index" :videoData="video" />
            </div>
        </div>

        <Lazyloading :paginationData="paginationData" />
    </div>
</template>

<script>

export default {
    name: 'index',
    layout: 'LazyloadingLayout',
    provide() {
        return {
            setPage: this.setPage,
        }
    },
    data() {
        return {
            listApiParamSet: {},
            videoData: [],
            total: '',
            paginationData: {},
        }
    },
    created() {
        this.init();
    },
    async mounted() {
        await this.getPlayer();
        this.$nextTick(() => {
            this.$on('getVideoList', this.getPlayer);
        });
    },
    destroyed() {
        this.$nextTick(() => {
            this.$off('getVideoList', this.getPlayer);
        });
    },
    methods: {
        init () {
            this.listApiParamSet = {
                row_count: 10,
                page_no: 1,
                order_col: 'no',
            };
            this.paginationData = {
                page: 1,
                pageSize: 10,
                total: 0,
            };
        },
        async getPlayer() {
            if (this.videoData.length > 1) {
                this.listApiParamSet.page_no += 1;
            }

            let params = JSON.parse(JSON.stringify(this.listApiParamSet));
            await this.$store.dispatch('get_video', params).then(res => {
                if (this.videoData.length < 1) {
                    this.videoData = [];
                    this.videoData = res.data;
                } else {
                    res.data.forEach((val, index, obj) => {
                        this.videoData.push(obj);
                    });
                }
                this.total = res.total;
                this.paginationData.total = this.total;
            });
        },
        setPage(key, value) {
            this[key] = value;
        },
    },
}
</script>

