import mongoose from "mongoose";
const { Schema, model } = mongoose;

const respuestaSchema = new Schema(
  {
    texto_ingresado: { type: String, required: true },
    fecha_ingresado: { type: Date, default: Date.now },
    success: { type: Boolean, required: true, default: false },
    //completed: { type: Boolean, required: true },
    id_elemento: {
      type: Schema.Types.ObjectId,
      ref: "ElementoModel",
      required: true,
    },
    id_usuario: { type: Schema.Types.ObjectId, ref: "UsuarioModel", required: true },
  },
  { timestamps: false, versionKey: false },
);

respuestaSchema.index({ id_usuario: 1, id_elemento: 1 });

export const RespuestaModel = model("Respuesta", respuestaSchema);
