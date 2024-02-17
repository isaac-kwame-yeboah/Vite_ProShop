                       // Product Details Page || Show Individual Product // 

import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery, useCreateReviewMutation} from "../slices/productsApiSlice.js";
import Loader from "../components/Loader"
import Message from "../components/Message";
import {useState} from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
 

const ProductScreen = () => {  
               
                 // Get Id From Url // 
        const { id:productId } = useParams();  

            // Initialized useDispatch && useNavigate // 
            const dispatch = useDispatch();
            const navigate = useNavigate();

           // useState for Quantity of Items //  
          const [qty, setQty] = useState(1);
          const [rating, setRating] =useState(0);
          const [comment, setComment] = useState("");

 
             // Using Redux ToolKit // 
      const {data:product, isLoading, refetch, error} = useGetProductDetailsQuery(productId); 

             // Using Redux ToolKit // 
      const [createReview, {isLoading:loadingProductReview}] = useCreateReviewMutation();
       
         // Get userInfo // 
       const {userInfo} = useSelector((state) => state.auth);

        // addToCartHandler Function // 
        const addToCartHandler = () => {
          dispatch(addToCart({...product, qty}));
          navigate("/cart");
         }


           // submitHandler Function // 
          const submitHandler = async (e) => {
              e.preventDefault();
             try {
               await createReview({
                 productId,
                 rating,
                 comment
               }).unwrap(); 
                refetch();
                toast.success("Review Submitted"); 
                setRating(0);
                setComment("");
             } catch (err) {
               toast.error(err?.data?.message || err.error);
             }
          };



  return (
     <>  
        <Link className="btn btn-light my-3" to="/"> Go Back </Link> 

              {/* check for isLoading */} 
  {isLoading ? (<Loader />) : error ? (<Message variant="danger"> {error?.data?.message || error.error} </Message>) : (
                <>
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


                    {/* Product Review */}
               <Row className="review"> 
                <Col md={6}> 
                <h2> Reviews </h2> 
                {product.reviews.length === 0 && <Message> No Reviews </Message>} 
                  <ListGroup variant="flush"> 
                       {/* Map Through Reviews */}
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}> 
                         <strong> {review.name} </strong> 
                         <Rating value= {review.rating} /> 
                         <p> {review.createdAt.substring(0, 10)} </p> 
                         <p> {review.comment} </p>
                      </ListGroup.Item>  
                    ))} 

                    <ListGroup.Item> 
                       <h2> Write a Customer Review </h2> 
                       {loadingProductReview && <Loader />}
                             
                          {/* Check if user is logged in */}
                        {userInfo ? ( 
                          <Form onSubmit={submitHandler}> 
                             {/* Rating Field */}
                        <Form.Group controlId="rating" className="my-2" > 
                        <Form.Label> Rating </Form.Label>
   <Form.Control as="select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value=""> Select </option> 
                    <option value="1"> 1 - Poor </option> 
                    <option value="2"> 2 - Fair </option> 
                    <option value="3"> 3 - Good </option> 
                    <option value="4"> 4 - Very Good </option> 
                    <option value="5"> 5 - Excellent </option>  
   </Form.Control>
                        </Form.Group> 

                           {/* Comment Field */}
                     <Form.Group controlId="comment" className="my-2"> 
                      <Form.Label> Comment </Form.Label> 
 <Form.Control as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)}> 

</Form.Control>
                     </Form.Group> 

           <Button disabled={loadingProductReview} type="submit" variant="primary">  
                Submit
            </Button>
                          </Form>  
                            ) : ( 
                          <Message>  
                        Please <Link to="/login"> Sign In </Link> to write a review{""}
                          </Message>  
                        )}
                    </ListGroup.Item>

                  </ListGroup>
                </Col>
               </Row>
              </>
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