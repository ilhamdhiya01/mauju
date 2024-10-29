import {
  PATH_API_NEXT_AUTH_LOGIN,
  PATH_API_NEXT_AUTH_REGISTER,
  PATH_API_NEXT_USER_LOGOUT,
} from '@constants/router';
import axios from 'axios';

export const login = async (payload: LoginReqBody): Promise<LoginResBody> => {
  const res = await axios.post<LoginResBody>(PATH_API_NEXT_AUTH_LOGIN, payload);
  if (!res) {
    throw new Error('Network response was not ok');
  }
  return res.data;
};

export const register = async (
  payload: RegisterReqBody
): Promise<RegisterResBody> => {
  const res = await axios.post<RegisterResBody>(
    PATH_API_NEXT_AUTH_REGISTER,
    payload
  );
  if (!res) {
    throw new Error('Network response was not ok');
  }
  return res.data;
};

export const logout = async (): Promise<User> => {
  const res = await axios.post<User>(PATH_API_NEXT_USER_LOGOUT);
  return res.data;
};
