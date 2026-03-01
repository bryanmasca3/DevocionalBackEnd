import mongoose from "mongoose";
const { Schema, model } = mongoose;

const elementoSchema = new Schema(
  {
    texto_ayuda: { type: String, trim: true },
    respuesta: { type: String, trim: true }, // Respuesta correcta/esperada
    orden: { type: Number, default: 0 },
    descripcion: { type: String, trim: true },
    id_pregunta: {
      type: Schema.Types.ObjectId,
      ref: "Pregunta",
      required: true,
    },
    id_tipo: { type: Schema.Types.ObjectId, ref: "TipoElemento" },
  },
  { timestamps: false, versionKey: false },
);

export const ElementoModel = model("ElementoModel", elementoSchema);
