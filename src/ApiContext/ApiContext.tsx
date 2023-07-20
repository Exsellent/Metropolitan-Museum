import React, { createContext, useMemo, useCallback, ReactNode } from "react";
import { IArtwork } from "./types";

interface IApiContextType {
  artworks: IArtwork[];
  addArtwork: (artwork: IArtwork) => void;
  removeArtwork: (id: string) => void;
}

const ApiContext = createContext<IApiContextType>({
  artworks: [],
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

  const removeArtwork = useCallback((id: string) => {
    setArtworks((prevArtworks) =>
      prevArtworks.filter((artwork) => artwork.id !== id)
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      artworks,
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
