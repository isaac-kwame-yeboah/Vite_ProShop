   // Bring in mongoose //  
   import mongoose from "mongoose" 



      // Create Order Schema //
      const orderSchema = new mongoose.Schema({

           // Form Fields For Order Model // 
   // NOTE: orderItems[] refers to the items in the cartItems[] in cartReducer State (Frontend) //
       orderItems: [
          {
            name:{type: String, required: true},
            qty: {type: Number, required: true},
            image:{type: String, required: true},
            price:{type: Number, required: true},

             // Reference To Product Model || Product Relationship With Order Model // 
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product",  // Product Model || Product Collection // 
            }, 

          },
       ], 


       shippingAddress:{
           address: {type: String, required: true}, 
           city: {type: String, required: true},
           postalCode: {type: String, required: true},
           country: {type: String, required: true},
       },


       paymentMethod:{
          type: String,
          required: true,
       },


       paymentResult:{
           id:{type: String},
           status: {type: String},
           update_time:{type: String},
           email_address:{type: String},
       },


       itemsPrice: {
         type: Number,
         required: true,
         default: 0.0,
       },
    

       taxPrice:{
            type: Number,
            required: true,
            default: 0.0
       }, 

      
       shippingPrice:{
          type: Number,
          required: true,
          default: 0.0,
       },


       totalPrice:{
        type: Number,
        required: true,
        default: 0.0,
       },


         isPaid:{
            type: Boolean,
            required: true,
            default: false,
         },


         paidAt:{
            type: Date,
         },

      
        isDelivered:{
        type: Boolean,
        required: true,
        default: false,
        },


          deliveredAt:{
            type: Date,
          },


          createdAt: {
            type: Date,
            default: Date.now
          },


         // User Relationship With Order Model //
      user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"   // User Model || User Collection // 
     }

      })  


      const Order = mongoose.model("Order", orderSchema);

      export default Order;