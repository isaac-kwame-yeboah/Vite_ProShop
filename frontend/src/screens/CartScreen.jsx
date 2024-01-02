                             // SHOPPING CART SCREEN // 
 
import { Link, useNavigate} from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector} from "react-redux"
import { addToCart, removeFromCart  } from "../slices/cartSlice";



const CartScreen = () => { 
            // Initialize useNavigate && useDispatch // 
        const navigate = useNavigate();
        const dispatch = useDispatch();

            // Get CartItems from Cart State //
       const {cartItems} = useSelector((state) => state.cart); 

          // addToCartHandler function // 
       const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}));
    }
 

          // removeFromCartHandler function // 
       const removeFromCartHandler = async (id) => {
         dispatch(removeFromCart(id));
    }   
 

                // checkOutHandler Function // 
           const checkOutHandler = async () => {
                navigate("/login?redirect=/shipping");
           }
          



  return (
       <> 
        <Row> 
          <Col md={8}>    {/* Parent 1 Column Start */}
       <h1 style={{marginBottom: "20px", color: "green", fontWeight: "bold"}}> Shopping Cart </h1>   
          {cartItems.length === 0 ? ( 
            <Message>       
               Your Cart is Empty! <Link to="/"> Go Back </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
                {/* Map through cartItems*/} 
                {cartItems.map((item) => (
                <ListGroup.Item key={item._id}> 
               <Row> 
                  {/* Column 1 */}
                <Col md={2}>  
                 <Image src={item.image} alt={item.name} fluid rounded />
                </Col>  

                 {/* Column 2 */}
              <Col md={3}>  
              <Link to= {`/product/${item._id}`}> {item.name}  </Link>
              </Col>
   
              {/* Column 3 */}
               <Col md={2}> 
                ${item.price}
               </Col>

              {/* Column 4 */}
              <Col md={2}> 
     <Form.Control as="select" value={item.qty} onChange={(e) => {addToCartHandler(item, Number(e.target.value))}}>
              {[...Array(item.countInStock).keys()].map((x) => (
                 <option key={x + 1} value={x + 1}>  
                    {x + 1}
                 </option>
              ))}

             </Form.Control>
                      </Col> 

                   {/* Column 5  */}
                <Col> 
     <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)} > <FaTrash />  </Button>   
                </Col>


               </Row>
                </ListGroup.Item>
                ))}
            </ListGroup>
          )}

           </Col>   {/* Parent 1 Column End */}

 
 
            
          <Col md={4}>   {/* Parent 2 Column Start*/}
           <Card> 
            <ListGroup variant="flush"> 
             <ListGroup.Item>  
                             {/* Total Item Quantity In The Cart  */}
              <h2> Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items </h2> 

                         {/* Total Prices Of Items In The Cart */}
               ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
             </ListGroup.Item>  

             <ListGroup.Item>  
                {/* Proceed To Check Out Button */}  
 <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkOutHandler} >  
                   Proceed To Checkout
                   </Button>
             </ListGroup.Item>
            </ListGroup>
           </Card>

          </Col>  {/* Parent 2 Column End */}



        </Row> 
       
       </>

  ) 
} 
 
export default CartScreen