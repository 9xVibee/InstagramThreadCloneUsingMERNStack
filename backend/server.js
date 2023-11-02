import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
// importing routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// using express
const app = express();

// using middleware
app.use(express.urlencoded({ extended: true })); // to parse form data in the req.body
app.use(express.json({ limit: "50mb" })); // to prase JSON data in the req.body, bcoz of this we can easily access the req.body data!
app.use(cookieParser()); // it is allow us to get the cookie from the request and to set the cookie in response

// using the dotenv
dotenv.config();

// calling database connection method
connectDb();

// port
const PORT = process.env.PORT || 5000;

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// listening the app
app.listen(PORT, () => console.log(`server start at http://localhost:${PORT}`));
