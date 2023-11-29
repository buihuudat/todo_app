import {LoginType, RegisterType} from '../../types/userType';
import axiosClient from './axiosClient';

export const userApi = {
  login: (data: LoginType) => axiosClient.post('/users/login', data),
  register: (data: RegisterType) => axiosClient.post('/users/register', data),
};
