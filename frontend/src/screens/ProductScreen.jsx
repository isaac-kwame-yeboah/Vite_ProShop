                        // Product Details Page || Show Individual Product // 

import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import axios from "axios";
 


const ProductScreen = () => {  
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

      
     

  return (
     <>  
        <Link className="btn btn-light my-3" to="/"> Back </Link>  

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

            <ListGroup.Item> 
               <Button className="btn-block" type="button" disabled={product.countInStock === 0}> Add To Cart </Button>
            </ListGroup.Item>  
            
        </ListGroup>
            </Card>
           </Col> {/* Column 3 end */}


         </Row> 

 
      
     </>
  )
}

export default ProductScreen