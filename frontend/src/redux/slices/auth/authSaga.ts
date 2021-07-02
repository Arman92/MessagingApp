import { takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@messaging/models';
import { StorageKeys, LocalStorage } from '@messaging/utils';
import { logOut, authSuccessful } from './authSlice';

function handleAuthSuccessful(payload: PayloadAction<IUser>) {
  LocalStorage.setItem(StorageKeys.AuthUser, JSON.stringify(payload));
}

function handleLogout() {
  LocalStorage.removeItem(StorageKeys.AuthUser);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* authSaga() {
  yield takeEvery(authSuccessful, handleAuthSuccessful);
  yield takeEvery(logOut, handleLogout);
}
