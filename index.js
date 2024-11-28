// import express, { json } from "express";
// import { userRoutes } from "./routes/user_route.js";
// import { movieRoutes } from './routes/movie_route.js';
// import connectDB from "./db/connection.js";
// import cors from 'cors';
// const app = express();
// const port = 3000;
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));
// connectDB()
// app.use("/", userRoutes)
// app.use('/api', movieRoutes);
// app.use((request, response, next) => { response.json({ message: "ERROR 404 >>>>NOT FoUND" }) })
// app.listen(port, () => {
//     console.log("Server is running on 3000")
// })

import express, { json } from "express";
import { userRoutes } from "./routes/user_route.js";
import { movieRoutes } from './routes/movie_route.js'; // Import movie routes
import connectDB from "./db/connection.js";
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
connectDB();
// Define routes
app.use("/", userRoutes);       // User routes (login, register, etc.)
app.use('/movies', movieRoutes);    // Movie routes (get movies data)
// 404 error handler for undefined routes
app.use((request, response, next) => { 
  response.status(404).json({ message: "ERROR 404 >>>>NOT FOUND" });
});
app.listen(port, () => {
    console.log("Server is running on 3000")
})