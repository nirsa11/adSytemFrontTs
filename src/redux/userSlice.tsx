// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxState } from "../common/types/interface/state/reduxState.interface";
import { UserEntity } from "../common/types/entities/user.entity";

const initialState: ReduxState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserEntity>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default userSlice.reducer;
