import { IReduxState } from '@messaging/models';

export const selectUser = (state: IReduxState) => state.auth.user;
export const selectAuthInProcess = (state: IReduxState) => state.auth.authInProcess;
