import { ReactNode } from 'react';

export interface NavTabsProps {
  isDefault?: boolean;
  notRender?: boolean;
  disabled?: boolean;
  Component: ReactNode;
  key: string;
  title: string;
  shrink: boolean;
}

export interface TabsProps {
  tabsProps: NavTabsProps[];
  setShrink?: Function;
}
