import { configureStore } from '@reduxjs/toolkit'
import  panierSl  from './features/panier'
import  restaurantSl  from './features/restaurant'
export const store = configureStore({
  reducer: {
    panier : panierSl, 
    restaurant: restaurantSl,
     
  },
})