// MongoDb Database
import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://programmingwithkhizi:MvNwxdxguWXhEG1F@jobseeking.auehmic.mongodb.net/")
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
