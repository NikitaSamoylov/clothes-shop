import { createSlice } from "@reduxjs/toolkit";
import { TOrderGoods } from "@/types/product";
import { PayloadAction } from "@reduxjs/toolkit";

type TInitState = TOrderGoods[];

const initialState: TInitState = [];

export const OrdersSlice = createSlice({
  name: '@@orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrderGoods>) => {
      state.push(action.payload)
    },
  },
});

export const { addOrder } = OrdersSlice.actions;