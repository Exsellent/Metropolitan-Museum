import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IExhibition {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export type ExhibitionsState = IExhibition[];

const exhibitionsSlice = createSlice({
  name: "exhibitions",
  initialState: [] as ExhibitionsState,
  reducers: {
    setExhibitions: (state, action: PayloadAction<ExhibitionsState>) => {
      return action.payload;
    },
    addExhibition: (state, action: PayloadAction<IExhibition>) => {
      state.push(action.payload);
    },
    updateExhibition: (
      state,
      action: PayloadAction<Partial<IExhibition> & { id: string }>
    ) => {
      const { id, ...updatedFields } = action.payload;
      const existingExhibition = state.find(
        (exhibition) => exhibition.id === id
      );
      if (existingExhibition) {
        Object.assign(existingExhibition, updatedFields);
      }
    },
    deleteExhibition: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.findIndex((exhibition) => exhibition.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {
  setExhibitions,
  addExhibition,
  updateExhibition,
  deleteExhibition,
} = exhibitionsSlice.actions;
export const selectExhibitions = (state) => state.exhibitions; // Correct the selector to select data from the 'exhibitions' state
export default exhibitionsSlice.reducer;
