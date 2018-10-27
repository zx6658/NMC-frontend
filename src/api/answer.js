import apiRequest from './apiRequest';

export const getAnswer = (question) => apiRequest.get( '/hovi/answer', {params: { question }}).then(res => res.data);