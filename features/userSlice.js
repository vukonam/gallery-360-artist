// userSlice.js
//import { createSlice } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  name: "John Doe",
  navStack: "NewArtwork",
  desc: "Make your first sale by adding artwork",
  btnText: "Add Artworks",
  image: require("../assets/images/userImage.jpg"),
  selectedOption: "All",
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      console.log(user.uid);
      const docData = await getDoc(doc(FIRESTORE_DB, "users", user.uid), {});

      if (docData.exists()) {
        const data = docData.data();
        return data;
      } else {
        console.log("NO SUCH DATA");
        return {};
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNavStack: (state, action) => {
      state.navStack = action.payload;
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
    },
    setBtnText: (state, action) => {
      state.btnText = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const {
  setName,
  setNavStack,
  setDesc,
  setBtnText,
  setImage,
  setSelectedOption,
} = userSlice.actions;

export default userSlice.reducer;
