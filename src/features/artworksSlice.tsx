import { createSlice, PayloadAction } from "redux/reduxToolkitImports";

interface IArtwork {
  id: string;
}

type ArtworksState = IArtwork[];

const artworksSlice = createSlice({
  name: "artworks",
  initialState: [] as ArtworksState,
  reducers: {
    setArtworks: (state, action: PayloadAction<ArtworksState>) => {
      return action.payload;
    },
    addArtwork: (state, action: PayloadAction<IArtwork>) => {
      state.push(action.payload);
    },
    updateArtwork: (
      state,
      action: PayloadAction<Partial<IArtwork> & { id: string }>
    ) => {
      const { id, ...updatedFields } = action.payload;
      const existingArtwork = state.find((artwork) => artwork.id === id);
      if (existingArtwork) {
        Object.assign(existingArtwork, updatedFields);
      }
    },
    deleteArtwork: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.findIndex((artwork) => artwork.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setArtworks, addArtwork, updateArtwork, deleteArtwork } =
  artworksSlice.actions;
export default artworksSlice.reducer;
