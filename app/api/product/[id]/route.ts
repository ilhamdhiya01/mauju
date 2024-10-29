import axiosInstance from '@config/axiosInstance';
import {
  PATH_API_BE_DETAIL_PRODUCT,
  PATH_API_BE_UPDATE_PRODUCT,
} from '@constants/router';
import { replaceString } from '@utils/helpers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const response = await axiosInstance.get(
      replaceString(PATH_API_BE_DETAIL_PRODUCT, {
        ':id': id,
      })
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const body: UpdateProductRequest = await req.json();
    const { id: __, ...payload } = body;
    const response = await axiosInstance.put(
      replaceString(PATH_API_BE_UPDATE_PRODUCT, {
        ':id': id,
      }),
      payload
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(error);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const response = await axiosInstance.delete(
      replaceString(PATH_API_BE_DETAIL_PRODUCT, {
        ':id': id,
      })
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(error);
  }
};
