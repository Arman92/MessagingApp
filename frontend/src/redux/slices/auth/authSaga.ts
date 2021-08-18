import { takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { StorageKeys, LocalStorage } from '@messaging/utils';
import { LoginReqResponse } from '@messaging/services/api/types';
import { setInterceptors } from '@messaging/services/api/interceptors';
import { logOut, authSuccessful } from './authSlice';

function handleAuthSuccessful({ payload }: PayloadAction<LoginReqResponse>) {
  LocalStorage.setItem(StorageKeys.AuthUser, JSON.stringify(payload.user));
  LocalStorage.setItem(StorageKeys.AccessToken, payload.accessToken);
  LocalStorage.setItem(StorageKeys.RefreshToken, payload.refreshToken);

  setInterceptors(payload.accessToken);
}

function handleLogout() {
  LocalStorage.removeItem(StorageKeys.AuthUser);
  LocalStorage.removeItem(StorageKeys.AccessToken);
  LocalStorage.removeItem(StorageKeys.RefreshToken);

  setInterceptors(null);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* authSaga() {
  yield takeEvery(authSuccessful, handleAuthSuccessful);
  yield takeEvery(logOut, handleLogout);
}
