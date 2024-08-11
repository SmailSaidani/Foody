import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const panierSl = createSlice({
  name: 'panier',
  initialState,
  reducers: {
    ajouterPanier: (state, action) => {
    
      state.items = [...state.items, action.payload]
    },
    EnlvPanier: (state,action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
        );
      let  pan =[...state.items];


      if(index >= 0) {
        pan.splice(index ,1);
        
      }
      else{
        console.warn("can't remove product")
      }
      state.items=pan
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { ajouterPanier, EnlvPanier} = panierSl.actions

export const selectPanier = (state) => state.panier.items;

export const selectPId= (state, id)=>
state.panier.items.filter((item) => item.id === id);

export const panierTtl= (state)=> state.panier.items.reduce((total, item)=> total+= item.prix,0)
export default panierSl.reducer