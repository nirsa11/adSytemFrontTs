// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxState } from '../common/types/interface/state/reduxState.interface';
import { UserEntity } from '../common/types/entities/user.entity';

const initialState: ReduxState = {
  user: null
};

/**
 * A Redux slice that manages the user state.
 * @typedef {Object} UserSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {UserEntity | null} initialState.user - The user entity or null if no user is logged in.
 * @property {Object} reducers - The reducers of the slice.
 * @property {Function} reducers.setUser - A reducer that sets the user entity in the state.
 * @property {Function} reducers.removeUser - A reducer that removes the user entity from the state.
 * @returns {UserSlice} The user slice object.
 */
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserEntity>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default userSlice.reducer;