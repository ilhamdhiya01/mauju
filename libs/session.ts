import { SITE_COOKIE_NAME } from '@constants/site';
import { getIronSession, IronSessionData, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export const sessionOptions: SessionOptions = {
  cookieName: SITE_COOKIE_NAME,
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
    token: string;
  }
}

export const getServerSideSession = (cookieOptions?: any) => {
  const customSessionOption = {
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      ...cookieOptions,
    },
  };
  return getIronSession<IronSessionData>(cookies(), customSessionOption);
};
