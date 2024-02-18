import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '9ec49a46add24ddaa7e6283818972e4c'
    }
})