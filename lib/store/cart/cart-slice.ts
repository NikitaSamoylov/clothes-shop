import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TUserCart, TProduct } from "@/types/product";
import { TProductForUpload } from "@/types/product";
import { PayloadAction } from "@reduxjs/toolkit";

// interface ICartState {
//   list: TProduct[];
//   loading: boolean;
//   error: string | null;
// };

// const initialState: ICartState = {
//   list: [],
//   loading: false,
//   error: null,
// };

// export const fetchCart = createAsyncThunk<TProduct[], string, { rejectValue: string }>(
//   'cart/fetchCart',
//   async function (id, { rejectWithValue }) {
//     const response = await fetch(`/api/cart?user=${ id }`);

//     if (!response.ok) {
//       rejectWithValue('Что-то пошло не так')
//     };

//     const data = await response.json();
//     return data.cart[0].goods;
//   }
// );

// export const postCart = createAsyncThunk<TProduct, TUserCart, { rejectValue: string }>(
//   'cart/postCart',
//   async function (product, { rejectWithValue }) {
//     const response = await fetch(`/api/cart`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(product)
//     })

//     if (!response.ok) {
//       rejectWithValue('Что-то пошло не так')
//     };

//     return await response.json();
//   }
// );

// export const putCart = createAsyncThunk<TProduct, TUserCart, { rejectValue: string }>(
//   'cart/putCart',
//   async function (product, { rejectWithValue }) {
//     const response = await fetch(`/api/cart`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(product)
//     })

//     if (!response.ok) {
//       rejectWithValue('Что-то пошло не так')
//     };

//     return await response.json();
//   }
// );

type TInitState = TProduct[];

const initialState: TInitState = [];

export const CartSlice = createSlice({
  name: '@@cart',
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TProduct>) => {
      state.push(action.payload);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCart.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchCart.fulfilled, (state, action) => {
  //       state.list = action.payload;

  //       state.loading = false;
  //     })
  //     .addCase(postCart.fulfilled, (state, action) => {
  //       state.list.push(action.payload);
  //     })
  //     .addCase(putCart.fulfilled, (state, action) => {
  //       state.list.push(action.payload);
  //     })
  // }
});

export const { addProduct } = CartSlice.actions;