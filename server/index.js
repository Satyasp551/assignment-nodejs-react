import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import employeeRoute from "./router/employee.router.js";

const app = express();
dotenv.config();

// Create Database connection
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (error) {
        console.log(error)
    }
};

app.use(express.json());
app.use(cors());

app.use("/api/auth", employeeRoute);

// dbConnect();
app.listen(8800, ()=>{
    dbConnect();
    console.log("Backend server is running")
})