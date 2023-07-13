import React, { ReactNode, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectArtworks } from "features/artworksSlice";
import { selectExhibitions } from "features/exhibitionsSlice";
import { selectFavorites } from "features/favoritesSlice";
import ApiContext from "./ApiContext";
import { IArtwork } from "features/types";

interface IApiProviderProps {
  children: ReactNode;
}

const ApiProvider: React.FC<IApiProviderProps> = ({ children }) => {
  const artworks = useSelector(selectArtworks);
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
