import { login } from "@/utils/https/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  data: {
    id: null,
    pin: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    image: null,
    balance: null,
  },
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const loginThunk = createAsyncThunk("user/login", async (body, controller) => {
  try {
    const response = await login(body, controller);
    return response.data;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (prevState, action) => {
      return {
        ...prevState,
        token: action.payload.token,
        data: {
          ...prevState.data,
          id: action.payload.id,
          pin: action.payload.pin,
        },
      };
    },
    getDataProfile: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phone: action.payload.noTelp,
          email: action.payload.email,
          image: action.payload.image,
          balance: action.payload.balance,
        },
      };
    },
    editNameUser: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
      };
    },
    editImageUser: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          image: action.payload,
        },
      };
    },
    editPhoneUser: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          phone: action.payload,
        },
      };
    },
    editBalanceRedux: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          balance: action.payload,
        },
      };
    },
    createPinRedux: (prevState, action) => {
      return {
        ...prevState,
        data: { ...prevState.data, pin: action.payload },
      };
    },
    logoutRedux: () => {
      return initialState;
    },
  },
  // extraReducers: {
  //   [loginThunk.pending]: (prevState) => {
  //     return {
  //       ...prevState,
  //       isLoading: true,
  //       isRejected: false,
  //       isFulfilled: false,
  //     };
  //   },
  //   [loginThunk.fulfilled]: (prevState, action) => {
  //     if (action.payload.response && action.payload.response.status === 400) {
  //       return {
  //         ...prevState,
  //         isLoading: false,
  //         isFulfilled: true,
  //         err: action.payload.response.data,
  //       };
  //     }
  //     return {
  //       ...prevState,
  //       isLoading: false,
  //       isFulfilled: true,
  //       token: action.payload.data.token,
  //       data: {
  //         ...prevState.data,
  //         id: action.payload.data.id,
  //       },
  //     };
  //   },
  //   [loginThunk.rejected]: (prevState, action) => {
  //     return {
  //       ...prevState,
  //       isLoading: false,
  //       isRejected: true,
  //       err: action.payload,
  //     };
  //   },
  // },
});

export const userAction = { ...userSlice.actions, loginThunk };
export default userSlice.reducer;
