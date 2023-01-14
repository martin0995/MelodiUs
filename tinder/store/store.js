import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import { form } from "./reducers/formsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    form: form,
  },
});
