<template>
    <div>
        <Nuxt/>
        <infinite-loading v-if="paginationData.total > 0 && paginationData.total > paginationData.page * paginationData.size"
                          @infinite="infiniteHandler($event)" loadingSpinner="bubbles"
                          loadingText="Loading more data...">
            <div slot="no-more">No More Message</div>
            <div slot="no-results">No Results</div>
            <div slot="error" slot-scope="{ trigger }">
                Error Message, click
                <a href="javascript:void(0)" @click="trigger">here</a> to retry
            </div>
        </infinite-loading>
    </div>
</template>

<script>
export default {
    name: "Lazyloading",
    props: {
        paginationData: {
            type: Object,
            default: {
                total: 0,
                page: 0,
                size: 0,
            }
        },
    },
    methods: {
        async infiniteHandler($event) {
            let page = this.paginationData.page;
            page = page + 1;
            this.setPage('page', page);
            this.$emit('getVideoList');
            setTimeout(() => {
                $event.target.complete();
            }, 500)
        },
    },
}
</script>

<style scoped>

</style>
