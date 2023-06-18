import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="home">
      {' '}
      <Link to="/dashboard/edit-profile">go to edit propfile</Link>
    </div>
  );
};
