import request from '@/utils/request.js';

export const getChallengeResult = () => {
    return request({
        method: 'get',
        url: '/pk/getChallengeResult',
    });
}