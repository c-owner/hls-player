<template>
    <div>
        <div class="text-center">
            <div>
                <h1>Video List HLS Player</h1>
                total: {{ total}}
            </div>
        </div>
        <hr/>
        <div class="list-group">
            <div v-for="(video, index) in videoData" :key="`${video.no}`" class="list-box">
                <Player :videoData="video" />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'index',
    data() {
        return {
            listApiParamSet: {},
            videoData: [],
            total: '',
        }
    },
    async mounted() {
        this.listApiParamSet = {
            row_count: 15,
            page_no: 1,
            order_col: 'no',
            shuffle: true,
        };
        await this.getPlayer();
    },
    methods: {
        async getPlayer() {
            let params = JSON.parse(JSON.stringify(this.listApiParamSet));
            await this.$store.dispatch('get_video', params).then(res => {
                this.videoData = res.data;
                this.total = res.total;
            });
        }
    },
}
</script>

