import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loggerMiddleware from "middleware/loggerMiddleware";
import authMiddleware from "middleware/authMiddleware";
import { api } from "redux/RTKapi";

import artworksReducer, { ArtworksState } from "features/artworksSlice";
import authReducer, { IAuthState } from "features/authSlice";
import exhibitionsReducer, {
  ExhibitionsState,
} from "features/exhibitionsSlice";
import favoritesReducer, { FavoritesState } from "features/favoritesSlice";
import searchReducer from "features/searchSlice";

export type RootState = {
  auth: IAuthState;
  artworks: ArtworksState;
  exhibitions: ExhibitionsState;
  favorites: FavoritesState;
  search: string;
};

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  artworks: artworksReducer,
  exhibitions: exhibitionsReducer,
  favorites: favoritesReducer,
  search: searchReducer,
});

// Определяем опции для getDefaultMiddleware
const defaultMiddlewareOptions = {
  thunk: true,
  immutableCheck: true,
  serializableCheck: true,
};

// Получаем массив стандартных middleware
const middleware: Middleware[] = getDefaultMiddleware(defaultMiddlewareOptions);

// Добавляем свои middleware в массив
middleware.push(loggerMiddleware);
middleware.push(authMiddleware);

// Добавляем middleware от api.middleware
const apiMiddleware = api.middleware as Middleware;
middleware.push(apiMiddleware);

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
