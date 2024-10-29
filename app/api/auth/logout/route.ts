/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSideSession } from '@libs/session';
import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    const session = await getServerSideSession();
    console.log('session', session);

    session.destroy();

    return NextResponse.json({
      isLoggedIn: false,
      data: null,
    });
  } catch (error: any) {
    return NextResponse.json(error);
  }
};
