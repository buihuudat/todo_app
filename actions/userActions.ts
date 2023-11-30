import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginType, RegisterType, UserType} from '../types/userType';
import {userApi} from '../utils/api/userApi';
import {dataStorage} from '../utils/handlers/dataStore';

export const userActions = {
  get: createAsyncThunk('user/get', async (id: string) => {
    try {
      const res = await userApi.get(id);
      await dataStorage.setItem('user', res.data._id);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }),
  update: createAsyncThunk(
    'user/update',
    async (newUser: UserType, thunkAPI) => {
      try {
        const res = await userApi.update(newUser);
        return res.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.data);
      }
    },
  ),
  login: createAsyncThunk('user/login', async (data: LoginType, thunkAPI) => {
    try {
      const res = await userApi.login(data);
      await dataStorage.setItem('user', res.data._id);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }),
  register: createAsyncThunk(
    'user/register',
    async (data: RegisterType, thunkAPI) => {
      try {
        const res = await userApi.register(data);
        await dataStorage.setItem('user', res.data._id);
        return res.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.data);
      }
    },
  ),
};
