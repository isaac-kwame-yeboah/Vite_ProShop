 // Bring in asyncHandler // 
 import asyncHandler from "../middleware/asyncHandler.js";

// Bring Product Model // 
import Product from "../models/productModel.js";



          // @desc     Get all products // 
          // @route    GET  /api/products
          // @access   Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}); 
       
         res.send(products);
});



            // @desc      Get all products // 
            // @route     GET  /api/products/:id
            // @access    Public
          const getProductById = asyncHandler(async (req, res) => {
            const product = await Product.findById(req.params.id);  
                // check if product exist // 
              if (product) {
               return res.json(product);
              } else {
                res.status(404); 
                throw new Error("Resource Not Found");
              }
        });  



              // @desc     Create A Products // 
              // @route    POST  /api/products
              // @access   Private/Admin
              const createProduct = asyncHandler(async (req, res) => {
                             // create product (Sample Product) // 
                    const product = new Product({ 
                     name: "Sample Name",
                     price: 0,
                     user: req.user._id,
                     image: "/images/sample.jpg",
                     brand: "Sample brand", 
                     category: "Sample category",
                     countInStock: 0,
                     numReviews: 0,
                     description:"Sample description",
                  })
                        // save product // 
                const createdProduct = await product.save();  
                     res.status(201).json(createdProduct);

            });

 




    export { getProducts,
             getProductById,
             createProduct,
             };