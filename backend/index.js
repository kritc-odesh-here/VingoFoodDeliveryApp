import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
//cors used to connect fnd and bnd

const app = express();
const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// global middleware each route has to pass through it
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter); //adds this before each route
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDb();
  console.log(`server started at ${port}`);
});
