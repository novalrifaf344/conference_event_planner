//mealsSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    name: 'Breakfast',
    cost: 50,
    selected: false,
    img: 'https://cdn.pixabay.com/photo/2016/11/06/23/16/breakfast-1804436_1280.jpg',
  },
  {
    name: 'High Tea',
    cost: 25,
    selected: false,
    img: 'https://cdn.pixabay.com/photo/2016/11/29/13/04/tea-1869716_1280.jpg',
  },
  {
    name: 'Lunch',
    cost: 65,
    selected: false,
    img: 'https://cdn.pixabay.com/photo/2015/05/02/01/03/lunch-box-749367_1280.jpg',
  },
  {
    name: 'Dinner',
    cost: 70,
    selected: false,
    img: 'https://cdn.pixabay.com/photo/2019/08/22/20/02/food-4424301_1280.jpg',
  },
];

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    toggleMealSelection: (state, action) => {
      state[action.payload].selected = !state[action.payload].selected;
    },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;
export default mealsSlice.reducer;
