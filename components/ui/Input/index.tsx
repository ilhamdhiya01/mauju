/* eslint-disable no-nested-ternary */
import React, {
  forwardRef,
  InputHTMLAttributes,
  MouseEventHandler,
} from 'react';
import { css } from '@emotion/css';
import classNames from 'classnames';
import useScreenComponentTheme from '@hooks/shared/useComponentTheme';
import InputLabel from '../InputLabel';
import InputError from '../InputError';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isError?: boolean;
  hidden?: boolean;
  inputSize?: ComponentSize;
  inputPrefix?: string | React.ReactElement;
  inputSuffix?: string | React.ReactElement;
  prefixSuffixSeparator?: boolean;
  prefixOnClick?: MouseEventHandler | undefined;
  suffixOnClick?: MouseEventHandler | undefined;
  fullWidth?: boolean;
  noBorder?: boolean;
  color?: ThemeVariant;
  noMargin?: boolean;
  isRoundedFull?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      required,
      inputSize = 'normal',
      color,
      errorMessage,
      isError,
      id,
      inputPrefix,
      inputSuffix,
      prefixSuffixSeparator = true,
      // hidden,
      className,
      fullWidth,
      noBorder = false,
      noMargin = false,
      disabled,
      style,
      type,
      prefixOnClick,
      suffixOnClick,
      isRoundedFull,
      ...props
    }: InputProps,
    ref
  ) => {
    const { light, lighten, main, neutral, error } =
      useScreenComponentTheme(color);
    // const hideComponentStyle = useHideComponent(hidden);

    const inputContainerStyle = css({
      '&:hover': {
        border: !disabled
          ? `1px solid ${errorMessage || isError ? error.main : main}`
          : '',
        boxShadow: !disabled
          ? `0px 1px 3px 0px ${errorMessage || isError ? error.light : lighten}`
          : '',
      },
      '&:focus-within': {
        border: `1px solid ${errorMessage || isError ? error.main : main}`,
        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.07), 0px 0px 0px 2px ${errorMessage || isError ? error.light : light}`,
      },
      background: disabled ? neutral[100] : 'white',
      border: noBorder
        ? '1px solid transparent'
        : `1px solid ${disabled ? neutral[300] : errorMessage || isError ? error.main : neutral[200]}`,
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.07)',
    });

    const inputStyle = css({
      '&:disabled': {
        background: neutral[100],
      },
    });

    const prefixSyffixStyle = css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: neutral[500],
    });

    const prefixStyle = css({
      borderRight: prefixSuffixSeparator
        ? `1px solid ${neutral[disabled ? 300 : 200]}`
        : 'none',
    });

    const suffixStyle = css({
      borderLeft: prefixSuffixSeparator
        ? `1px solid ${neutral[disabled ? 300 : 200]}`
        : 'none',
    });

    const paddingSizeStyle: InputStyle<ComponentSize> = {
      small: 'px-[10px] py-[6px] max-h-[30px]',
      normal: 'px-[12px] py-[10px] max-h-[38px]',
      large: 'px-[12px] py-[13px] max-h-[50px]',
    };

    const inputSizeStyle: InputStyle<ComponentSize> = {
      small: 'text-xs',
      normal: 'text-sm',
      large: 'text-base',
    };

    const descriptionStyle = css({
      color: neutral[600],
    });

    const descriptionTextSizeStyle: InputStyle<ComponentSize> = {
      small: 'text-xs',
      normal: 'text-xs',
      large: 'text-xm',
    };

    return (
      <div
        // ref={ref}
        className={classNames({
          'w-full': fullWidth,
          'my-1': !noMargin,
        })}
        style={style}
      >
        {/* //? Label ----------------------------------------- */}
        {label && (
          <InputLabel
            required={required}
            inputSize={inputSize}
            label={label}
            fontWeight="bold"
            htmlFor={id}
          />
        )}
        {/* //? Container ----------------------------------------- */}
        <div
          className={classNames(
            'inline-flex transition-all overflow-hidden',
            inputContainerStyle,
            {
              'w-full': fullWidth,
              'rounded-full': isRoundedFull,
              'rounded-md': !isRoundedFull,
            }
          )}
        >
          {/* //? Prefix ----------------------------------------- */}
          {inputPrefix && (
            <>
              {prefixOnClick ? (
                <button
                  type="button"
                  onClick={prefixOnClick}
                  className={classNames(
                    'rounded-s-md transition-all hover:opacity-70',
                    prefixSyffixStyle,
                    prefixStyle,
                    paddingSizeStyle[inputSize],
                    inputSizeStyle[inputSize]
                  )}
                >
                  {inputPrefix}
                </button>
              ) : (
                <span
                  className={classNames(
                    'rounded-s-md',
                    prefixSyffixStyle,
                    prefixStyle,
                    paddingSizeStyle[inputSize],
                    inputSizeStyle[inputSize]
                  )}
                >
                  {inputPrefix}
                </span>
              )}
            </>
          )}
          {/* //? Input ----------------------------------------- */}
          <input
            {...props}
            ref={ref}
            // ref={inputRef}
            id={id}
            name={id}
            required={required}
            disabled={disabled}
            type={type}
            className={classNames(
              'text-black focus:outline-none outline-none block font-normal',
              inputStyle,
              paddingSizeStyle[inputSize],
              inputSizeStyle[inputSize],
              `placeholder-[${neutral[400]}]`,
              {
                'w-full': fullWidth,
                'rounded-e-md': inputPrefix && !inputSuffix,
                'rounded-s-md': inputSuffix && !inputPrefix,
                'rounded-md': !inputSuffix && !inputPrefix,
                'rounded-none': inputSuffix && inputPrefix,
              },
              className
            )}
            {...((type === 'datetime-local' || type === 'time') && {
              step: 1,
            })}
            {...(type === 'number' && {
              step: 'any',
            })}
          />
          {/* //? Suffix ----------------------------------------- */}
          {inputSuffix && (
            <>
              {suffixOnClick ? (
                <button
                  type="button"
                  onClick={suffixOnClick}
                  className={classNames(
                    'rounded-e-md transition-all hover:opacity-70',
                    prefixSyffixStyle,
                    suffixStyle,
                    paddingSizeStyle[inputSize],
                    inputSizeStyle[inputSize]
                  )}
                >
                  {inputSuffix}
                </button>
              ) : (
                <span
                  className={classNames(
                    'rounded-e-md',
                    prefixSyffixStyle,
                    suffixStyle,
                    paddingSizeStyle[inputSize],
                    inputSizeStyle[inputSize]
                  )}
                >
                  {inputSuffix}
                </span>
              )}
            </>
          )}
        </div>
        {/* //? Error ----------------------------------------- */}
        {errorMessage && <InputError errorMessage={errorMessage} />}
        {/* //? Description ----------------------------------------- */}
        {description && (
          <p
            className={classNames(
              'mt-2 font-light',
              descriptionStyle,
              descriptionTextSizeStyle[inputSize]
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
