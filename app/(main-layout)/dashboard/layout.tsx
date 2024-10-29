import { Metadata } from 'next';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardLayout = ({ children }: Props) => <>{children}</>;

export default DashboardLayout;
