import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import logo from "../assets/logo.png";
// import { LinkContainer } from "react-bootstrap";  // 
/* NOTE: Vite.js does not support *LinkContainer* Use import { Nav } from "react-bootstrap"; */
import {useSelector, useDispatch} from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice"; 
import { useNavigate } from "react-router-dom"



const Header = () => { 
          // Get CartItems from Cart State //
    const { cartItems } = useSelector((state) => state.cart); 

          // Get userInfo from Auth State //
     const { userInfo } = useSelector((state) => state.auth); 
            
              // Initialize UseNavigate && useDispatch // 
         const dispatch =  useDispatch();
         const navigate = useNavigate();
          
               // Using Redux ToolKit //  
        const [ logoutApiCall ] = useLogoutMutation();


               // logoutHandler Function //
         const logoutHandler = async () => {
          try {
            await logoutApiCall().unwrap();
             // clear credentials from local storage //
               dispatch(logout());
               navigate("/login");
          } catch (error) {
            console.log(error);
          }
         }
        

  return (
       <> 
          <header>
          <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect> 
         <Container> 
        
               {/* Logo */}
           <Navbar.Brand href="/"> 
             <img src={logo} alt="ProShop" />
             ProShop
            </Navbar.Brand> 
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"> 
                <Nav className="ms-auto"> 

                    {/* Shopping Cart */}
         <Nav.Link href="/cart" > <FaShoppingCart /> Cart 
                      {/* Item Count In ShoppingCart */}
          {cartItems.length > 0 && (
            <Badge pill bg="success" style={{marginLeft: "5px"}} > 
                 {cartItems.reduce((acc, c) => acc + c.qty, 0)}
            </Badge>
          )} 
         </Nav.Link> 
          
            
           
                      {/* check for userInfo */} 
               {userInfo ? (
               <NavDropdown title={userInfo.name} id="username"> 
                   <Nav.Link href="/profile">  
                  <p style={{background:"white", color:"black", paddingLeft:"7px"}}>  Profile </p>  
                   </Nav.Link>  

                   <NavDropdown.Item onClick={logoutHandler}> Logout  </NavDropdown.Item> 
              </NavDropdown>
              
               ) : 
                (<Nav.Link href="/login"> <FaUser /> Sign In  </Nav.Link>)}


                             {/* Admin */}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="adminmenu">
                      <Nav.Link href="/admin/productlist">
                      <p style={{background:"white", color:"black", paddingLeft:"7px"}}> Products </p>  
                      </Nav.Link>  

                      <Nav.Link href="/admin/userlist">
                      <p style={{background:"white", color:"black", paddingLeft:"7px"}}> Users </p>  
                      </Nav.Link> 
                     
                      <Nav.Link href="/admin/orderlist">
                      <p style={{background:"white", color:"black", paddingLeft:"7px"}}> Orders </p>  
                      </Nav.Link> 
                      
                    </NavDropdown>
                  )}
 

                   
              
              </Nav>
            </Navbar.Collapse>
         </Container> 
          </Navbar>
        </header>
       
       </>
  )
}

export default Header 