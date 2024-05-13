import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type TInitState = boolean;

const initialState: TInitState = true;

export const GetUserLoadingSlice = createSlice({
  name: '@@getUserLoading',
  initialState,
  reducers: {
    addLoading: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { addLoading } = GetUserLoadingSlice.actions;

