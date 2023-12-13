            // Bring in configureStore // 
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "../slices/apiSlice.js";
import cartSliceReducer from "../slices/cartSlice.js"              
                

           // Create Store // 
    const store = configureStore({ 
                      // Add Reducers // 
            reducer: { 
          [apiSlice.reducerPath]: apiSlice.reducer,
          cart: cartSliceReducer,


         },                 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true, 
      });   
         
      
      export default store;
            
                  