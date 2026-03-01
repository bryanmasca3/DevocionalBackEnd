import mongoose from "mongoose";
import config  from './../config/env.config.js';

const URI = config.MONGO_URI || "mongodb://localhost:27017/xxx";

export const connectDB = async () => {
  try { 
    const db = await mongoose.connect(URI);
    console.log(`DB conectada a: ${db.connection.name}`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1); // Detiene la app si no hay DB
  }
};