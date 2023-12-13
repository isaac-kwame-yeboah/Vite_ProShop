// Bring in jwt // 
import jwt from "jsonwebtoken";

 
  const generateToken = (res, userId) => {
        // create token //  
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: "30d" });

        // set JWT AS HTTP-Only Cookie || save token in cookie   // 
         res.cookie("jwt", token, { 
         httpOnly: true,
         secure: process.env.NODE_ENV !== "development",
         sameSite: "strict",  // Prevent CSRF attacks //
         maxAge: 30 * 24 * 60 * 60 * 1000  // Expires in 30days // 
          }); 
  } 

  export default generateToken;