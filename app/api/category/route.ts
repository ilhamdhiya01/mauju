import axiosInstance from '@config/axiosInstance';
import { PATH_API_BE_LIST_CATEGORIES } from '@constants/router';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = await axiosInstance.get(PATH_API_BE_LIST_CATEGORIES);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(error);
  }
};
