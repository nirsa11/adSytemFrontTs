import { Outlet } from 'react-router-dom';
import { SubNavBar } from '../../../ui/subNav.ui';

export const Campaign = (): JSX.Element => {
  return (
    <>
      <div className="col-md-12 d-flex flex-column align-items-stretch" style={{ height: '85vh' }}>
        <SubNavBar />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
