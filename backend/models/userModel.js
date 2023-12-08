         // Bring in mongoose // 
         import mongoose from "mongoose";

         // Bring in bcrypt // 
      import bcrypt from "bcryptjs"
   
  
  
      // Create User Schema // 
      const userSchema = new mongoose.Schema({
             // Form Fields For User Model // 
            name:{
              type: String,
              required: true
            },
  
            email:{
              type:String,
              required: true,
              unique: true,
              match: [
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  'Please add a valid email'
                ] // regular expression // 
            },
  
            password:{
              type: String,
              required: true,
            },
  
            isAdmin:{ 
              type: Boolean,
              required: true,
              default: false,
            }, 
  
            createdAt: {
              type: Date,
              default: Date.now,
            },
  
      }); 
  

             // Encrypt Password Using Bcrypt //  
             userSchema.pre("save", async function (next){
                   if(!this.isModified("password")) {
                       next();
                   }   
  
                   // Generate Salt To Hashed Password Using GenSalt Method //  
               const salt = await bcrypt.genSalt(10);
  
                       // hash password with salt // 
                this.password = await bcrypt.hash(this.password, salt)
             }) 
  
  
             
             // Match User Entered Password To Hashed Password In Database // 
          userSchema.methods.matchPassword = async function(enteredPassword){
                // Compare Plain Text Password To The Hash Password //  
            return await bcrypt.compare(enteredPassword, this.password)
          }
  
   
  
      const User = mongoose.model("User", userSchema); 
  
      export default User;