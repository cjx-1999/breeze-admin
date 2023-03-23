// import {commonStore} from '@/stores/common';
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';
import { changeRootVar, findRootVar } from '@/utils/tools';
// const {message, loading} = commonStore()
var r = document.querySelector(":root") as HTMLElement;
class Request {
    private request(opt: {}) {
        const instance: AxiosInstance = axios.create({
            baseURL: import.meta.env.VITE_MOCK_URL,
            timeout: 5000
        })
        this.setInterceptors(instance);
        return instance(opt)
    }

    public setInterceptors(instance: AxiosInstance) {
        instance.interceptors.request.use((config: AxiosRequestConfig) => {
            let token = sessionStorage.getItem('Authorization')
            if (token) {
                if (config.headers) {
                    config.headers.Authorization = token
                }
            }
            // changeRootVar('--loading', 'flex');
            return config
        }, (error) => {
            changeRootVar('--loading', 'none');
            return Promise.reject(error)
        })
        instance.interceptors.response.use((res: AxiosResponse) => {
            changeRootVar('--loading', 'none');

            return Promise.resolve(res.data)
        }, (error) => {
            changeRootVar('--loading', 'none');

            const res = error.response?.data
            if (res.status == 401) {
                router.replace('/login')
                sessionStorage.removeItem('Authorization') //清空当前token
                // message('error', res.msg || res?.message || '登录已过期')
            } else if (res.status == 403) {
                router.replace('/403')
                // message('warning', '你没有访问权限噢')
            } else {
                // message('error', res?.msg || res?.message)
            }
        })
    }

    public get(url: string, params?: any, options?: AxiosRequestConfig) {
        return this.request({
            url: url,
            method: 'get',
            params: params,
            // options: options
        }).then((res) => res.data)
    }

    public post(url: string, payload?: any, headers?: Object, options?: AxiosRequestConfig) {
        return this.request({
            url: url,
            method: 'post',
            data: payload,
            headers,
            ...options
        }).then((res) => res.data)
    }

    public patch(url: string, payload?: any, headers?: Object, options?: AxiosRequestConfig) {
        return this.request({
            url: url,
            method: 'patch',
            data: payload
        })
    }

    public delete(url: string, payload?: any, headers?: Object, options?: AxiosRequestConfig) {
        return this.request({
            url: url,
            method: 'delete',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'content-type': 'application/json'
            },
            data: payload
        })
    }
}

export default new Request()

