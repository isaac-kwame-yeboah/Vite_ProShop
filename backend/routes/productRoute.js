// Bring in express // 
import express from "express"; 

// Bring in express router // 
const router = express.Router();

// Bring in products //
// import products from "../data/products.js";

// Bring in asyncHandler ;// 
import asyncHandler from "../middleware/asyncHandler.js";

 // Bring Product Model // 
 import Product from "../models/productModel.js";


        // Get All Products // 
      router.get("/", asyncHandler(async (req, res) => {
        const products = await Product.find({});
         res.send(products);
 }));


      // Get Single Product // 
       router.get("/:id", asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);  

              if (product) {
                res.json(product);
              } 

           res.status(404).json({message:"Product not found"});
        
 }));


 
  






 


export default router;