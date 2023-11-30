import {TodoType} from '../../types/todoType';
import axiosClient from './axiosClient';

export const todoApi = {
  create: (data: TodoType, uid: string) =>
    axiosClient.post(`/todos/${uid}`, data),
  getAll: (uid: string) => axiosClient.get(`/todos/${uid}`),
  get: (id: string, uid: string) => axiosClient.get(`/todos/${uid}/${id}`),
  upate: (todo: TodoType, uid: string) =>
    axiosClient.put(`/todos/${uid}/${todo._id}`, todo),
  delete: (id: string) => axiosClient.delete(`/todos/${id}`),
};
