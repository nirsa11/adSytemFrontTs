import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { removeUser } from './userSlice';
import loaderReducer from './loaderSlice';
import errorReducer from './errorSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { removeCookies } from '../common/utils';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const reducers = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  alert: errorReducer
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

const handleTabClose = (event) => {
  const state = store.getState();
  const rememberMe = state.user?.user?.rememberMe;

  // Only remove the user if the tab is being closed and rememberMe is false
  if (!rememberMe) {
    store.dispatch(removeUser());

    removeCookies('accessToken');

    removeCookies('tokenTime');
  }

  // Custom confirmation message before closing the tab
  const confirmationMessage = 'Are you sure you want to close the tab?';

  // Display the confirmation message if the user has not already confirmed
  if (!event.defaultPrevented) {
    event.preventDefault();
    event.returnValue = confirmationMessage;
  }

  return confirmationMessage;
};

window.addEventListener('beforeunload', handleTabClose);

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
