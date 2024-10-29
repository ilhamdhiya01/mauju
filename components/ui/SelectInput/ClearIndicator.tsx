import React from 'react';
import { components, ClearIndicatorProps, GroupBase } from 'react-select';
import { css } from '@emotion/css';
import classNames from 'classnames';
import useComponentTheme from '@hooks/shared/useComponentTheme';
import Icon from '../Icon';

// eslint-disable-next-line react/function-component-definition
function ClearIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: ClearIndicatorProps<Option, IsMulti, Group>) {
  const { neutral } = useComponentTheme();
  return (
    <components.ClearIndicator {...props}>
      <Icon
        className={classNames(
          css({
            color: neutral[500],
            '&:hover': {
              backgroundColor: neutral[200],
            },
          }),
          'w-[18px] h-[18px] rounded p-0.5 mr-0.5'
        )}
        icon="TbX"
      />
    </components.ClearIndicator>
  );
}

export default ClearIndicator;
