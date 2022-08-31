import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import data from "../data.json";
import { InitialState } from './dataTypes';

const initialState: InitialState = {
  data,
  stopPosition: { lat: 42.6971, lng: 23.3226 },
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStopPosition: (state, position) => {
      state.stopPosition = position.payload;
    }
  }
});


export const getFullData = (state: RootState) => state.data.data;
export const getStopPosition = (state: RootState) => state.data.stopPosition;

export const { setStopPosition } = dataSlice.actions

export default dataSlice.reducer;
