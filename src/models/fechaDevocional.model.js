import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fechaDevocionalSchema = new Schema({
  fecha: { type: Date, required: true },
  id_devocional: { type: Schema.Types.ObjectId, ref: 'Devocional', required: true }
}, { timestamps: false, versionKey: false });

export const FechaDevocionalModel = model('FechaDevocional', fechaDevocionalSchema);