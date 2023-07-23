import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loggerMiddleware from "middleware/loggerMiddleware";
import authMiddleware from "middleware/authMiddleware";
import { api } from "redux/RTKapi";

import artworksReducer from "features/artworksSlice";
import authReducer from "features/authSlice";
import exhibitionsReducer from "features/exhibitionsSlice";
import favoritesReducer from "features/favoritesSlice";
import searchReducer from "features/searchSlice";

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  artworks: ReturnType<typeof artworksReducer>;
  exhibitions: ReturnType<typeof exhibitionsReducer>;
  favorites: ReturnType<typeof favoritesReducer>;
  search: string;
};

const rootReducer = combineReducers({
  auth: authReducer,
  artworks: artworksReducer,
  exhibitions: exhibitionsReducer,
  favorites: favoritesReducer,
  search: searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку на несериализуемые данные, так как RTK-Query использует несериализуемые объекты
    });
    return [
      ...defaultMiddleware,
      loggerMiddleware,
      authMiddleware,
      api.middleware,
    ];
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
