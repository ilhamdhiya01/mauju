/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getServerSideSession } from '@libs/session';
import axiosInstance from '@config/axiosInstance';
import { replaceString } from '@utils/helpers';
import { PATH_API_BE_USER_DETAIL } from '@constants/router';

export const GET = async () => {
  const session = await getServerSideSession();

  if (session.user) {
    const userData = session.user;
    const response = await axiosInstance.get<UserData>(
      replaceString(PATH_API_BE_USER_DETAIL, {
        ':id': userData.data?.id,
      })
    );
    if (response.data) {
      return NextResponse.json({
        ...userData,
        isLoggedIn: true,
        data: {
          id: response.data.id,
          name: `${response.data.first_name} ${response.data.last_name}`,
          email: response.data.email,
          avatar: response.data.avatar,
        },
      });
    }
  }
  return NextResponse.json({
    isLoggedIn: false,
    data: null,
  });
};
