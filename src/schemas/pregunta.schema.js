import Joi from "joi";
import joiObjectid from 'joi-objectid';

const joiOID = joiObjectid(Joi);
const idGen = joiOID();
const stringStandard = Joi.string().max(500);
// Reflexión y oración pueden ser textos largos
const textLong = Joi.string().max(20000).allow("", null);

export const createPreguntaSchema = Joi.object({
  id_usuario: idGen.optional(),
  id_devocional: idGen.required(),
  reflexion: textLong.optional(),
  titulo: stringStandard.required(),
  oracion: textLong.optional(),
  orden: Joi.number().integer().required(),
});

export const updatePreguntaSchema = Joi.object({
  id_usuario: idGen.optional(),
  reflexion: textLong.optional(),
  titulo: stringStandard.required(),
  id_devocional: idGen.required(),
  oracion: textLong.optional(),
  orden: Joi.number().integer().optional(),
});

export const getPreguntachemas = Joi.object({
  id: idGen.required(),
});
