import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// --- Tipo Usuario ---
const tipoUsuarioSchema = new Schema({
  descripcion: { type: String, required: true, trim: true }
}, { timestamps: false, versionKey: false });

export const TipoUsuarioModel = model('TipoUsuarioModel', tipoUsuarioSchema);