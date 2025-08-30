//src/avSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    img: "https://pixabay.com/images/download/business-computer-conference-20031_640.jpg",
    name: "Projectors",
    cost: 200,
    quantity: 0,
  },
  {
    img: "https://pixabay.com/images/download/speakers-bluetooth-tech-speaker-4109274_640.jpg",
    name: "Speaker",
    cost: 35,
    quantity: 0,
  },
  {
    img: "https://pixabay.com/images/download/public-speaking-mic-microphone-3926344_640.jpg",
    name: "Microphones",
    cost: 45,
    quantity: 0,
  },
  {
    img: "https://cdn.pixabay.com/photo/2023/12/04/14/58/table-8429665_1280.jpg",
    name: "Whiteboards",
    cost: 80,
    quantity: 0,
  },
  {
    img: "https://cdn.pixabay.com/photo/2023/06/01/05/58/sign-8032702_1280.jpg",
    name: "Signage",
    cost: 80,
    quantity: 0,
  },
];

const avSlice = createSlice({
  name: "av",
  initialState,
  reducers: {
    incrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item) item.quantity += 1;
    },
    decrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) item.quantity -= 1;
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;
export default avSlice.reducer;
