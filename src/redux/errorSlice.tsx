import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type AlertType = 'success' | 'info' | 'warning' | 'danger';

export interface AlertState {
  message: string | null;
  type: AlertType | null;
}

const initialState: AlertState = {
  message: null,
  type: null
};

/**
 * A Redux slice that manages the state of alerts.
 * @param {string} name - The name of the slice.
 * @param initialState - The initial state of the slice.
 * @param {Object} reducers - An object containing the reducer functions for the slice.
 * @returns A Redux slice object.
 */
const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<{ message: string; type: AlertType }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert: (state) => {
      state.message = null;
      state.type = null;
    }
  }
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;