                              // User-LIST SCREEN //

import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice.js";
import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";                    
                  

                              
  const UserListScreen = () => { 
                         // Using Redux Toolkit // 
             const {data:users, refetch, isLoading, error} = useGetUsersQuery();
                    console.log(users);
                              
                  // Using Redux Toolkit // 
            const [deleteUser, {isLoading:loadingDelete}] = useDeleteUserMutation();

                    
             const deleteHandler = async (id) => {
                if (window.confirm("Are you sure?")) {
                   try {
                     await deleteUser(id); 
                     toast.success("User deleted");
                       refetch();
                   } catch (err) {
                     toast.error(err?.data?.message || err.error);
                   }
                }
             }

                              
                 return (
                 <>
                    <h1> Users </h1> 
         {loadingDelete && <Loader /> }

          {isLoading ? <Loader /> : error ? <Message variant="danger" > {error} </Message> : (
        <Table striped hover responsive className="table-sm">
                  <thead>
               <tr> 
                   <th> USER ID </th> 
                   <th> USER NAME </th> 
                   <th> EMAIL </th> 
                   <th> ADMIN </th>   
                   <th> </th>
               </tr>
                  </thead>  
                              
                      <tbody> 
                             {/* Map through users */}  
                    {users.map((user) => (
                 <tr key={user._id}>  
                 <td> {user._id} </td>
                <td> {user.name} </td>  
                <td> <a href={`mailto:${user.email}`}> </a> {user.email} </td>
                <td> 
                     {user.isAdmin ? (
                        <FaCheck style={{color:"green"}} />
                     ) : (
                        <FaTimes style={{color:"red"}} />
                     ) }
                </td>
            
             <td> 
          <Nav.Link href={`/admin/userlist/${user._id}/edit`}>
         <Button variant="light" className="btn-sm">  
             <FaEdit /> Edit
         </Button>
                </Nav.Link> 
           </td> 

           <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)} >
             <FaTrash /> Delete
           </Button>
                               
                  </tr>
          ))}
                    
            </tbody>
                 </Table>
              )}
                    
                
            </>
             )
            }
        
export default UserListScreen