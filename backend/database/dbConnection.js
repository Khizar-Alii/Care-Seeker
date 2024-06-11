// MongoDb Database
import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "MERN_JOB_SEEKING_WEBAPP",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};


// for atlas db


// import mongoose from "mongoose";

// export const dbConnection = () => {
//   mongoose
//     .connect("mongodb+srv://programmingwithkhizi:MvNwxdxguWXhEG1F@jobseeking.auehmic.mongodb.net/", {
//       dbName: "MERN_JOB_SEEKING_WEBAPP",
//     })
//     .then(() => {
//       console.log("Connected to database.");
//     })
//     .catch((err) => {
//       console.log(`Some Error occured. ${err}`);
//     });
// };
