const { combineReducers } = require("@reduxjs/toolkit");

import userSlice from "./auth";
import contentSlice from "./content";

const reducers = combineReducers({
  user: userSlice,
  content: contentSlice,
});

export default reducers;
