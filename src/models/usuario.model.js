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
      required: true,
      select: false, // nunca se devuelve en consultas (usar .select("+contrasena"))
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

// Por si el documento viene de create(): tampoco se serializa la contraseña
usuarioSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.contrasena;
    return ret;
  },
});

export const UsuarioModel = model("UsuarioModel", usuarioSchema);
