import React from 'react';
import * as TablerIcon from 'react-icons/tb';

export type IconName = keyof typeof TablerIcon;

export type IconComponentProps = {
  isEnabled: boolean;
  icon: IconName;
};

export const icons = Object.keys(TablerIcon) as IconName[];

export const iconsWithoutTb = icons.map((icon) => icon.slice(2)) as IconName[];

export const popularIcons: IconName[] = [
  'TbPlus',
  'TbHome',
  'TbTrash',
  'TbUser',
  'TbSearch',
  'TbUsersGroup',
  'TbStar',
  'TbSend',
  'TbUpload',
  'TbDownload',
  'TbEdit',
  'TbSettings',
  'TbFile',
  'TbFolder',
  'TbDeviceFloppy',
  'TbBookmark',
];

interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: IconName;
}

const Icon = ({ icon, ...props }: IconProps) => {
  const IconComponent = TablerIcon[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
};

export default Icon;
