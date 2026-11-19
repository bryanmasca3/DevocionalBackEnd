import mongoose from "mongoose";
const { Schema, model } = mongoose;

const preguntaUsuarioSchema = new Schema(
  {
    success: { type: Boolean, required: true, default: false },
    completed: { type: Boolean, required: true },

    id_usuario: { type: Schema.Types.ObjectId, ref: "UsuarioModel", required: true },
    id_pregunta: {
      type: Schema.Types.ObjectId,
      ref: "PreguntaModel",
      required: true,
    },
  },
  { timestamps: false, versionKey: false },
);

preguntaUsuarioSchema.index({ id_usuario: 1, id_pregunta: 1 });

export const PreguntaUsuarioModel = model(
  "PreguntaUsuario",
  preguntaUsuarioSchema,
);
