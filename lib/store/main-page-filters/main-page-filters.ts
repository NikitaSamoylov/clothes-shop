import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = string[];
let initialState: TInitialState = [];

export const mainPageFilters = createSlice({
  name: '@@mainPageFilters',
  initialState: initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      if (state.includes(action.payload)) {
        return state.filter(el => el !== action.payload)
      } else {
        state.push(action.payload)
      };
    },
  },
});


export const { addFilter } = mainPageFilters.actions;