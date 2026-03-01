import Joi from "joi";
import joiObjectid from 'joi-objectid';

const joiOID = joiObjectid(Joi);
const idGen = joiOID();
//const idGen = Joi.number().integer();
const stringStandard = Joi.string().max(255);
const textLong = Joi.string();
const dateGen = Joi.date();
const booleanGen = Joi.boolean();
// --- 1. USUARIO ---
export const  createUsuarioSchema = Joi.object({
  nombre: stringStandard.required(),
 // usuario: stringStandard.required(),
  correo: stringStandard.email().required(),
  contrasena: stringStandard.optional(), // Mapeado a 'contraseña'
  id_tipo: stringStandard.required(), // FK a tabla tipo
  login_inicial: booleanGen.optional(),
});

export const updateUsuarioSchema = Joi.object({
  nombre: stringStandard.optional(),
  //usuario: stringStandard.optional(),
  correo: stringStandard.email().optional(),
  contrasena: stringStandard.optional(),
  id_tipo: stringStandard.optional(),
  login_inicial: booleanGen.optional(),
});
export const getUsuarioSchema = Joi.object({
  id: idGen.required(),
});
export const createTipoUsuarioSchema = Joi.object({
  descripcion: stringStandard.required(),
});

export const updateTipoUsuarioSchema = Joi.object({
  descripcion: stringStandard.optional(),
});
export const getTipoUsuarioSchema = Joi.object({
  id: idGen.required(),
});