import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "@/types/product";
import { PayloadAction } from "@reduxjs/toolkit";

type TInitState = TProduct[];

const initialState: TInitState = [];

export const CartSlice = createSlice({
  name: '@@cart',
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TProduct>) => {
      state.push(action.payload);
    },
    updateCount: (state, action: PayloadAction<TProduct>) => {
      return state.map(el => (
        el._id === action.payload._id ?
          { ...el, count: action.payload.count } :
          el
      ))
    },
    deleteItem: (state, action: PayloadAction<TProduct>) => {
      return state.filter(el => el._id !== action.payload._id)
    },
    deleteAllItems: () => {
      return [];
    },
  },
});

export const { addProduct, updateCount, deleteItem, deleteAllItems } = CartSlice.actions;