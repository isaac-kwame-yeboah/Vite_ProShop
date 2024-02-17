// Bring in path module // 
import path from "path";

// Bring in express // 
import express from "express";

// Bring in multer // 
import multer from "multer";

// Bring in express router // 
const router = express.Router();


 // Save to diskStorage // 
 const storage = multer.diskStorage({
     destination: function (req, file, cb){
          cb(null, "uploads/");   /* null is for error */
     },
     filename: function (req, file, cb){
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
     },
 });


// Check file type //  
 function checkFileType(file, cb){
      const filetypes = /jpg|jpeg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); 
      const mimetype = filetypes.test(file.mimetype);
          if (extname && mimetype) {
            return cb(null, true);
          } else {
            cb("Images only!");
          }
 }

 
 // Actual Upload // 
 const upload = multer({
    storage, 
 });


// Upload Image Route // 
router.post("/", upload.single("image"), (req, res) => {
    res.send({
        message: "Image Uploaded",
        image: `/${req.file.path}`,
    });
});


export default router;
