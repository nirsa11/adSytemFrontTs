import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/userSlice';
import { removeCookies } from '../../common/utils';
import { DashboardLayout } from '../../layout/dashboard.layout';
import { RootState } from '../../redux/store';
import { UserEntity } from '../../common/types/entities/user.entity';

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
