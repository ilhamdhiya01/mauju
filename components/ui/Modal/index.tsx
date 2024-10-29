/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Root } from '@radix-ui/react-portal';
import { css } from '@emotion/css';
import useScreenComponentTheme from '@hooks/shared/useComponentTheme';
import Icon from '../Icon';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  size: ComponentSize;
  className?: string;
  containerClassName?: string;
  childrenClassName?: string;
  container?: HTMLElement | null;
  closeOnEscKeyPress?: boolean;
  disableClose?: boolean;
  handleClose?: () => void;
}

const Modal = ({
  isOpen,
  size,
  title,
  className,
  handleClose,
  children,
  container = null,
  closeOnEscKeyPress = false,
  disableClose = false,
  containerClassName,
  childrenClassName,
}: React.PropsWithChildren<ModalProps>) => {
  const { neutral } = useScreenComponentTheme();

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === 'Escape' && closeOnEscKeyPress && handleClose) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, handleClose, closeOnEscKeyPress]);

  const modalMaxWeight: Record<ComponentSize, string> = {
    small: '36vw',
    normal: '50vw',
    large: '83vw',
  };

  const modalSizeStyle = css({
    maxWidth: modalMaxWeight[size],
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Root className="absolute inset-0 w-full h-full" container={container}>
      <div
        role="dialog"
        className={classNames(
          'absolute inset-0 z-50 p-5 flex items-center justify-center bg-black/50',
          containerClassName
        )}
      >
        <div
          className={classNames(
            'bg-white rounded-lg shadow-md w-full flex flex-col max-h-full relative',
            modalSizeStyle,
            className
          )}
        >
          {handleClose && (
            <button
              type="button"
              onClick={disableClose ? () => {} : handleClose}
              disabled={disableClose}
              className={classNames(
                'absolute z-20 -mt-px top-2.5 right-3 flex justify-center items-center w-8 h-8 hover:opacity-60 transition-all',
                { 'opacity-50 pointer-events-none': disableClose }
              )}
            >
              <Icon icon="TbX" className="w-[18px] h-[18px]" />
            </button>
          )}
          {title && (
            <header
              className="px-5 py-3 border-b"
              style={{ borderBottomColor: neutral[200] }}
            >
              <h3 className="text-base font-semibold">{title}</h3>
            </header>
          )}
          <div
            className={classNames(
              'flex h-full overflow-y-auto px-5 pt-5 pb-4',
              childrenClassName
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </Root>
  );
};

export default Modal;
