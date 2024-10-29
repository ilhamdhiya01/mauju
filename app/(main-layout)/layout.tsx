'use client';

import Navbar from '@components/shared/Navbar';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default MainLayout;
