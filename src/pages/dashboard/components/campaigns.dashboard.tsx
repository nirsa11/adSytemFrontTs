import { Outlet } from 'react-router-dom';
import { SubNavBar } from '../../../ui/subNav.ui';

/**
 * Renders the Campaign component, which displays a sub navigation bar and an outlet
 * for rendering child components.
 * @returns {JSX.Element} - The Campaign component.
 */
export const Campaign = (): JSX.Element => {
  return (
    <>
      <div className="campaigns-dashboard col-md-12 d-flex flex-column align-items-stretch">
        <SubNavBar />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};