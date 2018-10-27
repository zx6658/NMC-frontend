import apiRequest from './apiRequest';

export const getAnswer = (url, question) => apiRequest.get( url, {params: { question }}).then(res => res.data);