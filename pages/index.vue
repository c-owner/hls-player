<template>
    <div>
        <Player :videoData="videoData" :total="total"/>
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

