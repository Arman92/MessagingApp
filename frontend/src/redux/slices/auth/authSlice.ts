/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StorageKeys, LocalStorage } from '@messaging/utils';
import { IAuthState } from '@messaging/models';
import { LoginReqResponse } from 'services/api/types';

const initialState: IAuthState = {
  authInProcess: false,
  user: JSON.parse(LocalStorage.getItem(StorageKeys.AuthUser)),
  accessToken: LocalStorage.getItem(StorageKeys.AccessToken),
  refreshToken: LocalStorage.getItem(StorageKeys.RefreshToken),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authInitiated(state) {
      state.authInProcess = true;
    },
    authSuccessful(state, action: PayloadAction<LoginReqResponse>) {
      state.authInProcess = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
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
