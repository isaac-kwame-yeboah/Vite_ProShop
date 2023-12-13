                  // ROOT API SLICE || PARENT API SLICE // 

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

import { BASE_URL} from "../constants.js";
   
const baseQuery = fetchBaseQuery({baseUrl:BASE_URL});


     // Create ApiSlice Reducer // 
     export const apiSlice = createApi({
      baseQuery,
      tagTypes:["Product", "Order", "user"],
      endpoints: (builder) => ({}),
     });
     
 


  /*  
    NOTE::
     fetchBaseQuery: allow us to make request to our Backend Api
     tagTypes: defines the types of data model we are fetching from our backend api
     Endpoints: automatically fetch data 
     Mutations: Are request that update or delete data from the database
     createApi: Deals with endpoints that are dealing with asynchronous request such as backend request for data
    */