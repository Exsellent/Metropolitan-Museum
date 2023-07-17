/* eslint-disable prettier/prettier */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loggerMiddleware from 'middleware/loggerMiddleware'

import artworksReducer from 'features/artworksSlice';
import authReducer from 'features/authSlice';
import exhibitionsReducer from 'features/exhibitionsSlice';
import favoritesReducer from 'features/favoritesSlice';
import searchReducer from 'features/searchSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
  
 
artworks: artworksReducer,
  exhibitions: exhibitionsReducer,
  
 
favorites: favoritesReducer,
  search: searchReducer,
});

const store = configureStore({
reducer: {
auth: authReducer,
artworks: artworksReducer,
exhibitions: exhibitionsReducer,
favorites: favoritesReducer,
search: searchReducer
},
middleware: (getDefaultMiddleware) => {
// Получаем массив стандартных мидлваров из Redux Toolkit
const defaultMiddleware = getDefaultMiddleware()
// Создаем массив наших собственных мидлваров
const customMiddleware = [loggerMiddleware]
// Возвращаем новый массив, который содержит все мидлвары
return [...defaultMiddleware, ...customMiddleware]
}
})

export default store;