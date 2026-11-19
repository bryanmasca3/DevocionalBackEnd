import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DevocionalUsuarioSchema = new Schema(
  {
    success: { type: Boolean, required: true, default: false },
    completed: { type: Boolean, required: true, default: false },

    id_usuario: { type: Schema.Types.ObjectId, ref: "UsuarioModel", required: true },
    id_devocional: {
      type: Schema.Types.ObjectId,
      ref: "DevocionalModel",
      required: true,
    },
    /*-------------------------*/
    ensenanza: { type: [String]},
    curiosidad: { type: [String] },
    preguntas: { type: [String] },

    /*------------------------- */
  },
  { timestamps: false, versionKey: false },
);

DevocionalUsuarioSchema.index({ id_usuario: 1, id_devocional: 1 });

export const DevocionalUsuarioModel = model(
  "DevocionalUsuario",
  DevocionalUsuarioSchema,
);
