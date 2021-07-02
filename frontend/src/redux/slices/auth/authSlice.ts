/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StorageKeys, LocalStorage } from '@messaging/utils';
import { IAuthState, IUser } from '@messaging/models';

const initialState: IAuthState = {
  user: JSON.parse(LocalStorage.getItem(StorageKeys.AuthUser)),
  authInProcess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authInitiated(state) {
      state.authInProcess = true;
    },
    authSuccessful(state, action: PayloadAction<IUser>) {
      state.authInProcess = false;
      state.user = action.payload;
    },
    authFailed(state) {
      state.authInProcess = false;
      state.user = null;
    },
    logOut(state) {
      state.user = null;
    },
  },
});

export const { authInitiated, authSuccessful, authFailed, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
