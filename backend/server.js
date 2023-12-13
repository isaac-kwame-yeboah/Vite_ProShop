// Bring in express // 
import express from "express";

// Bring in colors // 
import colors from "colors";  

// Bring in dotenv // 
import dotenv from "dotenv";

// use dotenv file //
dotenv.config();  

  // Bring in cookie-parse // 
import cookieParser from "cookie-parser";

// Bring in connectDB  // 
import connectDB from "./config/db.js";

// Bring in productRoute //
import productRoute from "./routes/productRoute.js"; 

   // Bring in userRoute //
import userRoute from "./routes/userRoute.js";

 // Bring in errorMiddleware (Custom Error Handler) //  
 import { notFound, errorHandler } from "./middleware/errorMiddleware.js"


// Initialize express app //
const app = express(); 

// Form Body Parser Middleware //
app.use(express.json());  // send raw json 
app.use(express.urlencoded({ extended:true }));  // URL encoded //  

// use cookie parser middleware //
app.use(cookieParser());

// Connect to database //
connectDB();
  
     // Route //  
     app.get("/", (req, res) => {
        res.send("API is running...");
     }) 
     
      // Products Api EndPoint // 
     app.use("/api/products", productRoute);
      
     // Users Api Route // 
     app.use("/api/users", userRoute);

      // Bring in orderRoutes //



     
      // use errorHandler middleware // 
    app.use(notFound);
    app.use(errorHandler); 

// Set port // 
const PORT = process.env.PORT || 9000

// Start server // 
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`.yellow.underline);
});