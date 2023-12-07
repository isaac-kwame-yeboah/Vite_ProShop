import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from './App.jsx';
// import './index.css';
// import "bootstrap/dist/css/bootstrap.min.css";    // Default Bootstrap Theme // 
import "./assets/styles/bootstrap.custom.css";   // Custom Bootstrap Theme // 
import "./assets/styles/index.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";



           // Create Our Router //
      const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />} >
              <Route index={true} path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />

          </Route>
        )
      )
 



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
 