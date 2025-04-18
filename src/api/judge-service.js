import request from '@/utils/request.js';

export const getTestCaseStatus = (data) => {
    return request({
        method: 'get',
        url: `/judge/getTestCaseStatus/${data.pid}`,
    });
}