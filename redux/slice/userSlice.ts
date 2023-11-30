import {createSlice} from '@reduxjs/toolkit';
import {UserType} from '../../types/userType';
import {userActions} from '../../actions/userActions';

interface InitialProps {
  user: UserType | null;
}

const initialState: InitialProps = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: state => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userActions.get.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userActions.update.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userActions.login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userActions.register.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const {removeUser} = userSlice.actions;
export default userSlice.reducer;
