import request from '@/utils/request.js';

export const login = (data) => {
    return request({
        method: 'post',
        url: '/user/login',
        data: data
    });
}

export const register = (data) => {
    return request({
        method: 'post',
        url: '/user/register',
        data: data
    });
}

export const getUserInfo = () => {
    return request({
        method: 'get',
        url: '/user/user-info',
    });
}