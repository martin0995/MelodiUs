import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  birthday: "",
  genre: "",
  searchGenre: "",
  isAdmin: "",
  images: [],
  movies: [],
  artists: [],
  ageRange: [],
  artistSelection: 0,
  movieSelection: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
      return state;
    },
    logout: (state, action) => {
      state = initialState;
      return state;
    },
    update: (state, action) => {
      if (state.hasOwnProperty(action.key)) {
        state[action.key] = action.payload;
      }
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
