// Bring in express // 
import express from "express"; 

// Bring in express router // 
const router = express.Router();

// Bring in product controller functions // 
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview } from "../controllers/productController.js";

// Bring in protect && admin middleware // 
import { protect, admin } from "../middleware/authMiddleware.js";


        // Get All Products // 
      router.get("/", getProducts);

      // Get Single Product // 
       router.get("/:id", getProductById);
 
        // Create Product // 
        router.post("/", protect, admin, createProduct); 

         // Update Product // 
         router.put("/:id", protect, admin, updateProduct);
 
         // Delete Product // 
         router.delete("/:id", protect, admin, deleteProduct);

        // Create New Review // 
        router.post("/:id/reviews", protect, createProductReview);


export default router;