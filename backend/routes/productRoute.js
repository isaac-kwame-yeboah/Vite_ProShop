// Bring in express // 
import express from "express"; 

// Bring in express router // 
const router = express.Router();

// Bring in product controller functions // 
import { getProducts, getProductById,} from "../controllers/productController.js";



        // Get All Products // 
      router.get("/", getProducts);

      // Get Single Product // 
       router.get("/:id", getProductById);

 
  

 


export default router;