import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Successfully Database connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`Error connection to Databse: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
