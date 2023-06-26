import { Outlet } from 'react-router-dom';
import { SubNavBar } from '../../../ui/subNav.ui';

export const Campaign = (): JSX.Element => {
  return (
    <>
      <div className="col-md-12 d-flex flex-column align-items-center " style={{ height: '70vh' }}>
        <SubNavBar />
        <Outlet />
      </div>
    </>
  );
};
