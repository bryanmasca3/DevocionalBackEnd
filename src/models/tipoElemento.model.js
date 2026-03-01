import mongoose from "mongoose";
const { Schema, model } = mongoose;
const tipoElementoSchema = new Schema(
  {
    descripcion: { type: String, required: true, trim: true },
  },
  { timestamps: false, versionKey: false }
);

export const TipoElementoModel = model("TipoElemento", tipoElementoSchema);
