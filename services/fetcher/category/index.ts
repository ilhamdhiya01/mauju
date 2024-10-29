import { PATH_API_NEXT_CATEGORY } from '@constants/router';
import axios from 'axios';

export const categoryList = async (): Promise<CategoryListResponse> => {
  try {
    const res = await axios.get<CategoryListResponse>(PATH_API_NEXT_CATEGORY);

    if (res) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.log('error', error);
    return [];
  }
};
