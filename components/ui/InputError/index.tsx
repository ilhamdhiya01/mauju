import { css } from '@emotion/css';
import React from 'react';
import classNames from 'classnames';
import useScreenComponentTheme from '@hooks/shared/useComponentTheme';
import Icon from '../Icon';

interface InputErrorProps {
  errorMessage: string;
}

const InputError = ({ errorMessage }: InputErrorProps) => {
  const { main } = useScreenComponentTheme('danger');
  const textColor = css({
    color: main,
  });

  return (
    <>
      {errorMessage && errorMessage !== '' ? (
        <div
          className={classNames(
            'flex items-center gap-1 mt-1 text-xs',
            textColor
          )}
        >
          <Icon icon="TbAlertCircleFilled" className="w-4 h-4" />
          {errorMessage}
        </div>
      ) : null}
    </>
  );
};

export default InputError;
