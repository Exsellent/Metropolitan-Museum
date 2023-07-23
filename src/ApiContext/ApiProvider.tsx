import React, { ReactNode, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectExhibitions } from "features/exhibitionsSlice";
import { selectFavorites } from "features/favoritesSlice";
import ApiContext from "./ApiContext";
import { IArtwork } from "features/types";
import type { RootState } from "../redux/store"; // Use 'import type' to fix the import

interface IApiProviderProps {
  children: ReactNode;
}

const ApiProvider: React.FC<IApiProviderProps> = ({ children }) => {
  const artworks = useSelector((state: RootState) => state.artworks); // Use RootState in the useSelector function
  const exhibitions = useSelector(selectExhibitions);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const addArtwork = useCallback(
    (artwork: IArtwork) => {
      dispatch({ type: "ADD_ARTWORK", payload: artwork });
    },
    [dispatch]
  );

  const removeArtwork = useCallback(() => {}, []);

  const contextValue = useMemo(() => {
    return {
      artworks,
      exhibitions,
      favorites,
      addArtwork,
      removeArtwork,
    };
  }, [artworks, exhibitions, favorites, addArtwork, removeArtwork]);

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
