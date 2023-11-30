import {LoginType, RegisterType, UserType} from '../../types/userType';
import axiosClient from './axiosClient';

export const userApi = {
  get: (id: string) => axiosClient.get(`/users/get/${id}`),
  update: (newUser: UserType) =>
    axiosClient.put(`/users/${newUser._id}`, {newUser}),
  login: (data: LoginType) => axiosClient.post('/users/login', data),
  register: (data: RegisterType) => axiosClient.post('/users/register', data),
};
