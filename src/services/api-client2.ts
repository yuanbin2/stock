import axios, { AxiosRequestConfig } from "axios";
import { FetchResponse } from "../Hooks/useData";

const axiosInstance = axios.create({
    // baseURL: 'http://8.130.108.45:1001',
    baseURL: 'http://127.0.0.1:4985',
})


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
}

export default APIClient;
