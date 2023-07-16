import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { clearAlert, } from '../redux/errorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

type AlertType = 'success' | 'info' | 'warning' | 'danger';

interface AlertProps {
  message: string;
  type: AlertType;
}

/**
 * A React functional component that displays an alert message to the user.
 * @returns A React component that displays an alert message to the user.
 */
export const AlertComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dispatch, message]);

  if (!message) {
    return null;
  }
  const handleDismiss = () => {
    dispatch(clearAlert());
  };
  return (
    <div className='alert-ui'>
      <TransitionGroup>
        {message && (
          <CSSTransition classNames="alert-transition" timeout={300}>
            <Alert variant={type} onClose={handleDismiss} dismissible>
              {message}
            </Alert>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};