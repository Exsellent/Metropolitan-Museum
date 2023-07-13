import { IArtwork, IExhibition, IFavorite } from "features/types";
import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ApiContextType {
  artworks: IArtwork[];
  exhibitions: IExhibition[];
  favorites: IFavorite[];
}

const ApiContext = createContext<ApiContextType>({
  artworks: [],
  exhibitions: [],
  favorites: [],
});

export default ApiContext;
