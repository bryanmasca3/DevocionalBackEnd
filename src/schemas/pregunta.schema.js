import Joi from "joi";
import joiObjectid from 'joi-objectid';

const joiOID = joiObjectid(Joi);
const idGen = joiOID();
const stringStandard = Joi.string().max(500);

export const createPreguntaSchema = Joi.object({
  id_usuario: idGen.optional(),
  id_devocional: idGen.required(),
  reflexion: stringStandard.optional().allow(''),
  titulo: stringStandard.required(),
  oracion: stringStandard.optional().allow(''),
  orden: Joi.number().integer().required(),
});

export const updatePreguntaSchema = Joi.object({
  id_usuario: idGen.optional(),
  reflexion: stringStandard.optional().allow(''),
  titulo: stringStandard.required(),
  id_devocional: idGen.required(),
  oracion: stringStandard.optional().allow(''),
  orden: Joi.number().integer().optional(),
});

export const getPreguntachemas = Joi.object({
  id: idGen.required(),
});
