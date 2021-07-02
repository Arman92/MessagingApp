import axios from 'axios';

import config from '@messaging/config/app';
import { LoginReqParams, LoginReqResponse, SignupReqParams, SignupReqResponse } from './types';

const login = ({ emailOrUsername, password }: LoginReqParams) => {
  return axios.post<LoginReqResponse>(config.apiServer, {
    emailOrUsername,
    password,
  });
};

const signup = ({ email, username, name, password }: SignupReqParams) => {
  return axios.post<SignupReqResponse>(config.apiServer, {
    email,
    username,
    name,
    password,
  });
};

export const AuthService = {
  login,
  signup,
};
