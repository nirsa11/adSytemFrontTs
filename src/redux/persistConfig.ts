// persistConfig.ts

import { Store } from 'redux';
import { Persistor } from 'redux-persist';

/**
 * Adds an event listener to the window that triggers before the page is unloaded.
 * If the user is not set to be remembered and there is a user in the store, the user is removed
 * from the store and the persistor is flushed.
 * @param {Store} store - the Redux store object
 * @param {Persistor} persistor - the Redux persistor object
 * @returns None
 */
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
