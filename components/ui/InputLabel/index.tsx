import React from 'react';
import classNames from 'classnames';
import useComponentTheme from '@hooks/shared/useComponentTheme';

type InputLabelProps = {
  label?: string;
  required?: boolean;
  inputSize?: ComponentSize;
  fontWeight?: ComponentFontWeight;
  isNoMarginBottom?: boolean;
  htmlFor?: string;
};

type LabelStyle<Type extends ComponentSize | ComponentFontWeight> = Partial<{
  [k in Type]: string;
}>;

const InputLabel = ({
  htmlFor,
  isNoMarginBottom,
  label,
  required,
  inputSize = 'normal',
  fontWeight = 'normal',
}: InputLabelProps) => {
  const { neutral } = useComponentTheme();
  const labelSizeStyle: LabelStyle<ComponentSize> = {
    small: 'text-xs',
    normal: 'text-sm',
    large: 'text-base',
  };
  const fontWeightStyle: LabelStyle<ComponentFontWeight> = {
    bold: 'font-semibold',
    normal: 'font-normal',
    light: 'font-light',
  };

  return (
    <label
      className={classNames(
        'block',
        labelSizeStyle[inputSize],
        fontWeightStyle[fontWeight],
        `text-[${neutral[600]}]`,
        {
          'mb-2': !isNoMarginBottom,
        }
      )}
      htmlFor={htmlFor}
    >
      {label}
      {required && ' *'}
    </label>
  );
};

export default InputLabel;
