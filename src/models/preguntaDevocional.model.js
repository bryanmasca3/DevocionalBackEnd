import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const preguntaUsuarioSchema = new Schema({
  estado: { type: String, default: 'pendiente' }, // Ej: pendiente, completado
  
  id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  id_pregunta: { type: Schema.Types.ObjectId, ref: 'Pregunta', required: true }
}, { timestamps: false, versionKey: false });

export const PreguntaUsuarioModel = model('PreguntaUsuario', preguntaUsuarioSchema);