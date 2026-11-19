import mongoose from "mongoose";
import config  from './../config/env.config.js';

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(config.MONGO_URI);
    console.log(`DB conectada a: ${db.connection.name}`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1); // Detiene la app si no hay DB
  }
};