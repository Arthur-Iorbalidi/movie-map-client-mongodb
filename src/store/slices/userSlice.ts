import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@src/types/serverAPITypes';

interface UserState {
  isAuthorized: boolean | undefined;
  userInfo?: IUser;
}

const initialState: UserState = {
  isAuthorized: undefined,
  userInfo: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },

    changeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    removeMovieFromFavorites: (state, action: PayloadAction<string>) => {
      if (state.userInfo) {
        state.userInfo.movies = state.userInfo.movies.filter(
          (movie) => movie._id !== action.payload,
        );
      }
    },

    removeActorFromFavorites: (state, action: PayloadAction<string>) => {
      if (state.userInfo) {
        state.userInfo.actors = state.userInfo.actors.filter(
          (actor) => actor._id !== action.payload,
        );
      }
    },

    removeDirectorFromFavorites: (state, action: PayloadAction<string>) => {
      if (state.userInfo) {
        state.userInfo.directors = state.userInfo.directors.filter(
          (director) => director._id !== action.payload,
        );
      }
    },

    addMovieToFavorites: (state, action: PayloadAction<string>) => {
      if (
        state.userInfo &&
        !state.userInfo.movies.some((movie) => movie._id === action.payload)
      ) {
        state.userInfo.movies.push({ _id: action.payload });
      }
    },

    addActorToFavorites: (state, action: PayloadAction<string>) => {
      if (
        state.userInfo &&
        !state.userInfo.actors.some((actor) => actor._id === action.payload)
      ) {
        state.userInfo.actors.push({ _id: action.payload });
      }
    },

    addDirectorToFavorites: (state, action: PayloadAction<string>) => {
      if (
        state.userInfo &&
        !state.userInfo.directors.some(
          (director) => director._id === action.payload,
        )
      ) {
        state.userInfo.directors.push({ _id: action.payload });
      }
    },
  },
});

export const {
  changeIsAuthorized,
  changeUserInfo,
  removeActorFromFavorites,
  removeDirectorFromFavorites,
  removeMovieFromFavorites,
  addActorToFavorites,
  addDirectorToFavorites,
  addMovieToFavorites,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
