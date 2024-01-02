// Bring in Custom asyncHandler Middleware // 
import asyncHandler from "../middleware/asyncHandler.js"

     // Bring in Order Model // 
import Order from "../models/orderModel.js";
   

         // @desc     Create new order // 
         // @route    POST  /api/orders
         // @access   Private
         const addOrderItems = asyncHandler(async (req, res) => {
            const { 
                  orderItems,
                  shippingAddress,
                  paymentMethod,
                  itemsPrice,
                  taxPrice,
                  shippingPrice,
                  totalPrice,
                  } = req.body;

                 // check if orderItems is empty //
                 if (orderItems && orderItems.length === 0) {
                    res.status(400);
                    throw new Error("No order items");
                 } else { 
                    // if orderItems is not empty then Create New Order // 
                 const order = new Order({
                     orderItems: orderItems.map((x) => ({
                       ...x,
                       product: x._id,
                       _id: undefined
                     })),
                     user: req.user._id,
                     shippingAddress,
                     paymentMethod,
                     itemsPrice,
                     taxPrice,
                     shippingPrice,
                     totalPrice,
                 });
                     
                     // save to database // 
              const createOrder = await order.save();

                    res.status(201).json(createOrder);
                 }
         }); 

              

              // @desc     Get logged in user orders // 
              // @route    GET  /api/orders/mine
              // @access   Private
     const getMyOrders = asyncHandler(async (req, res) => {
       const orders = await Order.find({user: req.user.id}) 
       res.status(200).json(orders)
             
      }); 


       
              // @desc     Get order by ID // 
              // @route    GET  /api/orders/:id
              // @access   Private
     const getOrderById = asyncHandler(async (req, res) => {
       const order = await Order.findById(req.params.id).populate("user", "name email");   
       
                     // check for order // 
                     if (order) {
                     res.status(200).json(order);
                        } else {
                     res.status(404);
                     throw new Error("Order not found");
                    }
 });  



                // @desc     Update order to paid // 
                // @route    PUT  /api/orders/:id/pay
                // @access   Private
                const updateOrderToPaid = asyncHandler(async (req, res) => {
            
                  const order = await Order.findById(req.params.id);
     
                       // check for order // 
                    if (order) {
                       order.isPaid = true;
                       order.paidAt = Date.now();
                       order.paymentResult = {
                         id: req.body.id,
                         status: req.body.status,
                         update_time: req.body.update_time,
                         email_address: req.body.payer.email_address,
                       };
    
                             // save to database // 
                       const updateOrder = await order.save();
    
                      res.status(200).json(updateOrder);
                    } else {
                      res.status(404);
                      throw new Error("Order not found");
                    }
          }); 
    



                 // @desc     Update order to delivered // 
                 // @route    PUT  /api/orders/:id/deliver
                 // @access   Private/Admin
     const updateOrderToDelivered = asyncHandler(async (req, res) => {
               const order = await Order.findById(req.params.id); 

                     // check for order //  
                     if (order) {
                      order.isDelivered = true;
                      order.deliveredAt = Date.now();  
                          // save order // 
                     const updatedOrder = await order.save();
                     res.status(200).json(updatedOrder);
                     } else {
                        res.status(404);
                        throw new Error("Order not found");
                     }
                      
 });  



                    // @desc     Get all orders  // 
                    // @route    GET  /api/orders/
                    // @access   Private/Admin
     const getAllOrders = asyncHandler(async (req, res) => {
            const orders = await Order.find({}).populate("user", "id name");
        
               res.status(200).json(orders);
 }); 


     export { addOrderItems,
              getMyOrders,
              getOrderById,
              updateOrderToPaid,
              updateOrderToDelivered,
              getAllOrders
          };

