import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFavorite {
  id: string;
}

type FavoritesState = IFavorite[];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as FavoritesState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IFavorite>) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.findIndex((favorite) => favorite.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
