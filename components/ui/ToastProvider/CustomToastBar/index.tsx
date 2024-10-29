import classNames from 'classnames';
import React, { useMemo } from 'react';
import Icon from '@components/ui/Icon';
import Spinner from '@components/ui/Spinner';
import { ToastType } from '..';

interface CustomToastBarProps {
  type: ToastType;
  message: string;
  errorId?: string;
}

const CustomToastBar = ({ type, message, errorId }: CustomToastBarProps) => {
  const { light, main, textColor } = useMemo(() => {
    switch (type) {
      case 'success':
        return {
          main: 'bg-green-500',
          light: 'bg-green-100',
          textColor: 'text-green-500',
        };
      case 'error':
        return {
          main: 'bg-red-500',
          light: 'bg-red-100',
          textColor: 'text-red-500',
        };
      case 'warning':
        return {
          main: 'bg-orange-500',
          light: 'bg-orange-100',
          textColor: 'text-orange-500',
        };
      case 'loading':
        return {
          main: 'bg-neutral-500',
          light: 'bg-neutral-100',
          textColor: 'text-neutral-500',
        };
      default:
        return {
          main: 'bg-blue-500',
          light: 'bg-blue-100',
          textColor: 'text-blue-500',
        };
    }
  }, [type]);

  const icon = useMemo(() => {
    switch (type) {
      case 'success':
        return <Icon icon="TbCircleCheckFilled" fontSize={20} />;
      case 'error':
        return <Icon icon="TbCircleXFilled" fontSize={20} />;
      case 'warning':
        return <Icon icon="TbAlertTriangleFilled" fontSize={20} />;
      case 'loading':
        return <Spinner />;
      default:
        return <Icon icon="TbInfoCircleFilled" fontSize={20} />;
    }
  }, [type]);

  return (
    <>
      <div className={classNames('w-[8px] rounded-s-md', main)} />
      <div className={classNames('flex gap-3 p-2 items-center')}>
        <div
          className={classNames(
            'flex flex-[1_0_32px] items-center justify-center w-8 h-8 rounded-full',
            light,
            textColor
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col items-start justify-center text-sm">
          <p className="font-semibold">{message}</p>
          {errorId && <p className="text-xs">ID: {errorId}</p>}
        </div>
      </div>
    </>
  );
};

export default CustomToastBar;
