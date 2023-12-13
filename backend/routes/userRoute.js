 // Bring in express // 
 import express from "express";

 // Bring in express router // 
const router = express.Router(); 

  // Bring in User Controller functions //  
  import { authUser,
           registerUser,
           logoutUser,
           getUserProfile,
           updateUserProfile,
           getUsers,
           getUserById,
           deleteUser, 
           updateUser
  } from "../controllers/userController.js";  

  // Bring in protect && admin middleware // 
import { protect, admin } from "../middleware/authMiddleware.js";



      // Get All Users // 
      router.get("/", protect, admin, getUsers) 

      // Register User Route // 
   router.post("/", registerUser) 

    // Logout Route //
  router.post("/logout", logoutUser) 

  // Login User Route //
   router.post("/login", authUser)

 // Get User Profile // 
  router.get("/userProfile", protect, getUserProfile)

   // Update User Profile // 
 router.put("/userProfile", protect, updateUserProfile)

 // Get Single User // 
 router.get("/:id", protect, admin, getUserById)

   //  Delete User //
  router.delete("/:id", protect, admin, deleteUser)

   //  Update User //
   router.put("/:id", protect, admin, updateUser)


  export default router; 