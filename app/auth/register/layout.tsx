import React from 'react';
import { Metadata } from 'next';

type Props = {
  children?: React.ReactNode;
  // props....
};

export const metadata: Metadata = {
  title: 'Register Page',
  description: 'Go Finance',
};

// ?======================================================//
const BudgetAssumptionLayout = ({ children }: Props) => <>{children}</>;

export default BudgetAssumptionLayout;
