                           // PRODUCT-LIST SCREEN //  

import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice.js";
import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";



const ProductListScreen = () => { 
                 // Using Redux Toolkit //   
            const {data:products, isLoading, error, refetch } = useGetProductsQuery(); 
                 console.log(products); 

                 // Using Redux Toolkit //   
            const [ createProduct, {isLoading:loadingCreate} ] = useCreateProductMutation();

                 // Using Redux Toolkit //   
            const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation()

                       // deleteHandler Function //   
                    const deleteHandler = async (id) => {
                              if (window.confirm("Are you sure?")) {
                             try {
                               await deleteProduct(id);
                               toast.success("Product deleted");
                               refetch();
                             } catch (err) {
                              toast.error(err?.data?.message || err.error);
                             }
                              }
                    }
         
                     
                     // createProductHandler Function //  
                 const createProductHandler = async () => {
                      if (window.confirm("Are you sure you want to create a new product?")) {
                         try {
                          await createProduct(); 
                          toast.success("Product created");
                            refetch();
                         } catch (error) {
                         toast.error(error.data?.message || error.error)
                         }
                      }         
                 }


  return (
    <>  
         <Row className="align-items-center" > 
            <Col>    {/* 1st Column start */}
                <h1> Products </h1>
            </Col>    {/* 1st Column end */}

               <Col className="text-end">   {/* 2nd Column start */}
                 <Button className="btn-sm m-3" onClick={createProductHandler}>   
                  <FaEdit /> Create Product
                </Button>
               </Col>     {/* 2nd Column end */} 
         </Row> 
                {loadingCreate && <Loader />}
                {loadingDelete && <Loader />}

               {/* check for isLoading */} 
                  {isLoading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : (
                    <>  
                       <Table striped hover responsive className="table-sm">  
                       <thead> 
                           <tr>
                              <th> PRODUCT ID </th> 
                              <th> NAME </th> 
                              <th> PRICE </th> 
                              <th> CATEGORY </th> 
                              <th> BRAND </th>  
                               <th> </th>   {/* Edit Button PlaceHolder */} 
                               <th> </th>   {/* Delete Button PlaceHolder */} 
                           </tr>    
                       </thead>  
                         <tbody> 
                            {/* Map through products */}  
                            {products.map((product) => (
                              <tr key={product._id}> 
                                 <td> {product._id} </td> 
                                 <td> {product.name} </td> 
                                 <td> {product.price} </td>  
                                 <td> {product.category} </td> 
                                 <td> {product.brand} </td>                                
                                 <td>  
                                   <Nav.Link href={`/admin/product/${product._id}/edit`}> 
              <Button variant="light" className="btn-sm mx-2"> <FaEdit /> Edit  </Button>
                                   </Nav.Link> 
                                   </td>   

                                <td> 
                 <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}> 
                     <FaTrash style={{color:"white"}}/> Delete
                 </Button>
                                </td>
                              </tr>
                            ))} 
                         </tbody>
                       </Table>
                    </>
                  )}
    </>
  )
}

export default ProductListScreen