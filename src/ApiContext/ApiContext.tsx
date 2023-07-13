import React, { createContext, useMemo, useCallback, ReactNode } from "react";
import { IArtwork, IExhibition, IFavorite } from "features/types";

interface IApiContextType {
  artworks: IArtwork[];
  exhibitions: IExhibition[];
  favorites: IFavorite[];
  addArtwork: (artwork: IArtwork) => void;
  removeArtwork: (id: number) => void;
}

const ApiContext = createContext<IApiContextType>({
  artworks: [],
  exhibitions: [],
  favorites: [],
  addArtwork: () => {},
  removeArtwork: () => {},
});

interface IApiProviderProps {
  children: ReactNode;
}

const ApiProvider: React.FC<IApiProviderProps> = ({ children }) => {
  const [artworks, setArtworks] = React.useState<IArtwork[]>([]);

  const addArtwork = useCallback((artwork: IArtwork) => {
    setArtworks((prevArtworks) => [...prevArtworks, artwork]);
  }, []);

  const removeArtwork = useCallback((id: number | string) => {
    setArtworks((prevArtworks) =>
      prevArtworks.filter((artwork) => artwork.id !== id)
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      artworks,
      exhibitions: [],
      favorites: [],
      addArtwork,
      removeArtwork,
    }),
    [artworks, addArtwork, removeArtwork]
  );

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export default ApiContext;
export { ApiProvider };
