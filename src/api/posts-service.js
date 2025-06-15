import request from '@/utils/request.js';

export const getAllPosts = () => {
    return request({
        method: 'get',
        url: '/posts/getAllPosts',
    });
}

export const getPostsById = (id) => {
    return request({
        method: 'get',
        url: `/posts/getPostsById/${id}`,
    });
}