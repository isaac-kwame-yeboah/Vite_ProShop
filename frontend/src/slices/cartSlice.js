import { createSlice } from "@reduxjs/toolkit";  
import {updateCart} from "../utils/cartUtils";



    // InitialState &&  [Adding shippingAddress && Paypal to our InitialState] // 
   const initialState = localStorage.getItem("cart") ? 
 JSON.parse (localStorage.getItem("cart")) : {cartItems:[], shippingAddress:{}, paymentMethod:"Paypal"};  


      // Create cartReducer State //  
    const cartSlice = createSlice({
        name:"cart",
        initialState,
        reducers:{
             // Add to cart (Add New Item To Cart)  // 
    addToCart: (state, action) => {
         const item = action.payload;

       // check if item exist in the cart //
     const existItem = state.cartItems.find((x) => x._id === item._id); 

          if (existItem) {
           state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
          } else {
        // add new item // 
        state.cartItems = [...state.cartItems, item];
          } 
              
            // update local storage //
            return updateCart(state);
    },  
  
          // Remove from cart (Remove Item From Cart)  //  
          removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload); 
                   
             // update local storage // 
              return updateCart(state);
          }, 

 
            // Save Shipping Address //
          saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload; 
                 // update local storage // 
            return updateCart(state);
         }, 


             // save Payment Method // 
             savePaymentMethod: (state, action) => {
              state.paymentMethod = action.payload; 
              return updateCart(state);
            },

 
               //  clear CartItems // 
            clearCartItems: (state) => {
              state.cartItems = []; 
              return updateCart(state);
            }



        },
    });
 

    export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems}  = cartSlice.actions;
    export default cartSlice.reducer;