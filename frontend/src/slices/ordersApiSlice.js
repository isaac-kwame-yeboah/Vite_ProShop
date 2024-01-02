    // Endpoints to work with the backend API //  

    // Bring in apiSlice Reducer // 
import { apiSlice } from "./apiSlice.js";

     // Bring In Client Id From Backend // 
   const PAYPAL_URL = "/api/config/paypal";


           // ordersApiSlice // 
    export const ordersApiSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
              // Create New Order //
              createOrder: builder.mutation({
                query: (order) => ({
                url: "/api/orders",
                method: "POST",
                body: {...order},
                }),
              }), 

              
                  // Get Order Details // 
               orderDetails: builder.query({
              query: (orderId) => ({
              url: `/api/orders/${orderId}`,
              method: "GET",
              }),
              keepUnusedDataFor: 5,
            }),    


                   // Pay Order //   
                payOrder: builder.mutation({
                  query: ({orderId, details}) => ({
                    url: `/api/orders/${orderId}/pay`, 
                    method: "PUT",
                    body: {...details},
                  }),
                }), 

                 
                    // Get Paypal Client Id // 
                  getPayPalClientId: builder.query({
                    query: () => ({
                      url: PAYPAL_URL,
                    }),
                     keepUnusedDataFor: 5,
                  }),


                   // Get My Orders  // 
                getMyOrders: builder.query({
                     query: () => ({
                      url: "/api/orders/mine",
                      method: "GET",
                     }), 
                     keepUnusedDataFor: 5,
                }),


                // Get All Orders (Admin Only) // 
               getAllOrders: builder.query({
                query: () => ({
                  url: "/api/orders",
                  method: "GET",
                }), 
                    keepUnusedDataFor: 5,
               }),


                 // Deliver Orders (Admin Only) // 
                  deliverOrder: builder.mutation({
                      query: (orderId) => ({
                       url: `/api/orders/${orderId}/deliver`,
                       method: "PUT",
                      }),
                  }),





        })
    })


  export const { useCreateOrderMutation,
                 useOrderDetailsQuery,
                 usePayOrderMutation,
                 useGetPayPalClientIdQuery,
                 useGetMyOrdersQuery,
                 useGetAllOrdersQuery,
                 useDeliverOrderMutation,
               } = ordersApiSlice;
                 
                  