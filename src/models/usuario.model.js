import mongoose from "mongoose";
const { Schema, model } = mongoose;

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    /* usuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }, */
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    login_inicial: {
      type: Boolean,
      required: false,
      default: true,
    },
    contrasena: {
      type: String,
      default: "123456",
    },
    id_tipo: {
      type: Schema.Types.ObjectId,
      ref: "TipoUsuarioModel",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsuarioModel = model("UsuarioModel", usuarioSchema);
