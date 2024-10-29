/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@config/axiosInstance';
import { PATH_API_BE_REGISTER } from '@constants/router';
import { getServerSideSession } from '@libs/session';
import { cloneDeep } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body: RegisterReqBody = await req.json();
    const { name, ...otherReqBody } = body;
    const response: any = await axiosInstance.post<RegisterResBody>(
      PATH_API_BE_REGISTER,
      otherReqBody
    );

    const { token, id } = response;

    const user: User = {
      isLoggedIn: true,
      data: {
        id,
        name,
        authorization: {
          token,
        },
      },
    };

    const userWithoutAuth = cloneDeep(user);
    delete userWithoutAuth.data?.authorization;

    const session = await getServerSideSession();

    session.user = user;
    session.token = token;

    await session.save();

    return NextResponse.json(userWithoutAuth);
  } catch (error: any) {
    return NextResponse.json(error);
  }
};
