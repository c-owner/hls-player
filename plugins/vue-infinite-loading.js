import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.component("infinite-loading", InfiniteLoading);

// vue-infinite-loading custom
Vue.use(InfiniteLoading, {
    slots: { noMore: "불러올 데이터가 없네요.." },
    props: { spinner: "circles" },
});
