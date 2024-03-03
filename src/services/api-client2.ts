import axios, { AxiosRequestConfig } from "axios";
import { FetchResponse } from "../Hooks/useData";

const axiosInstance = axios.create({
    // baseURL: 'http://8.130.108.45:1001',
    baseURL: 'http://127.0.0.1:4985',
})


// 添加请求拦截器
// 获取当前存储器中存储的accessToken
axiosInstance.interceptors.request.use(
    function (config) {
        const access = localStorage.getItem('accessToken');
        if (access) {
            config.headers.Authorization = `JWT ${access}`;
            console.log('拦截器：设置了 Authorization 头部');
        } else {
            console.log('拦截器：未找到访问令牌');
        }
        return config;
    },
    function (error) {
        console.error('拦截器错误：', error);
        return Promise.reject(error);
    }
);

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint, config)
            .then(res => res.data);
    }

    getPage = (id: number | string) =>{
        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint + '/' + id)
            .then(res => res.data);
    }

    getDetail = (id: number | string) => {
        return axiosInstance
            .get<T>(this.endpoint + '/' + id)
            .then(res => res.data);
    }

    getData = () =>{
        return axiosInstance
            .get<T>(this.endpoint)
            .then(res => res.data)
    }
}

export default APIClient;
