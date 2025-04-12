import request from '@/utils/request.js';

export const search = (data) => {
    return request({
        method: 'get',
        url: '/problem/search',
        params: data
    });
}

export const getProblemById = (id) => {
    return request({
        method: 'get',
        url: `/problem/getById/${id}`,
    });
}

export const judgeProblem = (data) => {
    return request({
        method: 'post',
        url: '/problem/judge',
        data: data
    });
}