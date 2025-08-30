//venueSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    img: "https://cdn.pixabay.com/photo/2020/01/28/17/23/led-4800360_1280.jpg",
    name: "Conference Room (Capacity:15)",
    cost: 3500,
    quantity: 0,
  },
  {
    img: "https://cdn.pixabay.com/photo/2017/08/07/12/10/auditorium-2603163_1280.jpg",
    name: "Auditorium Hall (Capacity:200)",
    cost: 5500,
    quantity: 0,
  },
  {
    img: "https://cdn.pixabay.com/photo/2019/10/21/10/34/meeting-4565703_1280.jpg",
    name: "Presentation Room (Capacity:50)",
    cost: 700,
    quantity: 0,
  },
  {
    img: "https://cdn.pixabay.com/photo/2016/02/03/16/56/meeting-1177454_1280.jpg",
    name: "Large Meeting Room (Capacity:10)",
    cost: 900,
    quantity: 0,
  },
  {
    img: "https://pixabay.com/images/download/laptops-meeting-businessmen-593296_640.jpg",
    name: "Small Meeting Room (Capacity:5)",
    cost: 1100,
    quantity: 0,
  },
];

const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const index = action.payload;
      const item = state[index];
      if (!item) return;
      if (item.name === "Auditorium Hall (Capacity:200)" && item.quantity >= 3) {
        return;
      }
      item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const index = action.payload;
      const item = state[index];
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;
export default venueSlice.reducer;
