import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DevocionalUsuarioSchema = new Schema(
  {
    success: { type: Boolean, required: true, default: false },
    completed: { type: Boolean, required: true ,default: false},

    id_usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    id_devocional: {
      type: Schema.Types.ObjectId,
      ref: "Devocional",
      required: true,
    },
  },
  { timestamps: false, versionKey: false },
);

export const DevocionalUsuarioModel = model(
  "DevocionalUsuario",
  DevocionalUsuarioSchema,
);
