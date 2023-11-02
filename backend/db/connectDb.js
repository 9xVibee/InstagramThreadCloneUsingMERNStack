import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "instagram-thread",

      // To avoid warnings in the console
      useUnifiedTopology: true,
    });

    // on connecting displaying connected message!
    console.log(`Mongoose Connected : ${conn.connection.host}`);
  } catch (error) {
    // if any error occurs while connecting the atlas then displaying it!
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
