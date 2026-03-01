import mongoose from "mongoose";
const { Schema, model } = mongoose;

const preguntaUsuarioSchema = new Schema(
  {
    success: { type: Boolean, required: true, default: false },
    completed: { type: Boolean, required: true },

    id_usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    id_pregunta: {
      type: Schema.Types.ObjectId,
      ref: "Pregunta",
      required: true,
    },
  },
  { timestamps: false, versionKey: false },
);

export const PreguntaUsuarioModel = model(
  "PreguntaUsuario",
  preguntaUsuarioSchema,
);
