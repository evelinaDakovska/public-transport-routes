import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import data from "../data.json";
import { DataState, InitialState, LocationInterface, stopDataInterface } from './dataTypes';

const initialState: InitialState = {
  data,
  stopPosition: { 'Sofia': { 'lat': 42.6971, 'lng': 23.3226 } },
  polylineData: [],
  multipleStopsData: {},
}

const getRoute = (state: DataState[], checkedLineId: number) => {
  const resultLine = state.find(line =>
    line.routes.some(({ id }) => id === checkedLineId)
  )
  return resultLine!.routes.find(({ id }) => id === checkedLineId)
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStopPosition: (state, action) => {
      const { stopName, stopLocation } = action.payload;
      state.stopPosition = { [stopName]: stopLocation };
    },
    setClearData: (state) => {
      state.polylineData = [];
      state.multipleStopsData = {};
    },
    setPolylineData: (state, action) => {
      const resultRoute = getRoute(state.data, action.payload)
      const allPolylineCoords: (LocationInterface[])[] = [];
      resultRoute?.segments.forEach((segment) => allPolylineCoords.push(segment.coordinates))
      state.polylineData = allPolylineCoords;
    },
    setStopsData: (state, action) => {
      const resultRoute = getRoute(state.data, action.payload)
      const allStopsCoords: stopDataInterface = {};
      resultRoute?.stops.forEach((stop) => allStopsCoords[stop.name] = stop.location)
      state.multipleStopsData = allStopsCoords;
    },
  }
});


export const getFullData = (state: RootState) => state.data.data;
export const getStopPosition = (state: RootState) => state.data.stopPosition;
export const getPolylineData = (state: RootState) => state.data.polylineData;
export const getMultipleStopsData = (state: RootState) => state.data.multipleStopsData;

export const { setStopPosition, setClearData, setPolylineData, setStopsData } = dataSlice.actions

export default dataSlice.reducer;
