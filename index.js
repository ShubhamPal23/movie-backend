import express, { json } from "express";
import { userRoutes } from "./routes/user_route.js";
import connectDB from "./db/connection.js";
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
connectDB()

app.use("/", userRoutes)
app.use((request, response, next) => { response.json({ message: "ERROR 404 >>>>NOT FoUND" }) })
app.listen(port, () => {
    console.log("Server is running on 3000")
})
