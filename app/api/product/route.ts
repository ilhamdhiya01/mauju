import axiosInstance from '@config/axiosInstance';
import {
  PATH_API_BE_CREATE_PRODUCT,
  PATH_API_BE_LIST_PRODUCTS,
} from '@constants/router';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = await axiosInstance.get(PATH_API_BE_LIST_PRODUCTS);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body: CreateProductRequest = await req.json();
    const response = await axiosInstance.post(PATH_API_BE_CREATE_PRODUCT, body);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(error);
  }
};
