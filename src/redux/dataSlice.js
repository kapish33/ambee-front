import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initailPaginatedData = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',
  tabelData: {}, // Paginanted User Data
  currentTableState: {
    name: '',
    user: '',
    changes: '',
  }, // Persiste So That User Will get Data Even After Refresh
  rerender: 0, // only For Let's Say N Usres are using It Symentinously
  filter: {},
};

export const paginatedEntities = createAsyncThunk(
  'data/paginatedEntities',
  async ({ page, rowsPerPage }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/table?page=${page}&limit=${rowsPerPage}`
      );
      // console.log(response.data, 'response.data paginatedEntities');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState: initailPaginatedData,
  reducers: {
    setTable: (state, action) => {
      state.currentTableState = action.payload;
    },
    rerender: (state, action) => {
      // this rerender is onlu for Hidration Form Global
      state.rerender++;
    },
    clearState: (state, action) => {
      state.currentTableState = {
        name: '',
        user: '',
        changes: '',
      };
    },
  },
  extraReducers: {
    [paginatedEntities.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [paginatedEntities.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.tabelData = action.payload;
    },
    [paginatedEntities.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    },
  },
});

export const { setTable, clearState, rerender } = dataSlice.actions;
export default dataSlice.reducer;

/*
state.currentTableState = {
        name: '',
        user: '',
        changes: '',
      };
*/
