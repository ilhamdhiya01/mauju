'use client';

import React from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/Dropdown';
import Icon from '@components/ui/Icon';
import useUser from '@hooks/shared/useUser';
import Image from 'next/image';
import { logout } from '@services/fetcher/auth';
import { PATH_PAGE_AUTH_LOGIN } from '@constants/router';

const NavigationUserDropdown = () => {
  const { dataUser } = useUser();
  const router = useRouter();

  const { mutate: mutateLogout } = useMutation({
    mutationFn: logout,
    onSuccess: (res: User) => {
      if (!res.isLoggedIn) {
        router.replace(PATH_PAGE_AUTH_LOGIN);
      }
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="inline-flex items-center gap-2 cursor-pointer hover:opacity-85 transition duration-150">
            <div className="w-8 h-8 rounded-full bg-neutral-300 border flex overflow-hidden">
              <Image
                src={dataUser?.data?.avatar as string}
                alt="logo"
                width={33}
                height={25}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white font-semibold">
                {dataUser?.data?.name}
              </span>
              <span className="text-xs text-white">Sales Lead</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10 min-w-56 bg-white">
          <DropdownMenuLabel>
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center overflow-hidden bg-neutral-300 rounded-full w-6 h-6 lg:w-8 lg:h-8">
                <div className="w-8 h-8 rounded-full bg-neutral-300 border flex overflow-hidden">
                  <Image
                    src={dataUser?.data?.avatar as string}
                    alt="logo"
                    width={33}
                    height={25}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col text-[12px]">
                <label className="font-semibold text-black">
                  {dataUser?.data?.name}
                </label>
                <label>Sales Lead</label>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-[12px] cursor-pointer"
            onClick={() => router.push('/profile')}
          >
            <Icon icon="TbUser" fontSize={15} className="mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-[12px] cursor-pointer"
            onClick={() => mutateLogout()}
          >
            <Icon icon="TbLogout" fontSize={15} className="mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NavigationUserDropdown;
