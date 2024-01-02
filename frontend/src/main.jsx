import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"; 
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from './App.jsx';
// import './index.css'; // 
import { Provider } from "react-redux";
import store from "./app/store.js";
// import "bootstrap/dist/css/bootstrap.min.css";    // Default Bootstrap Theme // 
import "./assets/styles/bootstrap.custom.css";   // Custom Bootstrap Theme // 
import "./assets/styles/index.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute"; 
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen"; 
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/admin/OrderListScreen"; 
import ProductListScreen from "./screens/admin/ProductListScreen"; 


           // Create Our Router //
      const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />} >
                 {/* Unprotected Route || Public Route */}
              <Route index={true} path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen/>} />  
              <Route path="/login" element={<LoginScreen /> }  /> 
              <Route path="/register" element={<RegisterScreen />} /> 
              <Route path="/shipping" element={<ShippingScreen />} /> 


              {/* Private Route || Protected Route */} 
           <Route path=""  element={<PrivateRoute />}> 
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen/>} /> 
            <Route path="/placeorder" element={<PlaceOrderScreen />} /> 
            <Route path="/order/:id" element={<OrderScreen />} /> 
             <Route path="/profile" element={<ProfileScreen />}   />
           </Route>


                 {/* Admin Private Route || Protected Route */} 
               <Route path="" element={<AdminRoute />} >
               <Route path="admin/orderlist" element={<OrderListScreen />} /> 
               <Route path="/admin/productlist" element={<ProductListScreen />} />
               </Route>


          </Route> 
        )
      )
 

                 



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <Provider store={store}>   
       <PayPalScriptProvider deferLoading={true}>  
          <RouterProvider router={router} />  
       </PayPalScriptProvider>
     </Provider>
  </React.StrictMode>,
);
 