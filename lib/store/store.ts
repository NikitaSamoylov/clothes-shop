import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { mainPageFilters } from "./main-page-filters/main-page-filters";
import { CategoriesSlice } from "./main-page-filters/categories-filters";

const rootReducer = combineReducers({
  mainPageFilters: mainPageFilters.reducer,
  categoriesFilters: CategoriesSlice.reducer,
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