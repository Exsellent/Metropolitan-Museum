import { ArtworksState } from "features/artworksSlice";
import { IAuthState } from "features/authSlice";
import { ExhibitionsState } from "features/exhibitionsSlice";
import { FavoritesState } from "features/favoritesSlice";

export type RootState = {
  auth: IAuthState;
  artworks: ArtworksState;
  exhibitions: ExhibitionsState;
  favorites: FavoritesState;
  search: string;
};

export type { IArtwork } from "features/artworksSlice";
export type { IExhibition } from "features/exhibitionsSlice";
export type { IFavorite } from "features/favoritesSlice";
