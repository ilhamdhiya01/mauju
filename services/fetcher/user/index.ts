import { PATH_API_NEXT_USER } from '@constants/router';
import axios from 'axios';

export const user = async (): Promise<User> => {
  try {
    const res = await axios.get<User>(PATH_API_NEXT_USER);

    if (res) {
      return res.data;
    }
    return { data: null, isLoggedIn: false };
  } catch (error) {
    console.log('error', error);
    return { data: null, isLoggedIn: false };
  }
};
