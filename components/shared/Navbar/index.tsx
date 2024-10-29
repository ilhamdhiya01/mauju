'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import { useRouter } from 'next/navigation';
import { PATH_PAGE_DASHBOARD } from '@constants/router';
import NavigationUserDropdown from './NavigationUserDropdown';

const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <header className="sticky top-0 bg-[#0571E1] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)] z-10">
        <nav className="flex justify-between px-5 md:px-20">
          <div className="items-center py-3">
            <h2
              className="font-bold text-white cursor-pointer"
              onClick={() => router.push(PATH_PAGE_DASHBOARD)}
            >
              GoFinance
            </h2>
          </div>
          <div className="border-l-2 border-blue-800 flex items-center pl-5">
            <NavigationUserDropdown />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
