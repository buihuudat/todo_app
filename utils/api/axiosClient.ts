import axios from 'axios';
import queryString from 'query-string';
import {dataStorage} from '../handlers/dataStore';
import {Alert} from 'react-native';

let IP = '192.168.1.8';

const PORT = 5000;
export const host = `http://${IP}:${PORT}`;

const baseURL = `http://${IP}:${PORT}/api/v1`;

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params: any): string => queryString.stringify({params}),
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    const token = await dataStorage.getItem('user');

    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Beaber ${token}`,
      },
    };
  },
  (e: any) => {
    return Promise.reject(e);
  },
);
axiosClient.interceptors.response.use(
  (response: any) => {
    // if (response && response.data) return response.data;
    return response;
  },
  error => {
    if (!error.response) {
      return Alert.alert('Disconnect');
    }
    throw error.response;
  },
);

export default axiosClient;
