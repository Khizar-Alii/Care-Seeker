// import mysql from "mysql2";

// export const dbConnection = () => {
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "khizar",
//     database: "MERN_STACK_JOB_SEEKING",
//   });

  // Connect to the database
//   connection.connect((err) => {
//     if (err) {
//       console.error("Error connecting to database:", err);
//       return;
//     }
//     console.log("Connected to database successfully!");
//   });
//   connection.on("error", (err) => {
//     console.error("Database connection error:", err);
//   });

//   return connection;
// };


// app.post('/register',(req,res)=>{
//     const email = req.body.email
//     const name = req.body.name
//     const password = req.body.password
//     db.query( "INSERT INTO USERS (name,email,password) VALUES (? , ? , ?)",[name,email,password],(err,data)=>{
//         if(data){
//             res.send(data)
//         }else{
//             console.error(err);
//             res.send({message : 'Enter Correct Details'})
//         }
//     })
// })


// MongoDb Database
import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://programmingwithkhizi:MvNwxdxguWXhEG1F@jobseeking.auehmic.mongodb.net/", {
      dbName: "MERN_JOB_SEEKING_WEBAPP",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
