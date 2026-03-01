import mongoose from "mongoose";
const { Schema, model } = mongoose;

const preguntaSchema = new Schema(
  {
    id_usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    id_devocional: {
      type: Schema.Types.ObjectId,
      ref: "Devocional",
      required: true,
    },
    titulo: { type: String, required: true, trim: true },
    reflexion: { type: String, required: false, trim: true },
    oracion: { type: String, required: false, trim: true },
    orden: { type: Number, required: true},
  },
  { timestamps: true, versionKey: false },
);

export const PreguntaModel = model("PreguntaModel", preguntaSchema);
