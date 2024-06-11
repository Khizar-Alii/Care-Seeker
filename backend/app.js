import express from "express";
import * as dotenv from 'dotenv';
const app = express();
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routers/userRouter.js"
import jobRouter from "./routers/jobRouter.js"
import employerRouter from "./routers/employerRouter.js"; 
import jobSeekerRouter from "./routers/jobSeekerRouter.js"; 
import applicationRouter from "./routers/applicationRouter.js"
import { errorMiddleware } from "./middlewares/Error.js";
import {dbConnection} from "./database/dbConnection.js"
// dotenv.config({path : "./config/config.env"});
// FRONTEND_URL = "http://localhost:5173/"

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({extended : true}))


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.use("/api/v1/user",userRouter)
app.use("/api/v1/application",applicationRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/employer", employerRouter);
app.use("/api/v1/jobseeker", jobSeekerRouter); 


dbConnection()
app.use(errorMiddleware)

export default app;