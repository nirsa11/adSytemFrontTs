import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { clearAlert, setAlert } from '../redux/errorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style/alert.css';

type AlertType = 'success' | 'info' | 'warning' | 'danger';

interface AlertProps {
  message: string;
  type: AlertType;
}

export const AlertComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        dispatch(clearAlert());
      }, 2000);

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
    <div
      style={{
        position: 'fixed',
        zIndex: 1555555,
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        textAlign: 'center'
      }}
    >
      <TransitionGroup>
        {message && (
          <CSSTransition classNames="alert-transition" timeout={300}>
            <Alert variant={type} onClose={handleDismiss} dismissible>
              {message}
            </Alert>
            {/* <div className="alert-container">
              <Alert variant={type} onClose={handleDismiss} dismissible>
                {message}
              </Alert>
            </div> */}
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
