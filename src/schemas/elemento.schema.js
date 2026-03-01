import Joi from "joi";
import joiObjectid from 'joi-objectid';
const joiOID = joiObjectid(Joi);
const idGen = joiOID();
const stringStandard = Joi.string().max(255);

export const createElementoSchema = Joi.object({
  id_pregunta: idGen.optional().required(),
  texto_ayuda: stringStandard.optional().allow(''), 
  respuesta: stringStandard.optional().allow(''), // Respuesta correcta o esperada
  id_tipo: idGen.required(), // Tipo de elemento
  orden: Joi.number().integer().required(),
  descripcion: stringStandard.optional().allow(''),
});

export const updateElementoSchema = Joi.object({
  id_pregunta: idGen.required(),
  texto_ayuda: stringStandard.optional().allow(''),
  respuesta: stringStandard.optional().allow(''), // Respuesta correcta o esperada
  id_tipo: idGen.required(), // Tipo de elemento
  orden: Joi.number().integer().required(),
  descripcion: stringStandard.optional().allow(''),
}); 

export const getTipoElementoSchema = Joi.object({
  id: idGen.required(),
});
export const createTipoElementoSchema = Joi.object({
  descripcion: stringStandard.required(),
});

export const updateTipoElementoSchema = Joi.object({
  descripcion: stringStandard.optional(),
});

export const getElementoSchema = Joi.object({
  id: idGen.required(),
});