import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultSearchValues from '@src/constants/defaultSearchValues';

const searchSlice = createSlice({
  name: 'search',
  initialState: defaultSearchValues,
  reducers: {
    changeMoviesSearch: (state, action: PayloadAction<string>) => {
      state.movies.search = action.payload;
    },
    changeMoviesPage: (state, action: PayloadAction<number>) => {
      state.movies.page = action.payload;
    },
    changeMoviesSort: (state, action: PayloadAction<string>) => {
      state.movies.sortBy = action.payload;
    },
    changeMoviesSortOrder: (state, action: PayloadAction<string>) => {
      state.movies.sortOrder = action.payload;
    },
    resetMoviesPage: (state) => {
      state.movies.page = defaultSearchValues.movies.page;
    },
    changeActorsSearch: (state, action: PayloadAction<string>) => {
      state.actors.search = action.payload;
    },
    changeActorsPage: (state, action: PayloadAction<number>) => {
      state.actors.page = action.payload;
    },
    changeActorsSort: (state, action: PayloadAction<string>) => {
      state.actors.sortBy = action.payload;
    },
    changeActorsSortOrder: (state, action: PayloadAction<string>) => {
      state.actors.sortOrder = action.payload;
    },
    resetActorsPage: (state) => {
      state.actors.page = defaultSearchValues.actors.page;
    },
    changeDirectorsSearch: (state, action: PayloadAction<string>) => {
      state.directors.search = action.payload;
    },
    changeDirectorsPage: (state, action: PayloadAction<number>) => {
      state.directors.page = action.payload;
    },
    changeDirectorsSort: (state, action: PayloadAction<string>) => {
      state.directors.sortBy = action.payload;
    },
    changeDirectorsSortOrder: (state, action: PayloadAction<string>) => {
      state.directors.sortOrder = action.payload;
    },
    resetDirectorsPage: (state) => {
      state.directors.page = defaultSearchValues.directors.page;
    },
  },
});

export const {
  changeActorsPage,
  changeActorsSearch,
  changeActorsSort,
  changeActorsSortOrder,
  changeDirectorsPage,
  changeDirectorsSearch,
  changeDirectorsSort,
  changeDirectorsSortOrder,
  changeMoviesPage,
  changeMoviesSearch,
  changeMoviesSort,
  changeMoviesSortOrder,
  resetActorsPage,
  resetDirectorsPage,
  resetMoviesPage,
} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
