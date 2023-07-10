const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  toggleMenu: false,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    handleToggel: (prevState) => {
      const infoToggle = prevState.toggleMenu;
      return { ...prevState, toggleMenu: !infoToggle };
    },
    resetToggle: () => {
      return initialState;
    },
  },
});

export const contentAction = { ...contentSlice.actions };
export default contentSlice.reducer;
