                           // LOGIN SCREEN // 

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
 
 
const LoginScreen = () => {  
              // useState for forms //
          const [ email, setEmail] = useState("");
          const [ password, setPassword] = useState(""); 

          // Initialize useDispatch && useNavigate // 
          const dispatch = useDispatch();
          const navigate = useNavigate();  

           // Using Redux ToolKit // 
        const [ login, { isLoading }] = useLoginMutation();

          // get useInfo from authSlice reducer //  
           const { userInfo } = useSelector((state) => state.auth); 

               // destructure search property from useLocation Hook // 
          const { search } = useLocation();
          const sp = new URLSearchParams(search);  // Note: sp means searchParams  
                   // set redirect to homepage ("/")  // 
          const redirect = sp.get("redirect") || "/";

            
               // useEffect hook - check if user is login //  
             useEffect(() => {
                if (userInfo) {
                  navigate(redirect);
                }
             }, [userInfo, redirect, navigate]);  


              // submitHandler function // 
              const submitHandler = async (e) => {
                e.preventDefault()
            try {
               const res = await login({ email, password}).unwrap();  // Note: unwrap returns a promise //  
                 dispatch(setCredentials({...res,}));
                 navigate(redirect)
                 toast.success("Login Successful");
            } catch (error) {
              // toast.error("Invalid user credentials");  // Custom error message
                toast.error(error.data?.message || error.error) // Default error message 
            }
          }


  return (
       <> 
         <FormContainer> 
            <h1> Sign In </h1> 

          <Form onSubmit={submitHandler}> 
         <Form.Group controlId="email" className="my-3"> 
         <Form.Label> Email Address </Form.Label> 
   <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}> 

   </Form.Control>  
            </Form.Group>  

         <Form.Group controlId="password" className="my-3"> 
         <Form.Label> Password </Form.Label> 
  <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}> 

   </Form.Control>  
            </Form.Group>
 
         <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}> 
             Sign In
         </Button>  
           
                        {/* Once we try to login  */}
                        { isLoading && <Loader /> }
              </Form>

          <Row className="py-3"> 
        <Col> 
         New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} > Register </Link>
        </Col>
          </Row>

         </FormContainer> 
       
       </>
  )
}

export default LoginScreen