               // Endpoints to work with the backend //   

import { USERS_URL } from "../constants"; 
import { apiSlice } from "./apiSlice"; 


     // usersApiSlice // 
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
            // Login A User // 
          login: builder.mutation({
          query: (data) => ({
            url: `${USERS_URL}/login`,
         method: "POST",
           body: data,
          }),
        }), 

          
            // Register A User //  
          register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}`,
           method: "POST",
             body: data,
            })
          }),


          // Logout A User // 
           logout: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/logout`,
           method: "POST",
            })
          }),


           // Update User Profile //  
           profile: builder.mutation({
               query: (data) => ({
                url: `${USERS_URL}/userProfile`,
                method: "PUT",
                body: data,
               })
           }),

 
        


    }),
}); 


  export const { useLoginMutation,
                 useLogoutMutation,
                 useRegisterMutation,
                 useProfileMutation,
               } = usersApiSlice; 





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