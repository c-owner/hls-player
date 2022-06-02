import axios from 'axios'
import {apiURL} from "./config.js";


const RESULTCODE = {
    CODE: 200,
    SUCCEEDED: null,
    ERROR: "ERROR"
}

export default (context, inject, app) => {
    const request = {
        async get(path, params = null) {
            return await axios.get(`${apiURL + path}`, {params: params}).then(res => {
                if (res.data.code === RESULTCODE.CODE) {
                    return res;
                } else return res;
            }).catch(({response}) => {
                alert(RESULTCODE.ERROR);
                throw Error(response)
            })
        },
    }
    inject('request', request)
}
