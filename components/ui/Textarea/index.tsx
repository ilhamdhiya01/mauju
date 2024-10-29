import React, { forwardRef, InputHTMLAttributes, useMemo } from 'react';
import { css } from '@emotion/css';
import classNames from 'classnames';
// import useHideComponent from '../../../hooks/general/useHideComponent';
import useScreenComponentTheme from '@hooks/shared/useComponentTheme';
import InputLabel from '../InputLabel';
import InputError from '../InputError';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isError?: boolean;
  hidden?: boolean;
  color?: ThemeVariant;
  inputSize?: ComponentSize;
}

const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  (
    {
      label,
      description,
      required,
      errorMessage,
      isError,
      color,
      // hidden,
      inputSize,
      id,
      ...props
    }: TextAreaProps,
    ref
  ) => {
    const { light, main, neutral, error } = useScreenComponentTheme(color);
    // const hideComponentStyle = useHideComponent(hidden);

    const rows = useMemo(() => {
      switch (inputSize) {
        case 'large':
          return 4;
        case 'normal':
          return 2;
        default:
          return 1;
      }
    }, [inputSize]);

    const inputStyle = css({
      '&:hover': {
        border: `1px solid ${main}`,
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.07)',
      },
      '&:focus': {
        border: `1px solid ${main}`,
        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.07), 0px 0px 0px 2px ${light}`,
      },
      '&:disabled': {
        border: `1px solid ${neutral[300]}`,
        background: neutral[100],
      },

      border: `1px solid ${
        errorMessage || isError ? error.main : neutral[200]
      }`,
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.07)',
    });

    return (
      <div ref={ref} className={classNames('my-1')}>
        {label && (
          <InputLabel
            required={required}
            inputSize="normal"
            label={label}
            fontWeight="bold"
          />
        )}
        <textarea
          {...props}
          id={id}
          name={id}
          required={required}
          rows={rows}
          className={classNames(
            'transition-all bg-white text-black text-sm rounded-md focus:outline-none outline-none  block w-full px-[12px] py-[10px]',
            inputStyle,
            `placeholder-[${neutral[400]}]`
          )}
        />
        {errorMessage && <InputError errorMessage={errorMessage} />}
        {description && <p className="mt-2 text-xs">{description}</p>}
      </div>
    );
  }
);

export default TextArea;
