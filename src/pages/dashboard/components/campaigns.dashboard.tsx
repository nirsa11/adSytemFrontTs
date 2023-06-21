import { Outlet } from 'react-router-dom';
import { SubNavBar } from '../../../ui/subNav.ui';

export const Campaign = (): JSX.Element => {
  return (
    <>
      <SubNavBar></SubNavBar>
      <Outlet />
    </>
  );
};
