import {
  PATH_API_NEXT_DETAIL_PRODUCT,
  PATH_API_NEXT_PRODUCT,
  PATH_API_NEXT_UPDATE_PRODUCT,
} from '@constants/router';
import { replaceString } from '@utils/helpers';
import axios from 'axios';

export const productList = async (): Promise<ProductListReponse> => {
  try {
    const res = await axios.get<ProductListReponse>(PATH_API_NEXT_PRODUCT);

    if (res) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.log('error', error);
    return [];
  }
};

export const productDetail = async (
  id: string
): Promise<ProductDetailResponse> => {
  try {
    const res = await axios.get<ProductDetailResponse>(
      replaceString(PATH_API_NEXT_DETAIL_PRODUCT, {
        ':id': id,
      })
    );

    if (!res) {
      throw new Error('Error to fetch detail product');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createProduct = async (payload: CreateProductRequest) => {
  try {
    const res = await axios.post(PATH_API_NEXT_PRODUCT, payload);
    if (!res) {
      throw new Error('Error to fetch create product');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateProduct = async (payload: UpdateProductRequest) => {
  try {
    const { id, ...otherPayload } = payload;
    const res = await axios.put(
      replaceString(PATH_API_NEXT_UPDATE_PRODUCT, {
        ':id': id,
      }),
      otherPayload
    );
    if (!res) {
      throw new Error('Error to fetch update product');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(
      replaceString(PATH_API_NEXT_DETAIL_PRODUCT, {
        ':id': id,
      })
    );
    if (!res) {
      throw new Error('Error to fetch delete product');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
