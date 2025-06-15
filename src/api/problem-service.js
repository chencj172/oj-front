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

export const testCase = (data) => {
    return request({
        method: 'post',
        url: '/problem/testCase',
        data: data
    });
}

export const getJudgeRecordList = (id) => {
    return request({
        method: 'get',
        url: `/problem/getJudgeRecordList/${id}`,
    });
}

export const getJudgeRecordDetail = (id) => {
    return request({
        method: 'get',
        url: `/problem/getJudgeRecordDetail/${id}`,
    });
}

export const getProblemOfMonth = (timeStamp) => {
    return request({
        method: 'get',
        url: `/sign/getProblemOfMonth/${timeStamp}`,
    });
}

export const getUserSign = (date) => {
    return request({
        method: 'get',
        url: `/sign/getUserSign/${date}`,
    });
}

export const getAllTag = () => {
    return request({
        method: 'get',
        url: '/problem/getAllTag',
    });
}