import axios from 'axios';
import Constant from '../constant';
import qs from 'qs';

const apiRequest = axios.create({
  baseURL: Constant.apiUrl,
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

export default apiRequest;