import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  birthday: "",
  genre: "",
  searchGenre: "",
  isAdmin: "",
  images: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
