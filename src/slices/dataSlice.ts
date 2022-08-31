import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import data from "../data.json";
import { DataState } from './dataTypes';

const initialState: DataState[] = {
  ...data
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
});


export const getFullData = (state: RootState) => state.data;

export default dataSlice.reducer;
