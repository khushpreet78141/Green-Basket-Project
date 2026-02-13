import express from "express"
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors'
import productRoutes from "./routes/productRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

const app = express()
//middlewares
app.use(express.json())
app.use(cors())
//database connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Mongodb connected successfully")})
    .catch((err)=>{console.error(err)})


//route handling
app.use("/api/product",productRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);


//server
const port = process.env.PORT || 3000


app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
  

})
