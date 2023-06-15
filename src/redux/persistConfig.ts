// persistConfig.ts

import { Store } from 'redux';
import { Persistor } from 'redux-persist';

export const beforeLift = (store: Store, persistor: Persistor) => {
  // Add listener to remove user object when tab is closed
  window.addEventListener('beforeunload', () => {
    const state = store.getState();
    const user = state.user;
    const rememberMe = state.rememberMe;

    if (!rememberMe && user) {
      persistor.pause();
      store.dispatch({ type: 'REMOVE_USER' });
      persistor.flush();
    }
  });
};

export const manualPersist = () => {
  // Disable automatic persistence on rehydration
  return Promise.resolve();
};
