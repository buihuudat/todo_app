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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userActions.login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userActions.register.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
