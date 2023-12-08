 // Bring in mongoose // 
 import mongoose from "mongoose"  

 


    // Create Review Schema //
     const reviewSchema = new mongoose.Schema({
              // Form Fields For Review Model //
        name:{
           type: String,
           required: true,
        },

        rating:{
           type: Number, 
           required: true,
        }, 

        comment:{
           type: String,
           required: true, 
        },

        createdAt: {
           type: Date,
           default: Date.now
         },

        // User Relationship With Review Model //
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // User Model || User Collection // 
        required:true,
     }

     })



    // Create Product Schema //
    const productSchema = new mongoose.Schema({

          // Form Fields For Product Model //
       name: {
           type: String,
           required: true,
        }, 
      
        image: {
           type: String,
           required: true,
        }, 
 
       brand: {
       type: String,
       required: true,
       },

        category:{
           type: String,
           required: true,
        },

         description:{
            type: String,
            required: true,
         }, 

         reviews:[reviewSchema], 

         rating:{
           type: Number,
           required: true,
           default: 0,
         }, 

         numReviews: {
           type: Number,
           required: true,
           default: 0, 
         }, 

       price:{
           type: Number,
           required: true,
           default: 0,
       }, 

       countInStock:{
          type: Number,
          required: true,
          default: 0,
       }, 

       createdAt: {
           type: Date,
           default: Date.now,
         },

          // User Relationship With Product Model //
     user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",   // User Model || User Collection // 
       required:true,
    } 

    
    });


    const Product = mongoose.model("Product", productSchema);

    export default Product;
         


    