import {createAsyncThunk} from '@reduxjs/toolkit';
import {TodoType} from '../types/todoType';
import {todoApi} from '../utils/api/todoApi';

export const todoActions = {
  create: createAsyncThunk(
    'todo/create',
    async ({todo, uid}: {todo: TodoType; uid: string}) => {
      try {
        const res = await todoApi.create(todo, uid);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  ),
  getAll: createAsyncThunk('todo/getAll', async (uid: string) => {
    try {
      const res = await todoApi.getAll(uid);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  get: createAsyncThunk(
    'todo/get',
    async ({id, uid}: {id: string; uid: string}) => {
      try {
        const res = await todoApi.get(id, uid);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  ),
  update: createAsyncThunk(
    'todo/update',
    async ({todo, uid}: {todo: TodoType; uid: string}) => {
      try {
        const res = await todoApi.upate(todo, uid);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  ),
  delete: createAsyncThunk('todo/delete', async (id: string) => {
    try {
      const res = await todoApi.delete(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
