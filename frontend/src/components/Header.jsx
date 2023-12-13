import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import logo from "../assets/logo.png";
// import { LinkContainer } from "react-bootstrap"; // NOTE: Vite.js does not support *LinkContainer* //
import {useSelector} from "react-redux";



const Header = () => { 
          // Get CartItems from Cart State //
    const { cartItems } = useSelector((state) => state.cart);

        

  return (
       <> 
          <header>
          <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect> 
         <Container> 
        
           <Navbar.Brand href="/"> 
             <img src={logo} alt="ProShop" />
             ProShop
            </Navbar.Brand> 
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"> 
                <Nav className="ms-auto"> 


         <Nav.Link href="/cart" > <FaShoppingCart /> Cart 
                      {/* Item Count In ShoppingCart */}
          {cartItems.length > 0 && (
            <Badge pill bg="success" style={{marginLeft: "5px"}} > 
                 {cartItems.reduce((acc, c) => acc + c.qty, 0)}
            </Badge>
          )} 
         </Nav.Link> 
          
                 <Nav.Link href="/login"> <FaUser /> Sign In  </Nav.Link>  
              
              </Nav>
            </Navbar.Collapse>
         </Container> 
          </Navbar>
        </header>
       
       </>
  )
}

export default Header 