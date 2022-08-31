import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import data from "../data.json";
import { InitialState, LocationInterface } from './dataTypes';

const initialState: InitialState = {
  data,
  stopPosition: { lat: 42.6971, lng: 23.3226 },
  polylineData: [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStopPosition: (state, action) => {
      state.stopPosition = action.payload;
    },
    setPolylineData: (state, action) => {
      const resultLine = state.data.find(line =>
        line.routes.some(({ id }) => id === action.payload)
      )
      const resultRoute = resultLine!.routes.find(({ id }) => id === action.payload)
      const allCoords: (LocationInterface[])[] = [];
      resultRoute?.segments.forEach((segment) => allCoords.push(segment.coordinates))
      state.polylineData.push(allCoords)
    }
  }
});


export const getFullData = (state: RootState) => state.data.data;
export const getStopPosition = (state: RootState) => state.data.stopPosition;
export const getPolylineData = (state: RootState) => state.data.polylineData;

export const { setStopPosition, setPolylineData } = dataSlice.actions

export default dataSlice.reducer;
