// Bring in express // 
import express from "express";

// Bring in colors // 
import colors from "colors";

// Initialize express app //
const app = express();

     // Route //  
     app.get("/", (req, res) => {
        res.send("API is running...");
     })



// Set port // 
const PORT = process.env.PORT || 9000

// Start server // 
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`.yellow.underline)
})