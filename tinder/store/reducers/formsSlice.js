import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};
export const setForm = createAction("SET_FORM");
export const form = createReducer(initialState, {
  [setForm]: (state, action) => (state = { value: action.payload }),
});
