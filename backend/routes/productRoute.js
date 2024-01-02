// Bring in express // 
import express from "express"; 

// Bring in express router // 
const router = express.Router();

// Bring in product controller functions // 
import { getProducts, getProductById, createProduct } from "../controllers/productController.js";

// Bring in protect && admin middleware // 
import { protect, admin } from "../middleware/authMiddleware.js";


        // Get All Products // 
      router.get("/", getProducts);

      // Get Single Product // 
       router.get("/:id", getProductById);
 
        // Create Product // 
        router.post("/", protect, admin, createProduct);
 
  

 


export default router;