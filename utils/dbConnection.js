import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("DB is Connected");
  } catch (error) {
    console.log("DB is not Connected");
    console.log(error);
  }
};

export default dbConnection;
