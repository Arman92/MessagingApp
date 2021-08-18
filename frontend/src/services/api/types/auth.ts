import { IUser } from '@messaging/models';

// Login
export type LoginReqParams = {
  emailOrUsername: string;
  password: string;
};

export type LoginReqResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireDate: string;
  user: IUser;
};

// Signup
export type SignupReqParams = {
  email: string;
  username: string;
  name: string;
  password: string;
};

export type SignupReqResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireDate: string;
  user: IUser;
};
