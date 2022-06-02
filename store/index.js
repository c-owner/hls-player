
export const state = () => ({
    videos: [],
})

export const mutations = {
    set_videos(state, videos) {
        state.videos = videos
    },
}

export const getters = {
    get_videos(state) {
        return state.videos
    },
}

export const actions = {
    async get_video(store, params ) {
        return await this.$request.get('/vod/json/list', params).then(res => res.data.result).then(res => {
            store.commit('set_videos', res);
            return res;
        });
    },
}
