import mongoose from "mongoose";
const { Schema, model } = mongoose;

const devocionalSchema = new Schema(
  {
    titulo: {
      type: String,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    fecha_publicacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const DevocionalModel = model("DevocionalModel", devocionalSchema);
