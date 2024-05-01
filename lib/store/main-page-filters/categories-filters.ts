import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const CategoriesSlice = createSlice({
  name: '@@catogiries',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      if (state.includes(action.payload)) {
        return state.filter(el => el !== action.payload)
      } else {
        state.push(action.payload)
      }
    }
  }
});

export const { addCategory } = CategoriesSlice.actions;