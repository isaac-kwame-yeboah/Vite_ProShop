                              // ORDER SCREEN : Shows The Order Made By A Customer //  

import {Link, useParams} from "react-router-dom";
import {Row, Col, ListGroup, Image, Button, Card} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {useOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useDeliverOrderMutation} from "../slices/ordersApiSlice.js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

 

const OrderScreen = () => {  
                // Get Id From URL // 
         const {id:orderId} = useParams();  

             // Using Redux ToolKit // 
        const {data:order, refetch, isLoading, error} = useOrderDetailsQuery(orderId);
           console.log(order);

           // Using Redux ToolKit // 
        const [payOrder, {isLoading:loadingPay}]= usePayOrderMutation(); 

              // Using Redux ToolKit // 
        const [deliverOrder, {isLoading:loadingDeliver}] = useDeliverOrderMutation();

               // UsePayPalScript Reducer //  
          const [{isPending}, paypalDispatch ] = usePayPalScriptReducer(); 

               // Get Paypal Client Id Query // 
            const { data:paypal, isLoading:loadingPayPal, error:errorPayPal} = useGetPayPalClientIdQuery();

                // Get User Data //  
            const { userInfo } = useSelector((state) => state.auth);


                // useEffect for Paypal Client Id Query // 
                useEffect(() => {
                     // check for error //  
                   if (!errorPayPal && !loadingPayPal && paypal.clientId) {
                       const loadPayPalScript = async () => {
                        paypalDispatch({
                            type: "resetOptions",
                            value: {
                              "client-id": paypal.clientId,
                               currency: "USD",
                            }
                        }); 
                      paypalDispatch({type:"setLoadingStatus", value:"pending"});
                    }  
                         if (order && !order.isPaid) {
                            if (!window.paypal) {
                              loadPayPalScript();
                            }
                         }
                   }
               }, [order, paypal, errorPayPal, loadingPayPal, paypalDispatch]); 

               
               // onApprove Function (Triggers Paypal) // 
            function onApprove (data, actions) {
            return actions.order.capture().then(async function (details) {
              try {
                await payOrder({orderId, details}); 
                refetch(); 
              toast.success("Payment Successful");
              } catch (error) {
                toast.error(error?.data?.message || error.message)
              }
            });
          }
               
              
                // onApproveTest Function // 
              /* 
               async function onApproveTest () {
                  await payOrder({ orderId, details:{payer:{} }}); 
                  refetch(); 
                toast.success("Payment Successful");
                }  
              */
 
               
                // onError Function // 
              function onError (err) {
                 toast.error(err.message);
              }


              // createOrder Function // 
          function createOrder (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: order.totalPrice,
                  }
                }
              ]
            }).then((orderId) => {
                return orderId;
            });
          }
  

              // deliverOrderHandler Function //
              const deliverOrderHandler = async () => {
                try {
                 await deliverOrder(orderId);
                 refetch();
                toast.success("Order Delivered");
                } catch (err) {
                 toast.error(err?.data?.message || err.message);
                }
             }
 



  return ( isLoading ? <Loader /> : error ? <Message variant="danger">  </Message> : (
     <>  
        <h1 style={{fontWeight:"bold"}}> Order Id: {order._id} </h1>
       
       <Row> 
         <Col md={8}> {/* Column 1 Start */}
           <ListGroup> 
        <ListGroup.Item> 
            <h2 style={{fontWeight:"bold", color:"green"}}> Shipping </h2>  
              <p>  
                <strong> Name: {order.user.name}  </strong>
             </p> 

             <p> 
                <strong> Email: {order.user.email} </strong>
             </p> 

             <p> 
     <strong> Street Address: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country} </strong>
             </p> 

               {/* Check if order is delivered */} 
              {order.isDelivered ? (
                <Message variant="success"> Delivered on {order.deliveredAt} </Message>
            ) : ( 
              <Message variant="danger"> Not Delivered </Message>
            )}
        </ListGroup.Item> 

        <ListGroup.Item> 
               <h2 style={{fontWeight:"bold", color:"blue"}}> Payment Method </h2> 
               <p>  
                <strong> Method: {order.paymentMethod} </strong>
              </p> 

                 {/* Check if order is paid */} 
                   {order.isPaid ? (
              <Message variant="success"> Paid on {order.paidAt} </Message>
                 ) : ( 
              <Message variant="danger"> Not Paid </Message>
            )}
        </ListGroup.Item> 

           <ListGroup.Item> 
            <h2 style={{fontWeight:"bold", color:"orange"}}> Order Items</h2> 

            {/* Map through orderItems Array */} 
             {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}> 
                <Row> 
                   <Col md={2}> 
                    <Image src={item.image} alt={item.name} fluid rounded />
                   </Col> 

                   <Col> 
                    <Link to={`/product/${item.product}`}> {item.name}  </Link>
                   </Col> 

                   <Col md={4}> 
                   {item.qty} x ${item.price} = ${item.qty * item.price}
                   </Col>
                </Row>
                </ListGroup.Item>
             ))}
           </ListGroup.Item>

      
           </ListGroup>
         </Col> {/* Column 1 End */} 



         <Col md={4}> {/* Column 2 Start */}
           <Card> 
            <ListGroup variant="flush"> 
              <ListGroup.Item>
                <h2 style={{fontWeight:"bold"}}> Order Summary </h2>
              </ListGroup.Item>  

             <ListGroup.Item> 
            <Row> 
                <Col style={{fontWeight:"bold"}}> Items </Col> 
                <Col style={{fontWeight:"bold"}}> ${order.itemsPrice} </Col>
            </Row> 

            <Row> 
                <Col style={{fontWeight:"bold"}}> Shipping </Col> 
                <Col style={{fontWeight:"bold"}}> ${order.shippingPrice} </Col>
            </Row> 

            <Row> 
                <Col style={{fontWeight:"bold"}}> Tax </Col> 
                <Col style={{fontWeight:"bold"}}> ${order.taxPrice} </Col>
            </Row> 

            <Row> 
                <Col style={{fontWeight:"bold"}}> Total </Col> 
                <Col style={{fontWeight:"bold"}}>  ${order.totalPrice} </Col>
            </Row> 
             </ListGroup.Item>   

                {/* if order is not paid show pay button || PAY ORDER PLACEHOLDER */}
                         {!order.isPaid && (
                           <ListGroup.Item>  
                          {loadingPay && <Loader />}

                          {isPending ? <Loader /> : (
                            <div> 
            {/* <Button onClick={onApproveTest} style={{marginBottom:"10px"}}> Test Pay Order </Button>  */} 

                    <div>  
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}>  </PayPalButtons>
                     </div>
                            </div>
                          )}
                           </ListGroup.Item>
                         )}
                   
                        
 
                          {/* MARK AS DELIVERED  */}  
                        {loadingDeliver && <Loader /> } 

                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                          <ListGroup.Item> 
                            <Button type="button" className="btn btn-block" onClick={deliverOrderHandler} > 
                              Mark As Delivered
                            </Button>
                          </ListGroup.Item>
                        )}


            </ListGroup>
           </Card>

         </Col>  {/* Column 2 End */}
       </Row>
     
     </>
  )
     
  )
}

export default OrderScreen; 