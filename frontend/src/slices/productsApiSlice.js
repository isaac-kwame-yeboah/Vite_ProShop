                       // Endpoints to work with the backend //   


import { PRODUCTS_URL } from "../constants"; 
import { apiSlice } from "./apiSlice"; 


     // productApiSlice // 
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
            // Get All Products // 
        getProducts: builder.query({
          query: () => ({
            url: PRODUCTS_URL,
          }),
             keepUnusedDataFor: 5,
        }),

             
                // Get Product Details // 
        getProductDetails: builder.query({
            query: (productId) => ({
             url: `${PRODUCTS_URL}/${productId}`,
            }),
                keepUnusedDataFor: 5,
           }),


              // Create Product // 
            createProduct: builder.mutation({
              query: () => ({
              url: PRODUCTS_URL, 
              method: "POST",
              }), 
                 invalidatesTags:["Products"],
            }) 

    }),
}); 


  export const { useGetProductsQuery,
                 useGetProductDetailsQuery, 
                 useCreateProductMutation,
               } = productsApiSlice;  





     /* 
     NOTE: PREFIX  getProducts as seen in export const to { useGetProductsQuery } = productsApiSlice; 
      when exporting it
     */

/*  
    NOTE::
     fetchBaseQuery: allow us to make request to our Backend Api
     tagTypes: defines the types of data model we are fetching from our backend api
     Endpoints: automatically fetch data 
     Mutations: Are request that update or delete data from the database
     createApi: Deals with endpoints that are dealing with asynchronous request such as backend request for data

    */