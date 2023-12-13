                        // Displays All Products On The Home Page // 

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product"; 
import {useGetProductsQuery} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";



const HomeScreen = () => {  
               // Using Redux ToolKit // 
     const {data:products, isLoading, error } = useGetProductsQuery();
  
            
     
  return (
      <>  
                {/* check for isLoading */} 
 {isLoading ? (<Loader />) : error ? (<Message variant="danger"> {error?.data?.message || error.error} </Message>) : (<> 
             <h1> Latest Products </h1>

             <Row> 
                     {products.map((product) => (
               <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                <Product product={product} />
               </Col>  
                 ))} 
               </Row> 
          </>) } 




               
      </>
  ) 
}

export default HomeScreen; 



/*
     // useState for products  Without Redux Toolkit //  
        const [products, setProducts] = useState([]) 
         
          // useEffect //
        useEffect(() => {
      const fetchProducts = async () => {
        const { data } = await axios.get("/api/products"); 
        setProducts(data)
      }

          fetchProducts()
        }, []);
*/
