import { css } from '@emotion/css';
import classNames from 'classnames';
import React from 'react';
import useScreenComponentTheme from '@hooks/shared/useComponentTheme';
import Icon, { IconComponentProps } from '../Icon';
import Spin from '../Icon/svg/Spin';

type ButtonSize = ComponentSize;
export const BUTTON_VARIANT = ['contained', 'outlined', 'ghost'] as const;
export type ButtonVariant = (typeof BUTTON_VARIANT)[number];
export const BUTTON_TYPE = ['button', 'submit'] as const;
export type ButtonType = (typeof BUTTON_TYPE)[number];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  label?: string;
  type?: ButtonType;
  color?: ThemeVariant;
  fullWidth?: boolean;
  isIconButton?: boolean;
  isHidden?: boolean;
  isLoading?: boolean;
  noMargin?: boolean;
  startIcon?: IconComponentProps;
  endIcon?: IconComponentProps;
  className?: string;
  isRoundedFull?: boolean;
}

type ButtonStyle<Type extends ButtonSize | ButtonVariant> = Partial<{
  [k in Type]: string;
}>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      size = 'normal',
      label,
      startIcon,
      endIcon,
      type = 'button',
      children,
      color,
      fullWidth = false,
      isIconButton = false,
      // isHidden = false,
      isLoading = false,
      noMargin = false,
      className,
      isRoundedFull = false,
      ...restProps
    },
    ref
  ) => {
    const { contrastText, dark, light, lighten, main, neutral } =
      useScreenComponentTheme(color);

    // const hiddenStyle = useHideComponent(isHidden);
    const buttonSize: ButtonStyle<ButtonSize> = {
      large: 'h-[50px] text-sm',
      small: 'h-[30px] text-xs',
      normal: 'h-[38px] text-sm',
    };

    // const buttonStyleWhite = css({
    //   '&:hover': {
    //     background: neutral[50],
    //   },
    //   '&:focus': {
    //     background: neutral[50],
    //     boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.07), 0px 0px 0px 2px ${light}`,
    //   },
    //   '&:disabled': {
    //     color: isLoading ? 'transparent' : neutral[400],
    //     border: `1px solid ${neutral[300]}`,
    //     background: neutral[200],
    //   },

    //   border: `1px solid ${neutral[200]}`,
    //   background: contrastText,
    //   color: isLoading ? 'transparent' : 'black',
    // });

    const buttonStyleContained = css({
      '&:hover': {
        background: dark,
      },
      '&:focus': {
        background: dark,
        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.07), 0px 0px 0px 2px ${light}`,
      },
      '&:disabled': {
        color: isLoading ? 'transparent' : neutral[400],
        border: `1px solid ${neutral[300]}`,
        background: neutral[200],
      },

      border: `1px solid ${main}`,
      background: main,
      color: isLoading ? 'transparent' : contrastText,
    });

    const buttonStyleOutlined = css({
      '&:hover': {
        border: `1px solid ${dark}`,
        background: lighten,
      },
      '&:focus': {
        border: `1px solid ${dark}`,
        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.07), 0px 0px 0px 2px ${light}`,
      },
      '&:disabled': {
        background: 'white',
        color: isLoading ? 'transparent' : neutral[400],
        border: `1px solid ${neutral[300]}`,
      },

      border: `1px solid ${color !== 'neutral' ? main : neutral[300]}`,
      background: 'white',
      // eslint-disable-next-line no-nested-ternary
      color: isLoading
        ? 'transparent'
        : color === 'neutral'
          ? neutral[900]
          : main,
    });

    const buttonStyleGhost = css({
      '&:hover': {
        background: lighten,
      },
      '&:focus': {
        background: 'transparent',
        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.07), 0px 0px 0px 2px ${light}`,
      },
      '&:disabled': {
        color: isLoading ? 'transparent' : neutral[400],
        background: 'transparent',
      },

      background: 'transparent',
      // eslint-disable-next-line no-nested-ternary
      color: isLoading
        ? 'transparent'
        : color === 'neutral'
          ? neutral[900]
          : main,
    });

    const buttonVariant: ButtonStyle<ButtonVariant> = {
      contained: buttonStyleContained,
      outlined: buttonStyleOutlined,
      ghost: buttonStyleGhost,
      // white: buttonStyleWhite,
    };

    const colorStyleContained = css({
      color: contrastText,
    });

    const colorStyleOutlined = css({
      color: color === 'neutral' ? contrastText : main,
    });

    const colorStyleGhost = css({
      color: color === 'neutral' ? contrastText : main,
    });

    const colorVariant: ButtonStyle<ButtonVariant> = {
      contained: colorStyleContained,
      outlined: colorStyleOutlined,
      ghost: colorStyleGhost,
    };

    return (
      <button
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={classNames(
          'transition-all flex flex-shrink-0 gap-2 items-center justify-center font-semibold focus:outline-none outline-none',
          {
            'w-[calc(100%_-_8px)]': fullWidth && !noMargin,
            'w-full': fullWidth && noMargin,
            'p-1.5 aspect-square': isIconButton,
            'px-3 py-2': !isIconButton,
            'm-0': noMargin,
            'm-1': !noMargin,
            'pointer-events-none relative': isLoading,
            'rounded-full': isRoundedFull,
            'rounded-md': !isRoundedFull,
          },
          // hiddenStyle,
          buttonVariant[variant],
          buttonSize[size],
          className
        )}
        {...restProps}
      >
        {startIcon?.isEnabled ? (
          <Icon
            icon={startIcon.icon}
            className={classNames({
              'h-[18px] w-[18px]': size !== 'small',
              'h-4 w-4': size === 'small',
              '-order-1': label,
              'opacity-0': isLoading,
            })}
          />
        ) : null}
        {endIcon?.isEnabled ? (
          <Icon
            icon={endIcon.icon}
            className={classNames({
              'h-[18px] w-[18px]': size !== 'small',
              'h-4 w-4': size === 'small',
              'order-2': label,
            })}
          />
        ) : null}
        {label || null}
        {children}
        {isLoading ? (
          <span
            className={classNames(
              'absolute inset-0 z-10 flex items-center justify-center',
              colorVariant[variant]
            )}
          >
            <Spin />
          </span>
        ) : null}
      </button>
    );
  }
);

export default Button;
