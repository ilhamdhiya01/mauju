'use client';

import { PATH_PAGE_AUTH_LOGIN } from '@constants/router';
import useUser from '@hooks/shared/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RootPage = () => {
  const { dataUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!dataUser?.isLoggedIn) {
      router.replace(PATH_PAGE_AUTH_LOGIN);
    }
  }, [dataUser?.isLoggedIn, router]);
  return <div />;
};

export default RootPage;
