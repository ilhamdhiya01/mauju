import React from 'react';
import { components, DropdownIndicatorProps } from 'react-select';
import { css } from '@emotion/css';
import classNames from 'classnames';
import useComponentTheme from '@hooks/shared/useComponentTheme';
import Icon from '../Icon';

const DropdownIndicator: React.FunctionComponent<
  DropdownIndicatorProps<any, boolean, GroupedOption>
> = (props) => {
  const { neutral } = useComponentTheme();
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        className={classNames(
          css({ color: neutral[500] }),
          'w-[18px] h-[18px]'
        )}
        icon="TbChevronDown"
      />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
