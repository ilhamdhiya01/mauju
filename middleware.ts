/* eslint-disable consistent-return */
import {
  PATH_PAGE_AUTH,
  PATH_PAGE_AUTH_LOGIN,
  PATH_PAGE_DASHBOARD,
} from '@constants/router';
import { sessionOptions } from '@libs/session';
import { getIronSession, IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );

  const isPathStartWithAuth = pathname.startsWith(PATH_PAGE_AUTH);
  const isPathStartWithDashboard = pathname.startsWith(PATH_PAGE_DASHBOARD);

  const user: User | undefined = session?.user;

  if (user?.isLoggedIn) {
    try {
      // ? you already loggedin, redirect to dashboard
      if (isPathStartWithAuth) {
        return NextResponse.redirect(new URL(PATH_PAGE_DASHBOARD, req.url));
      }
    } catch (error) {
      // logout and destroy session
      session.destroy();

      const redirectRes = NextResponse.redirect(
        new URL(PATH_PAGE_AUTH_LOGIN, req.url),
        { headers: res.headers }
      );

      return redirectRes;
    }
  }

  if (isPathStartWithDashboard) {
    if (!user?.isLoggedIn) {
      return NextResponse.redirect(new URL(PATH_PAGE_AUTH_LOGIN, req.url));
    }
  }
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|favicon.ico|ws).*)', // any path except api, public files, and _next files
  ],
};
