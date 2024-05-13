import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "@/types/product";
import { PayloadAction } from "@reduxjs/toolkit";

type initState = TProduct[];

const initialState: initState = [];

export const FavoritesReducer = createSlice({
  name: '@@favorites',
  initialState,
  reducers: {
    addFavorites: (state, action: PayloadAction<TProduct>) => {
      state.push(action.payload);
    },
    deleteFavorites: (state, action: PayloadAction<TProduct>) => {
      return state.filter(el => el._id !== action.payload._id)
    },
  }
});

export const { addFavorites, deleteFavorites } = FavoritesReducer.actions;