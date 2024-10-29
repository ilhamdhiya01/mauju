'use client';

import Ellipse from '@components/module/auth/Ellipse';
import Button from '@components/ui/Button';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const BudgetAssumptionLayout = ({ children }: Props) => (
  <>
    <div className="box-border relative w-full min-h-screen grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-2 border-r h-full hidden md:block bg-custom-gradient relative overflow-hidden">
        <Ellipse />
        <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2">
          <h1 className="text-4xl font-bold text-white">GoFinance</h1>
          <span className="text-[18px] text-white block">
            Lorem ipsum dolor sit amet
          </span>
          <Button
            variant="contained"
            color="secondary"
            noMargin
            label="Read More"
            isRoundedFull
          />
        </div>
      </div>
      <div className="h-full col-span-3 md:col-span-1 relative">{children}</div>
    </div>
  </>
);

export default BudgetAssumptionLayout;
