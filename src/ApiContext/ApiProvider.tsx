/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ApiContext from "./ApiContext";
import { useSelector } from "react-redux";
import { IArtwork, IExhibition, IFavorite } from "features/types";
import { selectArtworks } from "features/artworksSlice";
import { selectExhibitions } from "features/exhibitionsSlice";
import { selectFavorites } from "features/favoritesSlice";

const ApiProvider = ({ children }) => {
  const artworks = useSelector((state) => selectArtworks(state));
  const exhibitions = useSelector((state) => selectExhibitions(state));
  const favorites = useSelector((state) => selectFavorites(state));

  return (
    <ApiContext.Provider value={{ artworks, exhibitions, favorites }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
