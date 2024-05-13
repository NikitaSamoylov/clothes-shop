import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { mainPageFilters } from "./main-page-filters/main-page-filters";
import { CategoriesSlice } from "./main-page-filters/categories-filters";
import { CartSlice } from "./cart/cart-slice";
import { OrdersSlice } from "./orders/orders-slice";
import { GetUserLoadingSlice } from "./get-user-loading/get-user-loading";

const rootReducer = combineReducers({
  mainPageFilters: mainPageFilters.reducer,
  categoriesFilters: CategoriesSlice.reducer,
  cartList: CartSlice.reducer,
  ordersList: OrdersSlice.reducer,
  getUserLoading: GetUserLoadingSlice.reducer,
});

export const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];