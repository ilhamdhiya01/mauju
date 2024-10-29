import { css } from '@emotion/css';
import classNames from 'classnames';
import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Select, {
  type ClassNamesConfig,
  type FormatOptionLabelMeta,
  type MenuPlacement,
  type MenuPosition,
  type MultiValue,
  type OptionsOrGroups,
  type SingleValue,
  type StylesConfig,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useComponentTheme from '@hooks/shared/useComponentTheme';
import Icon from '../Icon';
import DropdownIndicator from './DropdownIndicator';
import ClearIndicator from './ClearIndicator';
import InputLabel from '../InputLabel';
import InputError from '../InputError';
// import useHideComponent from '../../../hooks/general/useHideComponent';
// import InputError from '../InputError';
// import InputLabel from '../InputLabel';

export interface GroupedOption<T = string> {
  readonly label: string;
  readonly options: readonly OptionItem<T>[];
}

type OnChangeValue<Option, IsMulti extends boolean> = IsMulti extends true
  ? MultiValue<Option>
  : SingleValue<Option>;

export interface SelectProps<IsMulti extends boolean = boolean> {
  id?: string;
  label?: string;
  description?: string;
  options: OptionsOrGroups<OptionItem, GroupedOption>;
  value: OptionItem | OptionItem[] | string;
  defaultValue?: OptionItem | OptionItem[] | string;
  menuPlacement?: MenuPlacement;
  menuPosition?: MenuPosition;
  placeholder?: string;
  name?: string;
  errorMessage?: string;
  isError?: boolean;
  isMulti?: IsMulti;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  hidden?: boolean;
  required?: boolean;
  color?: ThemeVariant;
  fullWidth?: boolean;
  labelDirection?: ComponentDirection;
  inputSize?: ComponentSize;
  optionlabelWithIcon?: boolean;
  creatable?: boolean;
  noBorder?: boolean;
  className?: string;
  width?: number | string;
  style?: React.CSSProperties;
  formatOptionLabel?: (data: any) => React.ReactNode;
  onChange: (newValue: OnChangeValue<OptionItem, IsMulti>) => void;
  onCreateOption?: (inputValue: string) => void;
  onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
}

const getLabelOptionsSingle = (
  options: OptionsOrGroups<OptionItem, GroupedOption>,
  value: string
) => {
  if (!value || options.length === 0) {
    return null;
  }
  // return options.filter((option) => option.value === value)[0];
  return options
    .flatMap((option: any) => option.options || option)
    .find((option: OptionItem) => option.value === value);
};

const formatGroupLabel = (data: GroupedOption) => {
  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles: CSSProperties = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };
  return (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
};

const handleCloseMenuOnScroll = (e: Event) => {
  const targetClassName = (e.target as Element).className;
  if (targetClassName) {
    const regexGetMenuList = /\brp-select/;
    return !regexGetMenuList.test(targetClassName);
  }
  return true;
};

const SelectInput = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      id,
      options,
      label,
      description,
      onChange,
      value,
      defaultValue,
      required,
      menuPlacement = 'auto',
      menuPosition = 'fixed',
      isMulti,
      errorMessage,
      color,
      fullWidth = false,
      labelDirection = 'vertical',
      inputSize = 'normal',
      creatable = false,
      optionlabelWithIcon,
      formatOptionLabel,
      // hidden,
      isError,
      onMenuScrollToBottom,
      className,
      width,
      style,
      noBorder = false,
      ...props
    },
    ref
  ) => {
    const [documentBody, setDocumentBody] = useState<HTMLElement>();
    const { contrastText, light, lighten, main, neutral, error } =
      useComponentTheme(color);
    // const hideComponentStyle = useHideComponent(hidden);
    const valueFromOptions = useMemo(() => {
      if (isMulti && typeof value !== 'string') {
        return value;
      }
      return getLabelOptionsSingle(options, value as string);
    }, [isMulti, value, options]);

    const wrapperStyle = css({
      // eslint-disable-next-line no-extra-boolean-cast
      width: !!width ? width : 'auto',
    });
    const containerStyle = css({
      flexDirection: labelDirection === 'horizontal' ? 'row' : 'column',
      alignItems: labelDirection === 'horizontal' ? 'center' : 'start',
      gap: inputSize === 'small' ? '4px' : '4px',
    });

    const selectInputContainerStyle = css({
      '&:hover': {
        border: `1px solid ${errorMessage || isError ? error.main : main} !important`,
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.07) !important',
      },
      '&:focus': {
        border: `1px solid ${errorMessage || isError ? error.main : main} !important`,
        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.07), 0px 0px 0px 2px ${
          errorMessage || isError ? error.light : light
        } !important`,
      },
      '&:disabled': {
        border: `1px solid ${neutral[300]} !important`,
        background: `${neutral[100]} !important`,
      },
      cursor: 'pointer !important',
      // minHeight: '30px !important',
      border: noBorder
        ? '1px solid transparent !important'
        : `1px solid ${errorMessage || isError ? error.main : neutral[200]} !important`,
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.07) !important',
      borderRadius: '6px !important',
    });

    const selectInputMenuContainerStyle = css({
      border: `1px solid ${neutral[200]} !important`,
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.07) !important',
      background: 'white !important',
      borderRadius: '6px !important',
    });

    const optionStyle = css({
      borderBottom: `1px solid ${neutral[200]} !important`,
      '&:last-child': {
        borderBottom: `none !important`,
      },
    });

    const descriptionStyle = css({
      color: neutral[600],
    });

    const descriptionTextSizeStyle: InputStyle<ComponentSize> = {
      small: 'text-xs',
      normal: 'text-xs',
      large: 'text-xm',
    };

    const selectInputOptionHoverStyle = (isHover: boolean) =>
      isHover
        ? css({
            background: `${errorMessage || isError ? error.lighten : lighten} !important`,
            color: 'black !important',
          })
        : '';

    const selectInputOptionSelectedStyle = (isSelected: boolean) =>
      isSelected
        ? css({
            background: `${errorMessage || isError ? error.main : main} !important`,
            color: `${contrastText} !important`,
          })
        : '';

    const selectInputClass: ClassNamesConfig<any, boolean, GroupedOption> = {
      container: () =>
        classNames(
          '!transition-all !flex-1',
          { '!w-full': !width && fullWidth },
          css({ width: width ?? 'auto' })
        ),
      control: (styles) => {
        if (isMulti) {
          return classNames(
            selectInputContainerStyle,
            {
              '!min-h-[30px] !px-[8px] !py-[4px]': inputSize === 'small',
              '!min-h-[40px] !px-[10px] !py-[8px]': inputSize === 'normal',
              '!min-h-[52px] !px-[12px] !py-[10px]': inputSize === 'large',
            },
            {
              ...styles,
            }
          );
        }
        return classNames(selectInputContainerStyle, {
          '!min-h-[30px] !h-[30px] !px-[8px] !py-[4px]': inputSize === 'small',
          '!min-h-[40px] !h-[40px] !p-[10px] !py-[8px]': inputSize === 'normal',
          '!min-h-[52px] !h-[52px] !px-[12px] !py-[10px]':
            inputSize === 'large',
        });
      },
      singleValue: () =>
        classNames('!text-black !font-normal', {
          '!text-xs': inputSize !== 'large',
          '!text-sm': inputSize === 'large',
        }),
      multiValue: (styles) =>
        classNames(
          '!rounded-md !border !m-0 !font-normal',
          {
            ...styles,
          },
          css({
            backgroundColor: `${errorMessage || isError ? error.lighten : lighten} !important`,
            borderColor: `${errorMessage || isError ? error.light : light} !important`,
          })
        ),
      multiValueLabel: (styles) =>
        classNames(
          // '!font-semibold',
          {
            ...styles,
            '!text-[10px] !px-1 !py-px': inputSize === 'small',
            '!text-xs': inputSize === 'normal',
            '!text-sm': inputSize === 'large',
          },
          css({
            color: `${errorMessage || isError ? error.main : main} !important`,
          })
        ),
      placeholder: () =>
        classNames(`!text-[${neutral[400]}] !truncate !font-normal`, {
          '!text-xs': inputSize !== 'large',
          '!text-sm': inputSize === 'large',
        }),
      input: () =>
        classNames(
          '!overflow-hidden !p-0 !m-0 [&>input:focus]:!border-none [&>input:focus]:!ring-0 !text-black [&>input:focus]:!outline-none',
          {
            '!text-xs': inputSize !== 'large',
            '!text-sm': inputSize === 'large',
          }
        ),
      menu: () => selectInputMenuContainerStyle,
      noOptionsMessage: () =>
        classNames(`!text-[${neutral[400]}] !truncate`, {
          '!text-xs': inputSize !== 'large',
          '!text-sm': inputSize === 'large',
        }),
      indicatorSeparator: () => '!hidden',
      valueContainer: () =>
        classNames('!p-0 !pr-3 !h-full', {
          'gap-1.5': isMulti && inputSize !== 'large',
          'gap-2': isMulti && inputSize === 'large',
        }),
      dropdownIndicator: () => '!p-0',
      option: ({ isFocused, isSelected }) =>
        classNames(
          '!text-black !cursor-pointer',
          optionStyle,
          {
            '!text-xs': inputSize !== 'large',
            '!text-sm': inputSize === 'large',
          },
          selectInputOptionHoverStyle(isFocused && !isSelected),
          selectInputOptionSelectedStyle(
            isSelected || (isSelected && isFocused)
          )
        ),
      clearIndicator: () => '!p-0',
    };
    const selectInputStyle: StylesConfig<any, boolean, GroupedOption> = {
      option: (styles, { isDisabled }) => ({
        ...styles,
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? 'not-allowed' : 'default',
      }),
      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    };

    const formatOptionLabelWithIcon = (data: OptionItem) => (
      <div className="flex items-center w-full gap-2">
        <div
          className={classNames('shrink-0', {
            'w-3 h-3': inputSize !== 'large',
            'w-3.5 h-3.5': inputSize === 'large',
          })}
        >
          {data?.data?.icon && (
            <Icon icon={data.data.icon} className="w-full h-full" />
          )}
        </div>
        <p
          className={classNames('truncate', {
            'text-xs': inputSize !== 'large',
            'text-sm': inputSize === 'large',
          })}
        >
          {data.label}
        </p>
      </div>
    );

    // const formatOptionLabelDefault = undefined;
    const formatOptionLabelDefault = (
      data: OptionItem,
      formatOptionLabelMeta: FormatOptionLabelMeta<any>
    ) => {
      // console.debug('🚀 ~ data:', data);
      // console.debug('🚀 ~ formatOptionLabelMeta:', formatOptionLabelMeta);
      const isSingleValueSelected =
        formatOptionLabelMeta.context === 'value' &&
        formatOptionLabelMeta.selectValue.length === 1 &&
        formatOptionLabelMeta.selectValue[0].value === data.value;
      return (
        <div className="flex flex-col w-full gap-1">
          {data.label}
          {data.description && !isSingleValueSelected && (
            <span className="text-xs react-select__option-description opacity-60">
              {data.description}
            </span>
          )}
        </div>
      );
    };

    useEffect(() => {
      setDocumentBody(document.body);
    }, []);

    return (
      <div
        data-testid="select-input"
        ref={ref}
        className={classNames(
          {
            // 'w-[210px]': !fullWidth && !shrinkWidth,
            auto: !fullWidth,
            'w-full': fullWidth,
          },
          wrapperStyle,
          // hideComponentStyle,
          className
        )}
        style={style}
      >
        <div className={classNames('flex w-full', containerStyle)}>
          {label && (
            <InputLabel
              required={required}
              inputSize={inputSize}
              label={label}
              htmlFor={id}
              fontWeight="bold"
              isNoMarginBottom={labelDirection === 'horizontal'}
            />
          )}
          {creatable ? (
            <CreatableSelect
              id={id}
              value={valueFromOptions}
              options={options}
              required={required}
              isMulti={isMulti}
              menuPlacement={menuPlacement}
              maxMenuHeight={200}
              menuPortalTarget={documentBody}
              menuPosition={menuPosition}
              closeMenuOnScroll={handleCloseMenuOnScroll}
              classNamePrefix="rp-select"
              onChange={(newValue) => onChange(newValue)}
              // styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              styles={selectInputStyle}
              classNames={selectInputClass}
              formatGroupLabel={formatGroupLabel}
              formatOptionLabel={
                optionlabelWithIcon
                  ? formatOptionLabelWithIcon
                  : (formatOptionLabel ?? formatOptionLabelDefault)
              }
              components={{ DropdownIndicator, ClearIndicator }}
              onMenuScrollToBottom={onMenuScrollToBottom}
              defaultValue={defaultValue as any}
              {...props}
            />
          ) : (
            <Select
              id={id}
              value={valueFromOptions}
              options={options}
              required={required}
              isMulti={isMulti}
              menuPlacement={menuPlacement}
              maxMenuHeight={200}
              menuPortalTarget={documentBody}
              menuPosition={menuPosition}
              closeMenuOnScroll={handleCloseMenuOnScroll}
              classNamePrefix="rp-select"
              onChange={(newValue) => onChange(newValue)}
              styles={selectInputStyle}
              classNames={selectInputClass}
              formatGroupLabel={formatGroupLabel}
              formatOptionLabel={
                optionlabelWithIcon
                  ? formatOptionLabelWithIcon
                  : (formatOptionLabel ?? formatOptionLabelDefault)
              }
              components={{ DropdownIndicator, ClearIndicator }}
              onMenuScrollToBottom={onMenuScrollToBottom}
              defaultValue={defaultValue as any}
              {...props}
            />
          )}
          {errorMessage && <InputError errorMessage={errorMessage} />}
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
      </div>
    );
  }
);

export default SelectInput;
