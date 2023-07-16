import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '../../layout/dashboard.layout';

/**
 * A functional component that renders the dashboard page layout and its child components.
 * @returns {JSX.Element} - The rendered dashboard page layout and its child components.
 */
export const DashboardPage = (): JSX.Element => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};