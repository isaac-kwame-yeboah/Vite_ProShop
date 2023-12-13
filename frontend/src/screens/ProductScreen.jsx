                        // Product Details Page || Show Individual Product // 

import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery} from "../slices/productsApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message";
import {useState} from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

 

const ProductScreen = () => {  
              
                 // Get Id From Url // 
        const { id:productId } = useParams();  

            // Initialized useDispatch && useNavigate // 
            const dispatch = useDispatch();
            const navigate = useNavigate();

           // useState for Quantity of Items //  
          const [qty, setQty] = useState(1);

             // Using Redux ToolKit // 
      const {data:product, isLoading, error} = useGetProductDetailsQuery(productId);
       
        // addToCartHandler Function // 
        const addToCartHandler = () => {
          dispatch(addToCart({...product, qty}));
          navigate("/cart");
         }


  return (
     <>  
        <Link className="btn btn-light my-3" to="/"> Back </Link> 

              {/* check for isLoading */} 
            {isLoading ? (<Loader />) : error ? (<Message variant="danger"> {error?.data?.message || error.error} </Message>) : (
                <Row> 
                <Col md={5}> {/* Column 1 start */}
                  <Image src={product.image} alt={product.name} fluid />
                </Col> {/* Column 1 end */}
     
      
      
                <Col md={4}> {/* Column 2 start */}
             <ListGroup variant="flush" > 
             <ListGroup.Item>
                <h3> {product.name} </h3>
             </ListGroup.Item>  
     
             <ListGroup.Item> 
                 <Rating value={product.rating} text={`${product.numReviews} reviews`} />
             </ListGroup.Item> 
     
             <ListGroup.Item> Price: ${product.price} </ListGroup.Item> 
     
             <ListGroup.Item> Description: {product.description} </ListGroup.Item>
             </ListGroup> 
                </Col> {/* Column 2 end */}
     
             
             
                <Col md={3}> {/* Column 3 start */} 
                 <Card> 
             <ListGroup>
                 <ListGroup.Item> 
                     <Row>
                         <Col> Price:  </Col> 
                         <Col> {product.price}  </Col>
                     </Row>
                 </ListGroup.Item> 
     
                 <ListGroup.Item> 
                     <Row>
                         <Col> Status:  </Col> 
                         <Col> <strong> {product.countInStock > 0 ? "InStock" : "Out Of Stock" } </strong> </Col>
                     </Row>
                 </ListGroup.Item>  
     
                     {/* CountInStock (QTY) */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                    <Row>
                    <Col> Qty </Col> 
                    <Col>  
               <Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                 {/* Get the actual item number in stock (CountInStock) */}
               {[...Array(product.countInStock).keys()].map((x) => (
                 <option key={x + 1} value={x + 1}>  
                    {x + 1}
                 </option>
              ))}

                 </Form.Control>
                     </Col>
                    </Row>
                </ListGroup.Item>
              )}

                 <ListGroup.Item> 
     <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}> 
             Add To Cart  
             </Button>
             </ListGroup.Item>  
                 
             </ListGroup>
                 </Card>
                </Col> {/* Column 3 end */}
     
     
              </Row> 
            )}

             
      

 
      
     </>
  )
}

export default ProductScreen


/* 
          // useState for products // 
              const [product, setProduct] = useState([]);

                // Get Id From Url // 
        const { id:productId } = useParams(); 

        useEffect(() => {
            const fetchProduct = async () => {
              const {data} = await axios.get(`/api/products/${productId}`);
                setProduct(data)
            }
            fetchProduct();
                  }, [productId]);
*/