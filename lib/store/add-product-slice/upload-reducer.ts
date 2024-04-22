import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type TInitialState = string[];
let initialState: TInitialState = [];

export const productFormSlice = createSlice({
  name: '@@productForm',
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
    },
  },
});


export const { addItem } = productFormSlice.actions;