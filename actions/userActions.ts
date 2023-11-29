import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginType, RegisterType} from '../types/userType';
import {userApi} from '../utils/api/userApi';

export const userActions = {
  login: createAsyncThunk('user/login', async (data: LoginType) => {
    try {
      const res = await userApi.login(data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  register: createAsyncThunk('user/register', async (data: RegisterType) => {
    try {
      const res = await userApi.register(data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
