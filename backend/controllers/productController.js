 // Bring in asyncHandler // 
 import asyncHandler from "../middleware/asyncHandler.js";

// Bring Product Model // 
import Product from "../models/productModel.js";



          // @desc     Get all products // 
          // @route    GET  /api/products
          // @access   Public
const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({}); 
       
         res.send(products);
});



            // @desc      Get all products // 
            // @route     GET  /api/products/:id
            // @access    Public
          const getProductById = asyncHandler( async (req, res) => {
            const product = await Product.findById(req.params.id);  
                // check if product exist // 
              if (product) {
               return res.json(product);
              } else {
                res.status(404); 
                throw new Error("Resource Not Found");
              }
        }); 



    export { getProducts,
             getProductById,
             };