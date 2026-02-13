import {createSlice} from "@reduxjs/toolkit"


const cartSlice = createSlice({
      name: 'cart',
      initialState: {
    cartItems: JSON.parse(localStorage.getItem("cart")) || []
  },
  reducers:{

    addToCart : (state,action)=>{
        const {item,quantity=1} = action.payload;
        const existing = state.cartItems.find(i=>i._id === item._id);
        if(existing){
            existing.quantity+=quantity;
        }else{
            state.cartItems.push({...item,quantity:quantity})
        }
       
    },

    removeFromCart : (state,action)=>{
      if(action.payload.intent === "DELETE"){
         state.cartItems = state.cartItems.filter(
            item=> item._id !== action.payload.id
        );
      }else{
        const existing = state.cartItems.find(i=>i._id===action.payload.id);
        if(!existing) return;
        if(existing.quantity>0){
          existing.quantity-=1
        }
        if(existing.quantity===0){
          state.cartItems = state.cartItems.filter(
            item=> item._id !== action.payload.id)
        } 
      }
    },
    
    clearCart: (state)=>{
      state.cartItems = [];
    }
  }
})

export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
