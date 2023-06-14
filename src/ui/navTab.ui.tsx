import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Fade } from 'react-bootstrap';
import { ReactNode } from 'react';
import { NavTabsProps, TabsProps } from '../common/types/interface/ui/navTabsProps.interface';

export const NavTabs: React.FC<TabsProps> = ({ tabsProps, setShrink }) => {
  const getDefault = (): string => {
    const defaultProp: NavTabsProps = tabsProps.find((prop) => prop.isDefault)!;

    return defaultProp.key;
  };

  const [defaultTab, setDefault] = useState(getDefault());

  const IsShrink = (key: string): boolean => {
    return !tabsProps.find((prop) => prop.key === key && prop.shrink);
  };

  const handleSelect = (event: string) => {
    if (IsShrink(event)) {
      setShrink(true);
    } else {
      setShrink(false);
    }
  };

  return (
    <Tabs
      defaultActiveKey={defaultTab}
      className="d-flex flex-row"
      transition={Fade}
      onSelect={handleSelect}
    >
      {tabsProps.map((prop) => {
        return (
          <Tab key={prop.key} eventKey={prop.key} title={prop.title} disabled={prop.disabled}>
            {prop.Component}
          </Tab>
        );
      })}
    </Tabs>
  );
};
