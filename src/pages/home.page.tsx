import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import { removeCookies } from '../common/utils';

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(setUser(null));
    removeCookies('accessToken');
    removeCookies('tokenTime');

    navigate('/auth');
  };

  return (
    <div className="home d-flex justify-content-center ">
      {' '}
      <Link to="/dashboard/edit-profile" className="m-2">
        go to edit profile
      </Link>
      <br></br>
      <Link to="/auth" onClick={logOut}>
        logout
      </Link>
    </div>
  );
};
