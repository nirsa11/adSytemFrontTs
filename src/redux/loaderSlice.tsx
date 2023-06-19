// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxState } from '../common/types/interface/state/reduxState.interface';

const initialState: ReduxState = {
  loader: false
};

/**
 * A Redux slice that manages the state of the loader.
 * @param {string} name - The name of the slice.
 * @param {object} initialState - The initial state of the slice.
 * @param {object} reducers - An object containing the reducer functions for the slice.
 * @returns A Redux slice object.
 */
export const loaderSlice = createSlice({
  name: 'loader',
  initialState: initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoader } = loaderSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default loaderSlice.reducer;
