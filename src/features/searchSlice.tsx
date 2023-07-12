import { createSlice, PayloadAction } from "redux/reduxToolkitImports";

const searchSlice = createSlice({
  name: "search",
  initialState: "" as string,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
