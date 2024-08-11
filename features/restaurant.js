import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  restaurant :{
        id:null,
        img:null,
        title:null,
        rating:null,
        genre:null,
        address:null,
        desc:null,
        dishes:null,
      
    
  }
}

export const restaurantSl = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
   setRest : (state , action) => {
    state.restaurant= action.payload;
   }
    
  },
})

// Action creators are generated for each case reducer function
export const { setRest} = restaurantSl.actions;

export const selectRest =(state)=> state.restaurant.restaurant;



export default restaurantSl.reducer